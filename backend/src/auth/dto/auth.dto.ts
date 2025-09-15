import { IsEmail, IsString, Length } from 'class-validator';

export class GenerateOtpDto {
  @IsEmail()
  email: string;
}

export class ValidateOtpDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6, { message: 'OTP must be exactly 6 characters long' })
  otp: string;
}
