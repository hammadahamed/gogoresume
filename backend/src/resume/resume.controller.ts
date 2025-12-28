import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Req,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResumeService } from './resume.service';
import {
  TweakResumeDTO,
  TweakResumeResponse,
  ParseResumeResponse,
} from './resume.types';
import { ResumeTweakerService } from './resume-tweaker.service';
import { ResumeParserService } from './resume-parser.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import {
  FeaturesGuard,
  CheckFeature,
  FeatureType,
} from 'src/guards/features.guard';
import {
  validateUserProfileSize,
  validateResumeDataSize,
} from 'src/common/helpers/validation.helper';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

@Controller('resume')
export class ResumeController {
  constructor(
    private readonly resumeTweakerService: ResumeTweakerService,
    private readonly resumeService: ResumeService,
    private readonly resumeParserService: ResumeParserService,
  ) {}

  @Post('parse')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: (req, file, callback) => {
        const allowedMimes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/msword',
        ];
        if (allowedMimes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              'Invalid file type. Only PDF and DOCX files are allowed.',
            ),
            false,
          );
        }
      },
    }),
  )
  async parseResume(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ParseResumeResponse> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    // Using Claude for parsing - switch to parseResume() for OpenAI
    return this.resumeParserService.parseResumeWithClaude(req.user, file);
  }

  @Post('tweak')
  @CheckFeature(FeatureType.TWEAK)
  @UseGuards(JwtAuthGuard, FeaturesGuard)
  async tweakResume(
    @Req() req: any,
    @Body() dto: TweakResumeDTO,
  ): Promise<TweakResumeResponse> {
    return this.resumeTweakerService.tweakResumeWithClaude(req.user, dto);
  }

  @Post('user-profile')
  @UseGuards(JwtAuthGuard)
  async saveUserProfile(
    @Req() req: any,
    @Body() userProfileData: any,
  ): Promise<{ status: string; message: string }> {
    // Validate payload size before processing
    validateUserProfileSize(userProfileData);

    return this.resumeService.saveUserProfile(req.user.id, userProfileData);
  }

  @Get('user-profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(
    @Req() req: any,
  ): Promise<{ status: string; data: any }> {
    return this.resumeService.getUserProfile(req.user.id);
  }

  @Post('save')
  @CheckFeature(FeatureType.RESUME)
  @UseGuards(JwtAuthGuard, FeaturesGuard)
  async createResume(
    @Req() req: any,
    @Body() body: { name: string; data: any; templateId?: string },
  ): Promise<{ status: string; message: string; resumeId: string }> {
    // Validate payload size before processing
    validateResumeDataSize(body.data);

    return this.resumeService.createResume(
      req.user.id,
      body.name,
      body.data,
      body.templateId,
    );
  }

  @Put('save/:resumeId')
  @UseGuards(JwtAuthGuard)
  async updateResume(
    @Req() req: any,
    @Param('resumeId') resumeId: string,
    @Body() body: { name: string; data: any; templateId?: string },
  ): Promise<{ status: string; message: string }> {
    // Validate payload size before processing
    validateResumeDataSize(body.data);

    return this.resumeService.updateResume(
      req.user.id,
      resumeId,
      body.name,
      body.data,
      body.templateId,
    );
  }

  @Get('saved')
  @UseGuards(JwtAuthGuard)
  async getSavedResumes(@Req() req: any) {
    return this.resumeService.getSavedResumes(req.user);
  }

  @Get('saved/:resumeId')
  @UseGuards(JwtAuthGuard)
  async getResumeById(
    @Req() req: any,
    @Param('resumeId') resumeId: string,
  ): Promise<{ status: string; data: any }> {
    return this.resumeService.getResumeById(req.user.id, resumeId);
  }

  @Delete('saved/:resumeId')
  @UseGuards(JwtAuthGuard)
  async deleteResume(
    @Req() req: any,
    @Param('resumeId') resumeId: string,
  ): Promise<{ status: string; message: string }> {
    return this.resumeService.deleteResume(req.user.id, resumeId);
  }
}
