import { Injectable, Logger } from '@nestjs/common';
import { SendMailClient } from 'zeptomail';
import { AppEmails, IAppEmail } from 'src/appConfig';
import { EmailTemplate } from 'src/emailTemplates';

@Injectable()
export class ZeptoMailService {
  private client;
  private readonly logger = new Logger(ZeptoMailService.name);

  constructor() {
    const url = process.env.EMAIL_ZEPTO_HOST;
    const token = process.env.EMAIL_ZEPTO_TOKEN;

    this.client = new SendMailClient({ url, token });
  }

  private parseError(error: any) {
    return (
      (error.error?.message || '') +
      ' - ' +
      (error.error?.details?.[0]?.message || '')
    );
  }

  // Method to send email
  async sendEmail(
    to: string,
    emailTemplate: EmailTemplate,
    from: IAppEmail = AppEmails.NO_REPLY,
  ): Promise<void> {
    const mailOptions = {
      from: from,
      to: [
        {
          email_address: {
            address: to,
            name: to,
          },
        },
      ],
      subject: emailTemplate.subject,
      htmlbody: emailTemplate.body,
    };

    try {
      this.logger.log(`[Email] Sending mail to ${to}`);
      await this.client.sendMail(mailOptions);
      this.logger.log(
        `[Email] Sent to ${to} with subject: ${emailTemplate.subject}`,
      );
    } catch (error) {
      this.logger.error(
        `[Email] Failed to send email to ${to} ${this.parseError(error)}:`,
        error,
      );
    }
  }
}
