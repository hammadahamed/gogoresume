import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { SaveOnboardingDTO } from './auth.type';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/bootstrap')
  @UseGuards(JwtAuthGuard)
  async bootstrap(@Req() req: any) {
    return await this.authService.bootstrap(req);
  }

  @Post('/save-onboarding')
  @UseGuards(JwtAuthGuard)
  async saveOnboardingData(
    @Req() req: any,
    @Body() onboardingData: SaveOnboardingDTO,
  ) {
    return await this.authService.saveOnboardingData(req, onboardingData);
  }

  @Post('/refresh')
  @UseGuards(ThrottlerGuard)
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }
}
