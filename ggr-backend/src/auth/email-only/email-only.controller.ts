import { Controller, Post, Body } from '@nestjs/common';
import { EmailOnlyService } from './email-only.service';
import { GenerateOtpDto, ValidateOtpDto } from '../dto/auth.dto';

@Controller('/email-only')
export class EmailOnlyController {
  constructor(private readonly emailOnlyService: EmailOnlyService) {}

  @Post('generate-otp')
  async generateOtp(@Body() body: GenerateOtpDto) {
    return await this.emailOnlyService.generateOtp(body.email);
  }

  @Post('validate-otp')
  async validateOtp(@Body() body: ValidateOtpDto) {
    return await this.emailOnlyService.validateOtp(body.email, body.otp);
  }

  @Post('/create-user')
  async create(@Body() createUserDto) {
    return await this.emailOnlyService.createUser(createUserDto);
  }
}
