import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PaymentService } from 'src/payment/payment.service';
import { DodoPaymentService } from 'src/payment/providers/dodo.service';
import { AppMailerModule } from 'src/app-mailer/app-mailer.module';
import { ZeptoMailService } from 'src/app-mailer/zepto-mail/zepto-mail.service';

@Module({
  imports: [JwtModule, AuthModule, AppMailerModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    PaymentService,
    DodoPaymentService,
    ZeptoMailService,
  ],
  exports: [UsersService], // Export if other modules need to use this service
})
export class UsersModule {}
