interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  address: string;
  linkedin: string;
  portfolio: string;
  professionalLinks: Array<{ label: string; url: string }>;
  professionalSummary: string;
}

interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface UserProfileData {
  personalInfo: PersonalInfo;
  workExperiences: Experience[];
  education: any[]; // Add proper type if needed
  skills: string[];
  projects: any[]; // Add proper type if needed
}

export type SectionId =
  | 'professionalSummary'
  | 'workExperiences'
  | 'skills'
  | 'projects';

export interface TweakResumeDTO {
  data: UserProfileData;
  jobDescription: string;
  userPrompt: string;
  sections: SectionId[]; // sections to focus on
}

export interface TweakResumeResponse {
  data: UserProfileData;
}
