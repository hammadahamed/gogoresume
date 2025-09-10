export interface ProfessionalLink {
  label: string;
  url: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  professionalLinks: ProfessionalLink[];
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
}

export interface Project {
  name: string;
  description: string;
  projectLink?: string;
  sourceCode?: string;
}

export interface UserInfo {
  personalInfo: PersonalInfo;
  professionalSummary: string;
  workExperiences: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
}
