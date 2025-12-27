import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../openai/openai.service';
import { ClaudeService } from '../claude/claude.service';
import { TweakResumeDTO, TweakResumeResponse } from './resume.types';
import { UsersService } from 'src/users/users.service';
import { incrementTweaksUsage } from 'src/common/helpers/tweak.helper';
import { IJwtPayload } from 'src/common/types/app.types';
import { getTweakPrompt } from './resume-tweaker.helper';

@Injectable()
export class ResumeTweakerService {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly claudeService: ClaudeService,
    private readonly usersService: UsersService,
  ) {}

  async tweakResume(
    user: IJwtPayload,
    dto: TweakResumeDTO,
  ): Promise<TweakResumeResponse> {
    const { data, jobDescription, userPrompt, sections } = dto;
    const { id: userId } = user;

    // Note: Feature limit check is now handled by FeaturesGuard
    const prompt = getTweakPrompt(jobDescription, userPrompt, data, sections);

    try {
      const enhancedContent = await this.openAIService.generateContent(prompt);
      const response = JSON.parse(enhancedContent);

      await incrementTweaksUsage(userId);
      return {
        data: response.data,
        matchScore: response.matchScore || 0,
      };
    } catch (error) {
      console.error('Error enhancing resume:', error);
      // Return original data with default score if enhancement fails
      return {
        data,
        matchScore: 0,
      };
    }
  }

  async tweakResumeWithClaude(
    user: IJwtPayload,
    dto: TweakResumeDTO,
  ): Promise<TweakResumeResponse> {
    const { data, jobDescription, userPrompt, sections } = dto;
    const { id: userId } = user;

    // Note: Feature limit check is now handled by FeaturesGuard
    const prompt = getTweakPrompt(jobDescription, userPrompt, data, sections);

    try {
      const enhancedContent = await this.claudeService.generateContent(prompt);
      const response = JSON.parse(enhancedContent);

      await incrementTweaksUsage(userId);
      return {
        data: response.data,
        matchScore: response.matchScore || 0,
      };
    } catch (error) {
      console.error('Error enhancing resume with Claude:', error);
      // Return original data with default score if enhancement fails
      return {
        data,
        matchScore: 0,
      };
    }
  }
}
