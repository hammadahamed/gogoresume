import { Injectable, Logger } from '@nestjs/common';
import { SendMailClient } from 'zeptomail';

@Injectable()
export class ZeptoMailService {
  private client;
  private readonly logger = new Logger(ZeptoMailService.name);

  constructor() {
    const url = process.env.EMAIL_ZEPTO_HOST;
    const token = process.env.EMAIL_ZEPTO_TOKEN;

    this.client = new SendMailClient({ url, token });
  }

  // Method to send email
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: {
        address: process.env.EMAIL_NOREPLY_MAIL,
        name: 'noreply',
      },
      to: [
        {
          email_address: {
            address: to,
            name: to,
          },
        },
      ],
      subject: subject,
      htmlbody: text,
    };
    console.log(
      '🚀 ~ ZeptoMailService ~ sendEmail ~ mailOptions:',
      mailOptions,
    );
    console.dir(mailOptions, { depth: 10 });

    try {
      this.logger.log(`[Email] Sending mail to ${to}`);
      await this.client.sendMail(mailOptions);
      this.logger.log(`[Email] Sent to ${to} with subject: ${subject}`);
    } catch (error) {
      this.logger.error(
        `[Email] Failed to send email to ${to}: ${error.message}`,
      );
      throw error;
    }
  }
}
