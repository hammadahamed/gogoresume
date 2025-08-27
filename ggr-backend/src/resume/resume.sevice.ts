import { Injectable } from '@nestjs/common';
import UserProfileModel from 'src/schemas/userProfile.schema';

@Injectable()
export class ResumeService {
  async saveUserProfile(
    userId: string,
    userProfileData: any,
  ): Promise<{ status: string; message: string }> {
    try {
      // Find existing profile or create new one
      const existingProfile = await UserProfileModel.findOne({ userId });

      if (existingProfile) {
        // Update existing profile
        existingProfile.data = userProfileData;
        await existingProfile.save();
      } else {
        // Create new profile
        await UserProfileModel.create({
          userId,
          data: userProfileData,
        });
      }

      return { status: 'success', message: 'User profile data saved.' };
    } catch (error) {
      console.error('Error saving user profile data:', error);
      throw new Error('Failed to save user profile data');
    }
  }

  async getUserProfile(userId: string): Promise<{ status: string; data: any }> {
    try {
      const userProfile = await UserProfileModel.findOne({ userId });

      if (!userProfile) {
        return { status: 'success', data: null };
      }

      return { status: 'success', data: userProfile.data };
    } catch (error) {
      console.error('Error loading user profile data:', error);
      throw new Error('Failed to load user profile data');
    }
  }
}
