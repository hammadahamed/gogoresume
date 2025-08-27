import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { ZeptoMailService } from 'src/app-mailer/zepto-mail/zepto-mail.service';
import { ExpiryTime } from 'src/app-packages/redis/redis.types';
import {
  EMAIL_OTP_COOLDOWN,
  EMAIL_OTP_DAILY_LIMIT,
  EMAIL_OTP_VERIFICATION_ATTEMPTS_LIMIT,
  EmailAuthRedisPrefix,
  EmailConstants,
} from '../constants';
import { RedisUtils } from 'src/app-packages/redis/redisUtils';
import appRedis from 'src/clients/redis/appRedis';
import UserSchema, { AuthMethod } from 'src/schemas/users.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class EmailOnlyService {
  private readonly logger = new Logger(EmailOnlyService.name);
  private readonly redisService: RedisUtils;

  constructor(
    private readonly nodeMailer: ZeptoMailService,
    private readonly authService: AuthService,
  ) {
    this.redisService = new RedisUtils(appRedis);
  }

  async generateOtp(email: string): Promise<object> {
    const otpKey = `${EmailAuthRedisPrefix.OTP}${email}`;
    const otpRequestKey = `${EmailAuthRedisPrefix.REQUESTS}${email}`;
    const dailyLimitKey = `${EmailAuthRedisPrefix.DAILY_GEN_LIMIT}${email}`;
    const otpAttemptsKey = `${EmailAuthRedisPrefix.ATTEMPTS}${email}`;

    // Check if user is within cooldown period
    const lastRequest = await this.redisService.getValue(otpRequestKey);
    if (lastRequest) {
      this.logger.warn(`OTP request cooldown in effect for email: ${email}`);
      throw new ForbiddenException(
        `Please wait ${EMAIL_OTP_COOLDOWN} seconds before requesting a new OTP.`,
      );
    }

    // Check if user has exceeded the daily limit
    const dailyCount = await this.redisService.getValue(dailyLimitKey);
    if (dailyCount && parseInt(dailyCount) >= EMAIL_OTP_DAILY_LIMIT) {
      this.logger.warn(`Daily OTP limit exceeded for email: ${email}`);
      throw new ForbiddenException(
        'You have exceeded the daily limit for OTP requests. Please try again tomorrow.',
      );
    }

    // Generate OTP and store it
    const otp = crypto.randomInt(100000, 999999).toString();
    this.logger.log(`Generated OTP: ${otp} for email: ${email}`);

    // Send OTP email
    try {
      await this.nodeMailer.sendEmail(
        email,
        `${EmailConstants.ProductName} Login OTP`,
        `Your OTP for logging into ${EmailConstants.ProductName} is ${otp}`,
      );

      // Increment daily count only after successful email sending
      await this.redisService.increment(dailyLimitKey, ExpiryTime.ONE_DAY);

      await this.redisService.setValue(otpKey, otp, ExpiryTime.TEN_MINUTES); // OTP valid for 5 minutes
      await this.redisService.setValue(otpRequestKey, '1', EMAIL_OTP_COOLDOWN); // Set cooldown period
      // Reset OTP attempt counter before sending a new OTP
      await this.redisService.deleteValue(otpAttemptsKey);

      return { message: `Successfully Sent OTP to ${email}` };
    } catch (error) {
      this.logger.error('Sending Email OTP failed', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async validateOtp(email: string, otp: string) {
    const otpKey = `${EmailAuthRedisPrefix.OTP}${email}`;
    const otpAttemptsKey = `${EmailAuthRedisPrefix.ATTEMPTS}${email}`;
    const storedOtp = await this.redisService.getValue(otpKey);

    // Check if OTP exists
    if (!storedOtp) {
      this.logger.warn(`No OTP found for email: ${email}`);
      throw new ForbiddenException(`Please Generate the OTP first`);
    }
    // Enforce max 5 attempts per OTP
    const attempts = await this.redisService.increment(otpAttemptsKey);
    if (attempts === 1) {
      await this.redisService.setExpiry(
        otpAttemptsKey,
        ExpiryTime.FIVE_MINUTES,
      );
    }
    if (attempts > EMAIL_OTP_VERIFICATION_ATTEMPTS_LIMIT) {
      this.logger.warn(`Too many OTP validation attempts for email: ${email}`);
      throw new BadRequestException(
        'Too many invalid attempts. Request a new OTP.',
      );
    }
    // Validate OTP
    if (storedOtp !== otp) {
      this.logger.warn(`Invalid OTP for email: ${email}`);
      throw new ForbiddenException(`The OTP entered in incorrect`);
    }
    // Clean up after successful validation
    await this.redisService.deleteValue(otpKey);
    await this.redisService.deleteValue(otpAttemptsKey);

    this.logger.log(`OTP validated successfully for email: ${email}`);
    // 2. Handle user registration or login in your app

    const user = await this.authService.findOrCreateUser(
      email,
      AuthMethod.EMAIL_ONLY,
    );

    // 3. Generate a JWT or session token for your app
    const appToken = await this.authService.generateTokens(user);

    return {
      message: 'OTP Verification successful',
      tokens: appToken,
      user: { email: user.email },
      status: true,
    };
  }

  async createUser(createUserDto) {
    const newUser = new UserSchema(createUserDto);
    await newUser.save();
    return 'success';
  }
}
