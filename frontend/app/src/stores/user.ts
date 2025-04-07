import { defineStore } from "pinia";

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
  summary?: string;
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
  experiences: Experience[];
  education: Education[];
  skills: string[];
  projects: any[]; // We can type this more specifically if needed
}

interface UserState {
  userInfo: UserInfo | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    userInfo: null,
  }),

  actions: {
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
    },

    clearUserInfo() {
      this.userInfo = null;
    },
  },
});
