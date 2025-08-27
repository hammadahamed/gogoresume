import {
  Injectable,
  Logger,
  InternalServerErrorException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JoinWaitlistDTO } from './waitlist.types';
import WaitlistModel from 'src/schemas/waitlist.schema';
import { ZeptoMailService } from 'src/app-mailer/zepto-mail/zepto-mail.service';

@Injectable()
export class WaitlistService {
  private readonly logger = new Logger(WaitlistService.name);

  constructor(private readonly zeptoMailService: ZeptoMailService) {}

  async joinWaitlist(waitlistData: JoinWaitlistDTO) {
    try {
      // Basic email validation
      if (!this.isValidEmail(waitlistData.email)) {
        throw new BadRequestException('Invalid email format');
      }

      // Check if email already exists in the waitlist
      const existingEntry = await WaitlistModel.findOne({
        email: waitlistData.email.toLowerCase(),
      });

      if (existingEntry) {
        throw new ConflictException('Email is already on the waitlist');
      }

      // Create new waitlist entry
      await WaitlistModel.create({
        name: waitlistData.name,
        email: waitlistData.email.toLowerCase(),
        profession: waitlistData.profession || '',
      });

      // Send confirmation email
      await this.zeptoMailService.sendEmail(
        waitlistData.email,
        'Welcome to GoGoResume Waitlist!',
        `<div>
          <h2>Thank you for joining the GoGoResume waitlist!</h2>
          <p>Hello ${waitlistData.name},</p>
          <p>We're thrilled to have you on our waitlist! We'll keep you updated on our progress and notify you as soon as GrootForm is ready for you to try.</p>
          <p>Stay tuned for exciting updates coming your way.</p>
          <p>Best regards,<br>The GoGoResume Team</p>
        </div>`,
      );

      return {
        success: true,
        message: 'Successfully added to waitlist',
      };
    } catch (error) {
      this.logger.error(
        `Failed to add to waitlist: ${error.message}`,
        error.stack,
      );

      if (
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }

      throw new InternalServerErrorException(
        `Failed to add to waitlist: ${error.message}`,
      );
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
