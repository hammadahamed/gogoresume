import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UsersModel, { AuthMethod, IUser } from 'src/schemas/users.schema';
import { SaveOnboardingDTO } from './auth.type';
import { AuthErrorCode, AuthErrorMessage } from './constants';
import {
  constructPlanDataForBootstrap,
  getPlanDataForTokenGeneration,
} from 'src/common/helpers/plan.helper';
import TweakUsageModel from 'src/schemas/tweaksUsage.schema';
import { IJwtPayload, IJwtPayloadPlan } from 'src/common/types/app.types';
import { WelcomeEmail } from 'src/emailTemplates';
import { ZeptoMailService } from 'src/app-mailer/zepto-mail/zepto-mail.service';
import { AppEmails } from 'src/appConfig';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly ACCESS_TOKEN_SECRET = process.env.JWT_SECRET_ACCESS_TOKEN;
  private readonly REFRESH_TOKEN_SECRET = process.env.JWT_SECRET_REFRESH_TOKEN;

  constructor(
    private readonly jwtService: JwtService,
    private readonly appMailerService: ZeptoMailService,
  ) {}

  async findOrCreateUser(
    email: string,
    authMethod: AuthMethod,
    data?: any,
    name?: string,
  ) {
    let user = await UsersModel.findOne({ email });

    if (!user) {
      // CREATE USER
      this.logger.log(`User not found, creating new user: ${email}`);
      const userObj = {
        email,
        authMethod,
        profilePicture: data?.profilePicture,
      } as any;

      //   SEND WELCOME EMAIL
      await this.appMailerService.sendEmail(
        email,
        WelcomeEmail(name),
        AppEmails.FOUNDER,
      );
      if (data) {
        userObj.google = {} as any;
        userObj.google.accessToken = data.access_token;
        userObj.google.refreshToken = data.refresh_token;
      }
      user = await this.setupNewUser(userObj);
    } else if (data?.profilePicture && !user.profilePicture) {
      // Update profile picture if it's not set and we have one from Google
      user.profilePicture = data.profilePicture;
      await user.save();
    }

    return user.toObject() as any;
  }

  async setupNewUser(userObj: any) {
    const user = await UsersModel.create(userObj);

    await TweakUsageModel.create({
      userId: user._id,
      dailyTweaks: 0,
      totalTweaks: 0,
    });
    return user;
  }

  async generateTokens(user: any) {
    const plan = await getPlanDataForTokenGeneration(user);
    const payload: IJwtPayload = {
      id: user._id,
      email: user.email,
      currentPlan: plan as IJwtPayloadPlan,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.ACCESS_TOKEN_SECRET,
      expiresIn: '30m', // Access token expires in 30 minutes
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.REFRESH_TOKEN_SECRET,
      expiresIn: '7d', // Refresh token expires in 7 days
    });

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, {
        secret: this.ACCESS_TOKEN_SECRET,
      });
    } catch (error) {
      this.logger.error('Failed to verify access token', error);
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException({
          message: AuthErrorMessage[AuthErrorCode.TOKEN_EXPIRED],
          code: AuthErrorCode.TOKEN_EXPIRED,
        });
      }
      throw new UnauthorizedException({
        message: AuthErrorMessage[AuthErrorCode.TOKEN_INVALID],
        code: AuthErrorCode.TOKEN_INVALID,
      });
    }
  }

  async verifyRefreshToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, {
        secret: this.REFRESH_TOKEN_SECRET,
      });
    } catch (error) {
      this.logger.error('Failed to verify refresh token', error.stack);
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException({
          message: AuthErrorMessage[AuthErrorCode.REFRESH_TOKEN_EXPIRED],
          code: AuthErrorCode.REFRESH_TOKEN_EXPIRED,
        });
      }
      throw new UnauthorizedException({
        message: AuthErrorMessage[AuthErrorCode.REFRESH_TOKEN_INVALID],
        code: AuthErrorCode.REFRESH_TOKEN_INVALID,
      });
    }
  }

  async checkUserStatus(userId: string): Promise<void> {
    const user = await UsersModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException({
        message: AuthErrorMessage[AuthErrorCode.USER_NOT_FOUND],
        code: AuthErrorCode.USER_NOT_FOUND,
      });
    }

    if (user.isRestricted) {
      throw new UnauthorizedException({
        message: AuthErrorMessage[AuthErrorCode.USER_RESTRICTED],
        code: AuthErrorCode.USER_RESTRICTED,
      });
    }
  }

  async refreshToken(oldRefreshToken: string) {
    try {
      const decoded = await this.verifyRefreshToken(oldRefreshToken);

      // Check user status after validating the token
      await this.checkUserStatus(decoded.id);

      // Generate new tokens
      const user = await UsersModel.findById(decoded.id);
      return this.generateTokens(user);
    } catch (error) {
      this.logger.error('Failed to refresh token', error);
      if (error instanceof UnauthorizedException) throw error;

      throw new UnauthorizedException({
        message: AuthErrorMessage[AuthErrorCode.REFRESH_FAILED],
        code: AuthErrorCode.REFRESH_FAILED,
      });
    }
  }

  async bootstrap(req: any) {
    const { user } = req;
    try {
      // First check if user is allowed to access the system
      await this.checkUserStatus(user.id);

      // Then fetch user data
      const fields: Partial<Record<keyof IUser, 1>> = {
        email: 1,
        firstName: 1,
        lastName: 1,
        meta: 1,
        profilePicture: 1,
        plan: 1,
      };
      const userData = await UsersModel.findById(user.id).select(fields);
      const plan = await constructPlanDataForBootstrap(userData);
      const data = { ...userData.toObject(), plan };

      // This should not happen as we already checked in checkUserStatus
      if (!data) {
        throw new UnauthorizedException({
          message: AuthErrorMessage[AuthErrorCode.USER_NOT_FOUND],
          code: AuthErrorCode.USER_NOT_FOUND,
        });
      }

      return data as any;
    } catch (error) {
      this.logger.error('Failed to bootstrap user', error);
      // If it's already an HTTP exception (like UnauthorizedException), rethrow it
      if (error.getStatus) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async saveOnboardingData(req: any, onboardingData: SaveOnboardingDTO) {
    const { user } = req;
    try {
      // Update the user's document with onboarding data
      const updatedUser = await UsersModel.findByIdAndUpdate(
        user.id,
        {
          $set: {
            firstName: onboardingData.firstName,
            lastName: onboardingData.lastName,
            meta: (() => {
              delete onboardingData.firstName;
              delete onboardingData.lastName;
              return onboardingData;
            })(),
          },
        },
        { new: true },
      ).lean();

      if (!updatedUser) {
        throw new InternalServerErrorException(
          'User not found or update failed',
        );
      }

      return await this.bootstrap(req);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update onboarding data: ${error.message}`,
      );
    }
  }
}
