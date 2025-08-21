import { defineStore } from "pinia";
import type { UserInfo } from "../types/resume.types";
import type { User } from "./store.types";

interface UserState {
  userInfo: UserInfo | null;
  user: User | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
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
