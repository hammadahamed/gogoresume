import { IsString, IsEmail, IsOptional } from 'class-validator';

export class JoinWaitlistDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  profession?: string;
}
