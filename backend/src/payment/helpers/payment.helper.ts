import { Logger } from '@nestjs/common';
import PaymentModel from 'src/schemas/payment.schema';
import paymentConfig from 'src/planConfig';
import { OrderHelper } from './order.helper';

export class PaymentHelperDodo {
  private static readonly logger = new Logger(PaymentHelperDodo.name);

  static getPlanIdWithProductId(productId: string) {
    let planId = null;
    Object.keys(paymentConfig).find((key) => {
      if (paymentConfig[key].dodo.id === productId) {
        planId = key;
        return true;
      }
      return false;
    });
    return planId;
  }

  static async verifyOrderToken(orderToken: string, userId?: string) {
    try {
      const parsedToken = OrderHelper.parseToken(orderToken);
      if (!parsedToken) {
        this.logger.warn('Failed to parse order token');
        return null;
      }

      if (!userId) userId = parsedToken.userId;

      // Check Payment model for one-time payments
      const userPayment = await PaymentModel.findOne({
        userId: userId,
        orderId: parsedToken.orderId,
      });

      if (userPayment) {
        this.logger.log(
          `Order token verified for user: ${userId}, orderId: ${parsedToken.orderId}`,
        );
        return { success: true, ...parsedToken };
      }

      this.logger.warn(
        `No matching purchase found for user: ${userId}, orderId: ${parsedToken.orderId}`,
      );
      return null;
    } catch (error) {
      this.logger.error(`Error verifying order token: ${error.message}`);
      return null;
    }
  }
}
