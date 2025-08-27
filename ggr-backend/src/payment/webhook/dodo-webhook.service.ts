import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { Webhook } from 'standardwebhooks';
import UsersModel from 'src/schemas/users.schema';
import PaymentModel from 'src/schemas/payment.schema';
import { PaymentStatus, UserPlanStatus } from 'src/constants/payment.constants';
import {
  IWebhookProvider,
  WebhookHeaders,
} from '../interfaces/webhook-provider.interface';
import { DodoWebhookEvents } from 'src/constants/payment.constants';
import { PaymentHelperDodo } from '../helpers/payment.helper';

// Dodo-specific webhook headers
interface DodoWebhookHeaders {
  signature: string;
  webhookId: string;
  timestamp: string;
}

@Injectable()
export class DodoWebhookService implements IWebhookProvider {
  private readonly logger = new Logger(DodoWebhookService.name);
  private readonly webhook: Webhook;

  constructor() {
    const webhookSecret = process.env.DODO_WEBHOOK_SECRET;
    if (!webhookSecret) {
      this.logger.warn(
        'DODO_WEBHOOK_SECRET not set. Webhook signature verification will fail!',
      );
    }
    this.webhook = new Webhook(webhookSecret || 'invalid-secret');
  }

  async verifyWebhookSignature(
    payload: any,
    headers: WebhookHeaders,
  ): Promise<boolean> {
    try {
      const rawBody = JSON.stringify(payload);
      const dodoHeaders = this.extractDodoHeaders(headers);

      const webhookHeaders = {
        'webhook-id': dodoHeaders.webhookId,
        'webhook-signature': dodoHeaders.signature,
        'webhook-timestamp': dodoHeaders.timestamp,
      };

      await this.webhook.verify(rawBody, webhookHeaders);
      return true;
    } catch (error) {
      this.logger.error(`Failed to verify webhook signature: ${error.message}`);
      return false;
    }
  }

  private extractDodoHeaders(headers: WebhookHeaders): DodoWebhookHeaders {
    return {
      signature: headers['webhook-signature'] || '',
      webhookId: headers['webhook-id'] || '',
      timestamp: headers['webhook-timestamp'] || '',
    };
  }

  async processWebhook(payload: any): Promise<any> {
    const eventType = payload.type;
    this.logger.log(`Processing ${eventType} webhook`);

    // Immediately acknowledge receipt to Dodo Payments
    // Process webhook asynchronously without affecting the response
    this.processWebhookAsync(eventType, payload);

    return { received: true };
  }

  private async processWebhookAsync(
    eventType: string,
    payload: any,
  ): Promise<void> {
    try {
      const { metadata } = payload.data;
      const orderToken = metadata?.o;
      if (!orderToken) {
        this.logger.warn('No orderToken in metadata');
        return;
      }

      const orderTokenPayload =
        await PaymentHelperDodo.verifyOrderToken(orderToken);

      if (!orderTokenPayload?.success)
        return this.logger.warn('Invalid orderToken');

      switch (eventType) {
        case DodoWebhookEvents.PAYMENT_SUCCEEDED:
        case DodoWebhookEvents.PAYMENT_FAILED:
        case DodoWebhookEvents.PAYMENT_CANCELLED:
          return await this.handlePurchasePayment(
            payload,
            orderTokenPayload.userId,
            orderTokenPayload.orderId,
          );

        default:
          this.logger.warn(`Unhandled webhook event type: ${eventType}`);
          return;
      }
    } catch (error) {
      this.logger.error(
        `Error processing webhook ${eventType}: ${error.message}`,
        error.stack,
      );
    }
  }

  private async handlePurchasePayment(
    payload: any,
    userId: string,
    orderId: string,
  ): Promise<void> {
    try {
      const { type: eventType, data } = payload;
      const { payment_id, product_id } = data;

      this.logger.log(`Processing ${eventType} for payment: ${payment_id}`);

      // 🔒 SECURITY: Check if this payment_id is already associated with another user
      const existingPayment = await PaymentModel.findOne({
        paymentId: payment_id,
      });

      if (existingPayment && existingPayment.userId.toString() !== userId) {
        this.logger.warn(
          `🚨 WEBHOOK SECURITY ALERT: Webhook for user ${userId} attempted to process payment ${payment_id} that belongs to user ${existingPayment.userId}`,
        );
        throw new ForbiddenException('Payment belongs to another account');
      }

      // Find the payment record
      let payment = await PaymentModel.findOne({
        userId,
        orderId,
      });

      // Create payment record if it doesn't exist (shouldn't happen with proper flow)
      if (!payment) {
        this.logger.warn(
          `Payment record not found for orderId: ${orderId}, creating new one`,
        );
        payment = new PaymentModel({
          userId,
          orderId,
          paymentId: payment_id,
          planId: product_id,
          status: PaymentStatus.PROCESSING,
          validFrom: new Date(),
          validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default 7 days
        });
      } else {
        // Update with real payment ID
        payment.providerPaymentId = payment_id;
      }

      // Update status based on event type
      switch (eventType) {
        case DodoWebhookEvents.PAYMENT_SUCCEEDED:
          payment.status = PaymentStatus.SUCCEEDED;

          // Update user's plan status
          await UsersModel.findByIdAndUpdate(userId, {
            planStatus: UserPlanStatus.ACTIVE,
            planUpdatedAt: new Date(),
          });

          this.logger.log(`Payment completed for user: ${userId}`);
          break;

        case DodoWebhookEvents.PAYMENT_FAILED:
          payment.status = PaymentStatus.FAILED;
          this.logger.log(`Payment failed for user: ${userId}`);
          break;

        case DodoWebhookEvents.PAYMENT_CANCELLED:
          payment.status = PaymentStatus.CANCELLED;
          this.logger.log(`Payment cancelled for user: ${userId}`);
          break;
      }

      await payment.save();
      this.logger.log(
        `Purchase webhook processed successfully for user: ${userId}`,
      );
    } catch (error) {
      this.logger.error(`Error handling purchase payment: ${error.message}`);
      throw error;
    }
  }
}
