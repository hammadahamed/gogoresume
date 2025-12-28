export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  professionalLinks: Array<{ label: string; url: string }>;
  professionalSummary: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  gpa?: string;
  startDate: string;
  endDate: string;
  honors?: string[];
}

export interface Project {
  name: string;
  description: string;
  projectLink?: string;
  sourceCode?: string;
}

export interface UserInfo {
  personalInfo: PersonalInfo;
  workExperiences: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}

export type SectionId =
  | 'professionalSummary'
  | 'workExperiences'
  | 'skills'
  | 'projects';

export interface TweakResumeDTO {
  data: UserInfo;
  jobDescription: string;
  userPrompt: string;
  sections: SectionId[];
}

export interface TweakResumeResponse {
  data: UserInfo;
  matchScore: number;
}

export type AIProvider = 'openai' | 'claude';

export interface ParseResumeDTO {
  provider: AIProvider;
}

export interface ParseResumeResponse {
  data: UserInfo;
  remainingParses: number;
}
