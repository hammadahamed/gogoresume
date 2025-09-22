import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import config from '../../appConfig';
import UsersModel from 'src/schemas/users.schema';
import paymentConfig from '../../planConfig';
import DodoPayments from 'dodopayments';
import PaymentModel, { IPayment } from 'src/schemas/payment.schema';
import {
  PaymentProvider,
  PaymentStatus,
  PAYMENT_STATUS_MESSAGES,
} from 'src/constants/payment.constants';
import { OrderHelper } from '../helpers/order.helper';
import { UsersService } from 'src/users/users.service';
import { checkIfUserAlreadyHasPlan } from 'src/common/helpers/plan.helper';
import { PaymentErrors } from 'src/constants/errors.constants';

@Injectable()
export class DodoPaymentService {
  private readonly logger = new Logger(DodoPaymentService.name);
  private readonly apiKey: string;
  private readonly DODO_CHECKOUT_API: string;
  private readonly DODO_API: string;

  private readonly client: DodoPayments;

  constructor(private readonly usersService: UsersService) {
    this.apiKey = process.env.DODO_PAYMENTS_API_KEY;
    this.DODO_CHECKOUT_API = process.env.DODO_CHECKOUT_API;
    this.DODO_API = process.env.DODO_API;

    if (!this.apiKey) {
      this.logger.error(
        'DODO_PAYMENTS_API_KEY is not set in environment variables',
      );
      throw new Error('DODO_PAYMENTS_API_KEY is required');
    }

    this.client = new DodoPayments({
      bearerToken: this.apiKey,
      baseURL: this.DODO_API,
    });

    this.logger.log(
      `Initialized DodoPaymentService for ${process.env.NODE_ENV} environment`,
    );
  }

  async getPaymentLink(
    productId: string,
    userId: string,
    isUpgrade = false,
  ): Promise<string> {
    const user = await UsersModel.findById(userId);
    if (!isUpgrade) {
      const isUserAlreadyHasPlan = await checkIfUserAlreadyHasPlan(user);
      if (isUserAlreadyHasPlan) {
        throw new ForbiddenException(PaymentErrors.USER_ALREADY_HAS_PLAN);
      }
    }
    const { orderId } = OrderHelper.createIdAndToken(userId, productId, true);
    const redirect_url = `${config.gogoresumeFrontendUrl}/payment-status?orderId=${orderId}`;
    const params = new URLSearchParams();
    params.append('quantity', '1');
    params.append('redirect_url', redirect_url);
    params.append('email', user.email);
    params.append('firstName', user.firstName || '');
    params.append('lastName', user.lastName || '');
    params.append('disableEmail', 'true');
    params.append('disableFirstName', 'true');
    params.append('disableLastName', 'true');
    params.append('metadata_orderId', orderId);

    // Create Payment record with IN_PROGRESS status when payment attempt is made
    const payment = await this.createPayment(userId, productId, orderId);

    await payment.save();

    const paymentLink = `${this.DODO_CHECKOUT_API}/buy/${paymentConfig[productId].dodo.id}?${params.toString()}`;
    console.log(
      '🚀 ~ DodoPaymentService ~ getPaymentLink ~ paymentLink:',
      paymentLink,
    );
    return paymentLink;
  }

  async createPayment(
    userId: string,
    internalPlanId: string,
    orderId: string,
  ): Promise<IPayment> {
    this.logger.log(
      `Creating payment record for user: ${userId}, plan: ${internalPlanId}`,
    );
    try {
      const payment = new PaymentModel({
        userId,
        provider: PaymentProvider.DODO,
        status: PaymentStatus.STARTED,
        orderId,
        internalPlanId,
        providerProductId: paymentConfig[internalPlanId].dodo.id,
      });

      await payment.save();
      this.logger.log(`Payment record created with ID: ${payment._id}`);
      return payment;
    } catch (error) {
      this.logger.error(`Error creating payment: ${error.message}`);
      throw error;
    }
  }

  async checkPaymentForging(paymentId: string, userId: string) {
    // 🔒 SECURITY: Check CROSS-PAYMENT FORGING
    //  Check if this payment_id is already associated with another user
    const existingPayment = await PaymentModel.findOne({
      paymentId: paymentId,
    });

    if (existingPayment && existingPayment.userId.toString() !== userId) {
      this.logger.warn(
        `🚨 SECURITY ALERT: User ${userId} attempted to verify payment ${paymentId} that belongs to user ${existingPayment.userId}`,
      );
      throw new ForbiddenException(
        PaymentErrors.PAYMENT_BELONGS_TO_ANOTHER_ACCOUNT,
      );
    }
  }

  async checkOrderIdFromDodo(paymentId: string, userId: string) {
    const currentPayment = await PaymentModel.findOne({
      userId: userId,
    }).sort({ createdAt: -1 });

    const paymentResponse: any = await this.client.payments.retrieve(paymentId);
    if (!paymentResponse) {
      throw new ForbiddenException(PaymentErrors.PAYMENT_NOT_FOUND);
    }
    // check orderId match with orderId in payment record
    const orderId = paymentResponse.metadata?.orderId;
    if (!orderId || orderId !== currentPayment.orderId)
      throw new ForbiddenException(PaymentErrors.INVALID_ORDER_ID);
    return paymentResponse;
  }

  async verifyPurchaseAndGrantPlan(paymentId: string, userId: string) {
    try {
      await this.checkPaymentForging(paymentId, userId);
      const paymentResponse = await this.checkOrderIdFromDodo(
        paymentId,
        userId,
      );

      const paymentData = await this.usersService.updateUserPaymentDataAndPlan(
        userId,
        paymentResponse,
      );

      return this.prepareResponse(paymentData, paymentResponse);
    } catch (error) {
      this.logger.error(`Error verifying purchase: ${error.message}`);
      throw error;
    }
  }

  private prepareResponse(paymentData: any, paymentResponse: any) {
    const resData = { ...paymentData, status: paymentResponse.status };
    const isSuccess = paymentResponse.status === PaymentStatus.SUCCEEDED;
    const isFailed = paymentResponse.status === PaymentStatus.FAILED;

    // Get status message from constants
    let response = {
      success: isSuccess,
      ...(isSuccess && { payment: resData }),
      status: paymentResponse.status,
    };

    if (isFailed || !isSuccess) {
      const resPayload = resData.paymentResponsePayload;
      const statusMessage =
        PAYMENT_STATUS_MESSAGES[paymentResponse.status as PaymentStatus] ||
        'Your payment is in progress. Please check back in a moment.';

      const data = {
        providerPaymentId: resPayload.payment_id,
        failedReason: resPayload.error_message || statusMessage,
        errorCode: resPayload.error_code,
      };
      response = { ...response, ...data };
    }

    return response;
  }
}
