export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  address?: string;
  linkedin?: string;
  portfolio?: string;
  professionalLinks: { label: string; url: string }[];
  professionalSummary?: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  gpa?: string;
  startDate: string;
  endDate: string;
  honors?: string[];
}

export interface UserInfo {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  workExperiences: Experience[];
  education: Education[];
  skills: string[];
  projects: any[]; // We can type this more specifically if needed
}
