import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailOnlyController } from './email-only/email-only.controller';
import { GoogleController } from './google/google.controller';
import { RouterModule } from '@nestjs/core';
import { EmailOnlyService } from './email-only/email-only.service';
import { AppMailerModule } from 'src/app-mailer/app-mailer.module';
import { JwtModule } from '@nestjs/jwt';
import { GoogleService } from './google/google.service';
import { AuthController } from './auth.controller';
import { ZeptoMailService } from 'src/app-mailer/zepto-mail/zepto-mail.service';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
    ]),
    AppMailerModule,
    JwtModule,
  ],
  providers: [AuthService, EmailOnlyService, GoogleService, ZeptoMailService],
  controllers: [EmailOnlyController, GoogleController, AuthController],
  exports: [AuthService],
})
export class AuthModule {}
