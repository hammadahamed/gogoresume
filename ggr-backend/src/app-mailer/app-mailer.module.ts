import { Module } from '@nestjs/common';
import { ZeptoMailService } from './zepto-mail/zepto-mail.service';

@Module({
  providers: [ZeptoMailService],
  exports: [ZeptoMailService],
})
export class AppMailerModule {}
