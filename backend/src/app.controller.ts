import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ZeptoMailService } from './app-mailer/zepto-mail/zepto-mail.service';
import { ThankYouEmail, WelcomeEmail } from './emailTemplates';
import { AppEmails } from './appConfig';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appMailerService: ZeptoMailService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('test-mail')
  async testEmail() {
    throw new Error('Oops');
    await this.appMailerService.sendEmail(
      'hammadahamed.dev@gmail.com',
      WelcomeEmail('Hammad'),
      //   ThankYouEmail('Hammad'),
      AppEmails.FOUNDER,
    );

    return {
      message: 'Email sent successfully',
    };
  }
}
