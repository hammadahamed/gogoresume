import { useUserStore } from "../stores/user";
import UserAPI from "../api-factory/user";
import { toast } from "vue3-toastify";
import { ref } from "vue";
import type { UserInfo } from "../stores/user";
import { saveUserInfo, loadUserInfo } from "../utils/windowEvents";

const emptyUserInfo: UserInfo = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    professionalLinks: [],
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
};

// Create singleton instances
const userInfo = ref<UserInfo>(emptyUserInfo);
let loadPromise: Promise<any> | null = null;

export function useUserInfoManager() {
  const userStore = useUserStore();

  const getUserProfile = async () => {
    if (loadPromise) return loadPromise;

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
        const response = await UserAPI.getUserProfile();
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
      const response = await UserAPI.saveUserProfile(info);
      console.log("🚀 ~ saveUserProfile ~ response:", response);
      if (response) {
        userStore.setUserInfo(info);
        userInfo.value = info;
        saveUserInfo(info);
        toast.success("Information saved successfully!");
      }
    } catch (error) {
      console.error("Failed to save user profile:", error);
      toast.error("An error occurred while saving information.");
      throw error;
    }
  };

  return {
    getUserProfile,
    saveUserProfile,
    userInfo,
  };
}
