import { Injectable, Logger } from '@nestjs/common';
import { DodoPaymentService } from './providers/dodo.service';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private readonly provider;

  constructor(private readonly dodoPaymentService: DodoPaymentService) {
    // For now, we're using Dodo as the default provider
    this.provider = dodoPaymentService;
  }

  getPaymentLink(productId: string, userId: string) {
    return this.provider.getPaymentLink(productId, userId);
  }

  async processPayment(paymentIntentId: string) {
    return await this.provider.processPayment(paymentIntentId);
  }

  async verifyPurchase(paymentId: string, userId: string) {
    return await this.provider.verifyPurchase(paymentId, userId);
  }

  async getUserActivePurchase(userId: string) {
    return await this.provider.getUserActivePurchase(userId);
  }
}
