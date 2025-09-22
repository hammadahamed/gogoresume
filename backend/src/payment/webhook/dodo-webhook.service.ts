import { Injectable, Logger } from '@nestjs/common';
import { Webhook } from 'standardwebhooks';
import PaymentModel from 'src/schemas/payment.schema';
import {
  IWebhookProvider,
  WebhookHeaders,
} from '../interfaces/webhook-provider.interface';
import { DodoWebhookEvents } from 'src/constants/payment.constants';
import { DodoPaymentService } from '../providers/dodo.service';

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

  constructor(private readonly dodoPaymentService: DodoPaymentService) {
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
      const orderId = metadata?.orderId;
      if (!orderId) {
        this.logger.warn('No orderId in metadata');
        return;
      }

      switch (eventType) {
        case DodoWebhookEvents.PAYMENT_SUCCEEDED:
        case DodoWebhookEvents.PAYMENT_PROCESSING:
        case DodoWebhookEvents.PAYMENT_FAILED:
        case DodoWebhookEvents.PAYMENT_CANCELLED:
          return await this.verifyPurchaseAndGrantPlan(orderId, payload);
        //   return await this.setPaymentStatus(orderId, payload);

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

  private async verifyPurchaseAndGrantPlan(orderId: string, payload: any) {
    const paymentDoc = await PaymentModel.findOne({ orderId });
    const userId = paymentDoc.userId.toString();
    const paymentId = payload.data.payment_id;
    await this.dodoPaymentService.verifyPurchaseAndGrantPlan(paymentId, userId);
  }

  private async setPaymentStatus(orderId: string, payload: any) {
    const query = { orderId };
    const payment = await PaymentModel.findOneAndUpdate(query, {
      status: payload.status,
    });
    if (!payment) {
      this.logger.warn(`Payment not found for orderId: ${orderId}`);
      return;
    }
    await payment.save();
  }
}
