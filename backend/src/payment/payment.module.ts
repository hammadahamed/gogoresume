import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { DodoPaymentService } from './providers/dodo.service';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { WebhookController } from './webhook/webhook.controller';
import { DodoWebhookService } from './webhook/dodo-webhook.service';
import { UsersService } from 'src/users/users.service';
import { ZeptoMailService } from 'src/app-mailer/zepto-mail/zepto-mail.service';

@Module({
  imports: [AuthModule],
  controllers: [PaymentController, WebhookController],
  providers: [
    JwtService,
    PaymentService,
    DodoPaymentService,
    DodoWebhookService,
    UsersService,
    DodoPaymentService,
    ZeptoMailService,
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
