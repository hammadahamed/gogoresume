import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { WaitlistModule } from './waitlist/waitlist.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppMailerModule } from './app-mailer/app-mailer.module';
import { PaymentModule } from './payment/payment.module';
import { ResumeModule } from './resume/resume.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 3600000, // 1 hour (3600000 ms)
        limit: 5, // 5 requests per IP per hour
      },
    ]),
    JwtModule,
    AuthModule,
    UsersModule,
    AppMailerModule,
    WaitlistModule,
    PaymentModule,
    ResumeModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
