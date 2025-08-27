import { IsString, IsOptional } from 'class-validator';

export class SaveOnboardingDTO {
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsString()
  experienceLevel: string;

  @IsString()
  designation: string;

  @IsString()
  industry: string;
}
