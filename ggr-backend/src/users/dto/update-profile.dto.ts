import { IsString, IsOptional } from 'class-validator';
import { IUser } from 'src/schemas/users.schema';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}

export type UpdateProfileResponse = Pick<
  IUser,
  'firstName' | 'lastName' | 'email' | 'profilePicture'
>;
