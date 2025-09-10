import { defineStore } from "pinia";
import type { UserInfo } from "../types/resume.types";
import type { User } from "./store.types";

interface UserState {
  userInfo: UserInfo | null;
  resumesDataCache: Record<string, UserInfo>;
  currentResume: UserInfo | {};
  user: User | null;
  userProfileLoaded: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    userInfo: null,
    resumesDataCache: {},
    currentResume: {},
    userProfileLoaded: false,
  }),

  actions: {
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
    },

    clearUserInfo() {
      this.userInfo = null;
      this.resumesDataCache = {};
      this.currentResume = {};
    },
    setResumesDataCache(id: string, info: UserInfo) {
      this.resumesDataCache[id] = info;
    },
    clearResumesDataCache() {
      this.resumesDataCache = {};
    },
    setCurrentResume(info: UserInfo) {
      this.currentResume = JSON.parse(JSON.stringify(info));
    },
    clearCurrentResume() {
      this.currentResume = {};
    },
  },
});
