import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PaymentService } from 'src/payment/payment.service';
import { DodoPaymentService } from 'src/payment/providers/dodo.service';

@Module({
  imports: [JwtModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, PaymentService, DodoPaymentService],
  exports: [UsersService], // Export if other modules need to use this service
})
export class UsersModule {}
