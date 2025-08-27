import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';

import {
  UpdateProfileDto,
  UpdateProfileResponse,
} from './dto/update-profile.dto';
import UsersModel from 'src/schemas/users.schema';
import PaymentModel from 'src/schemas/payment.schema';
import { PaymentStatus } from 'src/constants/payment.constants';
import * as moment from 'moment';
import { getPlanEnd } from 'src/common/helpers/plan.helper';
import TweakUsageModel, { ITweakUsage } from 'src/schemas/tweaksUsage.schema';
import { calculateTweaksUsage } from 'src/common/helpers/tweak.helper';
import { IJwtPayload, IJwtPayloadPlan } from 'src/common/types/app.types';

@Injectable()
export class UsersService {
  async updateProfile(
    userId: string,
    updateData: UpdateProfileDto,
  ): Promise<UpdateProfileResponse> {
    try {
      const updatedUser = await UsersModel.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true },
      ).select('firstName lastName email profilePicture -_id');

      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }

      return updatedUser.toObject();
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update profile: ${error.message}`,
      );
    }
  }

  async findUsersByEmail(email: string, limit: number = 10) {
    try {
      // Use a starts-with regex pattern which can utilize indexes better
      // This supports partial search from the beginning of the email
      const users = await UsersModel.find({
        email: { $regex: `^${email}`, $options: 'i' },
      })
        .select('_id firstName lastName email profilePicture')
        .limit(limit);

      return users;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to search users: ${error.message}`,
      );
    }
  }

  async findUserByExactEmail(email: string) {
    try {
      const user = await UsersModel.findOne({
        email: email, // Exact match query
      }).select('_id firstName lastName email profilePicture');

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to find user by email: ${error.message}`,
      );
    }
  }

  async updateUserPaymentData(userId: string, paymentDataFromDodo: any) {
    // Find the latest payment record for this user and orderId
    const payment = await PaymentModel.findOne({
      userId,
    }).sort({ createdAt: -1 });

    let isAlreadyVerifiedAndUpdated = false;

    if (!payment) throw new ForbiddenException('Payment record not found');

    // even before we update the payment data in the database in below code,
    // if the providerPaymentId is already there, then it means the payment is already verified and updated once before
    if (payment.providerPaymentId === paymentDataFromDodo.payment_id) {
      // prevent updating data again in db, if the status is also unchanged
      // another case is when the payment is already succeeded, so we don't need to update the data again
      // Because this basically means that there is no update in the payment data
      if (
        paymentDataFromDodo.status === payment.status ||
        payment.status === PaymentStatus.SUCCEEDED
      ) {
        isAlreadyVerifiedAndUpdated = true;

        return {
          paymentData: payment.toJSON(),
          isAlreadyVerifiedAndUpdated,
        };
      }
    }

    // Update payment record based on DodoPayments status
    payment.providerPaymentId = paymentDataFromDodo.payment_id;
    payment.status = paymentDataFromDodo.status;
    payment.paymentResponsePayload = paymentDataFromDodo;
    await payment.save();

    const paymentData: any = payment.toJSON();
    delete paymentData.paymentResponsePayload;
    paymentData.planEnd = getPlanEnd(paymentData.internalPlanId);
    return { paymentData, isAlreadyVerifiedAndUpdated };
  }

  async updateUserPlan(
    userId: string,
    paymentDataFromDodo: any,
    paymentData: any,
  ) {
    const data = {
      plan: {
        planId: paymentData.internalPlanId,
        planStart: moment().toDate(),
        planEnd: getPlanEnd(paymentData.internalPlanId),
        currentPaymentId: paymentData._id,
      },
      billing: {
        city: paymentDataFromDodo.billing.city,
        country: paymentDataFromDodo.billing.country,
        state: paymentDataFromDodo.billing.state,
        street: paymentDataFromDodo.billing.street,
        zipcode: paymentDataFromDodo.billing.zipcode,
      },
    };
    const user = await UsersModel.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true },
    );
    return user;
  }

  async setupTweakUsage(userId: string) {
    const tweakUsage = await TweakUsageModel.findOne({ userId });
    if (!tweakUsage) {
      await TweakUsageModel.create({
        userId,
        dailyTweaks: 0,
        totalTweaks: 0,
      });
    }
  }

  async updateUserPaymentDataAndPlan(userId: string, paymentDataFromDodo) {
    const { paymentData, isAlreadyVerifiedAndUpdated } =
      await this.updateUserPaymentData(userId, paymentDataFromDodo);

    if (isAlreadyVerifiedAndUpdated) return paymentData;

    if (paymentDataFromDodo.status === PaymentStatus.SUCCEEDED) {
      await this.updateUserPlan(userId, paymentDataFromDodo, paymentData);
    }

    await this.setupTweakUsage(userId);

    return paymentData;
  }

  async getTweaksUsage(userId: string, userPlan: IJwtPayloadPlan) {
    const tweakUsage = await TweakUsageModel.findOne({ userId });
    const otherStats = await calculateTweaksUsage(tweakUsage, userPlan.planId);

    return {
      ...otherStats,
    };
  }
}
