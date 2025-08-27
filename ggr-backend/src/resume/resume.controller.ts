import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { ResumeService } from './resume.sevice';
import { TweakResumeDTO, TweakResumeResponse } from './resume.types';
import { ResumeTweakerService } from './resume-tweaker.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('resume')
export class ResumeController {
  constructor(
    private readonly resumeTweakerService: ResumeTweakerService,
    private readonly resumeService: ResumeService,
  ) {}

  @Post('tweak')
  @UseGuards(JwtAuthGuard)
  async tweakResume(
    @Req() req: any,
    @Body() dto: TweakResumeDTO,
  ): Promise<TweakResumeResponse> {
    return this.resumeTweakerService.tweakResume(req.user, dto);
  }

  @Post('user-profile')
  @UseGuards(JwtAuthGuard)
  async saveUserProfile(
    @Req() req: any,
    @Body() userProfileData: any,
  ): Promise<{ status: string; message: string }> {
    return this.resumeService.saveUserProfile(req.user.id, userProfileData);
  }

  @Get('user-profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(
    @Req() req: any,
  ): Promise<{ status: string; data: any }> {
    return this.resumeService.getUserProfile(req.user.id);
  }
}
