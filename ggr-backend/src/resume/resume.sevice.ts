import { Injectable } from '@nestjs/common';
import UserProfileModel from 'src/schemas/userProfile.schema';
import SavedResumeModel, { ISavedResume } from 'src/schemas/savedResume.schema';

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

  async saveResume(
    userId: string,
    name: string,
    data: any,
    templateId?: string,
  ): Promise<{ status: string; message: string; resumeId: string }> {
    try {
      const savedResume = await SavedResumeModel.create({
        userId,
        name,
        data,
        templateId: templateId || 'classic',
      });

      return {
        status: 'success',
        message: 'Resume saved successfully',
        resumeId: savedResume._id.toString(),
      };
    } catch (error) {
      console.error('Error saving resume:', error);
      throw new Error('Failed to save resume');
    }
  }

  async updateResume(
    userId: string,
    resumeId: string,
    name: string,
    data: any,
    templateId?: string,
  ): Promise<{ status: string; message: string }> {
    try {
      const updatedResume = await SavedResumeModel.findOneAndUpdate(
        { _id: resumeId, userId },
        {
          name,
          data,
          templateId: templateId || 'classic',
        },
        { new: true },
      );

      if (!updatedResume) {
        throw new Error('Resume not found or unauthorized');
      }

      return { status: 'success', message: 'Resume updated successfully' };
    } catch (error) {
      console.error('Error updating resume:', error);
      throw new Error('Failed to update resume');
    }
  }

  async getSavedResumes(userId: string): Promise<{
    status: string;
    data: {
      id: string;
      name: string;
      templateId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  }> {
    try {
      const fields: any = {
        _id: 1,
        name: 1,
        templateId: 1,
        createdAt: 1,
        updatedAt: 1,
      };
      const resumes = await SavedResumeModel.find({ userId })
        .select(fields)
        .sort({ updatedAt: -1 });

      const formattedResumes = resumes.map((resume) => ({
        id: resume._id.toString(),
        name: resume.name,
        templateId: resume.templateId || 'classic',
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      }));

      return { status: 'success', data: formattedResumes };
    } catch (error) {
      console.error('Error loading saved resumes:', error);
      throw new Error('Failed to load saved resumes');
    }
  }

  async getResumeById(
    userId: string,
    resumeId: string,
  ): Promise<{ status: string; data: ISavedResume | null }> {
    try {
      const resume = await SavedResumeModel.findOne({ _id: resumeId, userId });

      if (!resume) {
        return { status: 'success', data: null };
      }

      return { status: 'success', data: resume };
    } catch (error) {
      console.error('Error loading resume:', error);
      throw new Error('Failed to load resume');
    }
  }

  async deleteResume(
    userId: string,
    resumeId: string,
  ): Promise<{ status: string; message: string }> {
    try {
      const deletedResume = await SavedResumeModel.findOneAndDelete({
        _id: resumeId,
        userId,
      });

      if (!deletedResume) {
        throw new Error('Resume not found or unauthorized');
      }

      return { status: 'success', message: 'Resume deleted successfully' };
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw new Error('Failed to delete resume');
    }
  }
}
