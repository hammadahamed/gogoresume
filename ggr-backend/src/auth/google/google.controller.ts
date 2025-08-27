import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
  constructor(
    private readonly googleService: GoogleService, // Service to verify Google ID token
  ) {}

  @Post('/signin')
  async googleSignIn(@Body() body: { token?: string; code?: string }) {
    if (body.token) {
      return await this.googleService.signinWithIdToken(body.token);
    } else if (body.code) {
      return await this.googleService.signinWithAuthCode(body.code);
    } else {
      throw new BadRequestException(
        'Invalid request: no token or code provided',
      );
    }
  }
}
