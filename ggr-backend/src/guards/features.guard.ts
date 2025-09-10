import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { planFeatures, Plans } from 'src/planConfig';
import TweakUsageModel from 'src/schemas/tweaksUsage.schema';
import SavedResumeModel from 'src/schemas/savedResume.schema';
import { isTweakUsageAvailable } from 'src/common/helpers/tweak.helper';
import {
  TweakErrors,
  TweakErrorCode,
  ResumeErrors,
  ResumeErrorCode,
} from 'src/constants/errors.constants';
import { IJwtPayload } from 'src/common/types/app.types';

export enum FeatureType {
  TWEAK = 'tweak',
  RESUME = 'resume',
}

export const FEATURE_CHECK = 'feature_check';

// Decorator to set the feature type metadata
export const CheckFeature = (featureType: FeatureType) =>
  SetMetadata(FEATURE_CHECK, featureType);

@Injectable()
export class FeaturesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const featureType = this.reflector.get<FeatureType>(
      FEATURE_CHECK,
      context.getHandler(),
    );

    if (!featureType) {
      return true; // No feature check required
    }

    const request = context.switchToHttp().getRequest();
    const user: IJwtPayload = request.user;

    if (!user) {
      throw new BadRequestException('User not authenticated');
    }

    const { id: userId, currentPlan } = user;
    const planId = currentPlan.planId;

    switch (featureType) {
      case FeatureType.TWEAK:
        return await this.checkTweakLimit(userId, planId);

      case FeatureType.RESUME:
        return await this.checkResumeLimit(userId, planId);

      default:
        return true;
    }
  }

  private async checkTweakLimit(
    userId: string,
    planId: string,
  ): Promise<boolean> {
    try {
      const tweakUsage = await TweakUsageModel.findOne({ userId });

      if (!tweakUsage) {
        // First time user - create usage record
        await TweakUsageModel.create({
          userId,
          totalTweaks: 0,
          dailyTweaks: 0,
          lastTweaked: new Date(),
        });
        return true; // Allow first tweak
      }

      const canTweak = await isTweakUsageAvailable(tweakUsage, planId);

      if (!canTweak) {
        throw new BadRequestException({
          message: TweakErrors.TWEAK_USAGE_LIMIT_REACHED,
          code: TweakErrorCode.TWEAK_USAGE_LIMIT_REACHED,
        });
      }

      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to check tweak usage limit');
    }
  }

  private async checkResumeLimit(
    userId: string,
    planId: string,
  ): Promise<boolean> {
    try {
      const planConfig = planFeatures[planId];

      if (!planConfig) {
        throw new BadRequestException('Invalid plan');
      }

      const maxResumes = planConfig.numberOfResumes;
      const currentResumeCount = await SavedResumeModel.countDocuments({
        userId,
      });

      if (currentResumeCount >= maxResumes) {
        const planName = this.getPlanDisplayName(planId);
        throw new BadRequestException({
          message: `${ResumeErrors.RESUME_LIMIT_REACHED}. Your ${planName} plan allows ${maxResumes} resumes. Please upgrade your plan or delete existing resumes.`,
          code: ResumeErrorCode.RESUME_LIMIT_REACHED,
          details: {
            current: currentResumeCount,
            limit: maxResumes,
            planId,
          },
        });
      }

      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to check resume creation limit');
    }
  }

  private getPlanDisplayName(planId: string): string {
    const planNames = {
      [Plans.FREE]: 'Free',
      [Plans.PRO_7_DAYS]: 'Pro (7 Days)',
      [Plans.PRO_1_MONTH]: 'Pro (1 Month)',
      [Plans.PRO_3_MONTHS]: 'Pro (3 Months)',
    };
    return planNames[planId] || 'Unknown';
  }
}
