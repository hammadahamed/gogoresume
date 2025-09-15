import {
  //   Body,
  Controller,
  //   Headers,
  //   Post,
  Logger,
  //   UnauthorizedException,
} from '@nestjs/common';
import { DodoWebhookService } from './dodo-webhook.service';
// import { WebhookHeaders } from '../interfaces/webhook-provider.interface';

@Controller('webhooks')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(private readonly dodoWebhookService: DodoWebhookService) {}

  //   @Post('dodo')
  //   async handleDodoWebhook(
  //     @Headers() headers: WebhookHeaders,
  //     @Body() payload: any,
  //   ) {
  //     this.logger.log(`Received Dodo webhook: ${headers['webhook-id']}`);

  //     try {
  //       console.dir(payload, { depth: null });
  //       // Verify webhook signature
  //       const isValid = await this.dodoWebhookService.verifyWebhookSignature(
  //         payload,
  //         headers,
  //       );
  //       console.log('🚀 ~ WebhookController ~ isValid:', isValid);

  //       if (!isValid) {
  //         this.logger.error('Invalid webhook signature');
  //         throw new UnauthorizedException('Invalid webhook signature');
  //       }

  //       // Process the webhook based on its type
  //       return await this.dodoWebhookService.processWebhook(payload);
  //     } catch (error) {
  //       this.logger.error(
  //         `Error processing webhook: ${error.message}`,
  //         error.stack,
  //       );
  //       throw error;
  //     }
  //   }

  // You can add additional webhook endpoints for other payment providers
  // @Post('stripe')
  // async handleStripeWebhook(@Headers() headers: WebhookHeaders, @Body() payload: any) {
  //   // Verify signature with Stripe webhook service
  //   // Process the webhook with Stripe webhook service
  // }
}
