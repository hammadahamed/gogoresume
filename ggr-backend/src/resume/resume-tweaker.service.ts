import { BadRequestException, Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { TweakResumeDTO, TweakResumeResponse } from './resume.types';
import { UsersService } from 'src/users/users.service';
import TweakUsageModel from 'src/schemas/tweaksUsage.schema';
import {
  isTweakUsageAvailable,
  incrementTweaksUsage,
} from 'src/common/helpers/tweak.helper';
import { IJwtPayload } from 'src/common/types/app.types';
import { TweakErrors, TweakErrorCode } from 'src/constants/errors.constants';

@Injectable()
export class ResumeTweakerService {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly usersService: UsersService,
  ) {}

  async tweakResume(
    user: IJwtPayload,
    dto: TweakResumeDTO,
  ): Promise<TweakResumeResponse> {
    const { data, jobDescription, userPrompt } = dto;
    const { id: userId, currentPlan } = user;

    const tweakUsage = await TweakUsageModel.findOne({ userId });
    const canTweak = await isTweakUsageAvailable(
      tweakUsage,
      currentPlan.planId,
    );

    if (!canTweak) {
      throw new BadRequestException({
        message: TweakErrors.TWEAK_USAGE_LIMIT_REACHED,
        code: TweakErrorCode.TWEAK_USAGE_LIMIT_REACHED,
      });
    }

    const prompt = `
      Job Description: ${jobDescription}
      
      User Request: ${userPrompt}
      
      Current Resume Data:
      ${JSON.stringify(data, null, 2)}
      
      Please enhance this resume data to better align with the job description while following the user's request.
      
      Requirements:
      1. Maintain the EXACT same JSON structure
      2. Only enhance the content, don't add or remove fields
      3. Make it more relevant to the job description
      4. Keep it truthful and professional
      5. Optimize for ATS systems
      6. Keep the length for the tweaks text of same length as the original text (try maximum to match/preserve the original text length)
      7. If the original text is too short, then consider adding more text to the tweaks text
      8. If the original text is too long, requirements 6 will still apply
      
      Return the enhanced resume data in the exact same JSON format:
    `;

    try {
      const enhancedContent = await this.openAIService.generateContent(prompt);
      const enhancedData = JSON.parse(enhancedContent);

      await incrementTweaksUsage(userId);
      return { data: enhancedData };
    } catch (error) {
      console.error('Error enhancing resume:', error);
      // Return original data if enhancement fails
      return { data };
    }
  }
}
