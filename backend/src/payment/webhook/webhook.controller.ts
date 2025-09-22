import { Body, Controller, Headers, Post, Logger } from '@nestjs/common';
import { DodoWebhookService } from './dodo-webhook.service';
import { WebhookHeaders } from '../interfaces/webhook-provider.interface';

@Controller('webhooks')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(private readonly dodoWebhookService: DodoWebhookService) {}

  @Post('dodo')
  async handleDodoWebhook(
    @Headers() headers: WebhookHeaders,
    @Body() payload: any,
  ) {
    this.logger.log(`Received Dodo webhook: ${headers['webhook-id']}`);

    try {
      //   console.dir(payload, { depth: null });
      // Verify webhook signature
      const isValid = await this.dodoWebhookService.verifyWebhookSignature(
        payload,
        headers,
      );

      if (!isValid) {
        this.logger.warn('Invalid webhook signature');
        return { received: false };
      }

      // Process the webhook based on its type
      return this.dodoWebhookService.processWebhook(payload);
    } catch (error) {
      this.logger.error(
        `Error processing webhook: ${error.message}`,
        error.stack,
      );
      return { received: false };
    }
  }
}
