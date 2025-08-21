import { useUserStore } from "../stores/useUserStore";
import ResumeAPI from "../api-factory/resume";
import { toast } from "vue3-toastify";
import { computed, ref } from "vue";

import { saveUserInfo, loadUserInfo } from "../utils/windowEvents";
import type { UserInfo } from "../types/resume.types";
import useAuthComposable from "./useAuth";

const emptyUserInfo: UserInfo = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    professionalLinks: [],
  },
  professionalSummary: "",
  workExperiences: [],
  education: [],
  skills: [],
  projects: [],
};

// Create singleton instances
const userInfo = ref<UserInfo>(emptyUserInfo);
let loadPromise: Promise<any> | null = null;

export function useUserInfoManager() {
  const userStore = useUserStore();
  const { accessToken } = useAuthComposable();

  const getUserProfile = async () => {
    if (loadPromise || !accessToken.value) return loadPromise;

    loadPromise = (async () => {
      try {
        // Quick check for stored data
        const { userInfo: storedInfo } = await loadUserInfo();
        console.log("\n\n===>🚀 ~ loadPromise= ~ storedInfo:", storedInfo);
        if (storedInfo) {
          userStore.setUserInfo(storedInfo);
          userInfo.value = storedInfo;
          return storedInfo;
        }

        // No stored data, fetch from API
        const response = await ResumeAPI.getUserProfile();
        if (response.data) {
          userStore.setUserInfo(response.data);
          userInfo.value = response.data;
          // Try to save to storage for next time
          saveUserInfo(response.data);
          return response.data;
        }

        return emptyUserInfo;
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        toast.error("Failed to load user profile");
        loadPromise = null;
        return emptyUserInfo;
      }
    })();

    return loadPromise;
  };

  const saveUserProfile = async (info: UserInfo) => {
    try {
      const response = await ResumeAPI.saveUserProfile(info);
      console.log("🚀 ~ saveUserProfile ~ response:", response);
      if (response) {
        userStore.setUserInfo(info);
        userInfo.value = info;
        saveUserInfo(info);
        toast.success("Profile saved successfully!");
      }
    } catch (error) {
      console.error("Failed to save user profile:", error);
      toast.error("An error occurred while saving information.");
      throw error;
    }
  };

  const hasUserData = computed(() => {
    const personalInfo = userInfo.value?.personalInfo;
    return !!(
      personalInfo?.firstName ||
      personalInfo?.lastName ||
      personalInfo?.email ||
      userInfo.value?.workExperiences?.length ||
      userInfo.value?.education?.length ||
      userInfo.value?.skills?.length
    );
  });

  return {
    getUserProfile,
    saveUserProfile,
    userInfo,
    hasUserData,
  };
}
