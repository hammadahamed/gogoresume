import { useUserStore } from "../stores/useUserStore";
import ResumeAPI from "../api-factory/resume";
import { toast } from "vue3-toastify";
import { computed, ref } from "vue";

import type { UserInfo } from "../types/resume.types";
import useAuthComposable from "./useAuth";
import { DEFAULT_RESUME } from "../constants/app.constants";
import { getSuggestions } from "@/utils/suggestions";
import GGRWindowEvents from "@/utils/windowEvents";

interface SavedResume {
  id: string;
  name: string;
  templateId: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const emptyUserInfo: UserInfo = {
  personalInfo: {
    firstName: "",
    lastName: "",
    title: "",
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

export function useDataManager() {
  const userStore = useUserStore();
  const { accessToken } = useAuthComposable();
  // Shared state for saved resumes
  const savedResumes = ref<SavedResume[]>([]);
  const resumesLoading = ref(false);
  const syncing = ref(false);

  const userInfo = computed(() => {
    if (userStore.userInfo && Object.keys(userStore.userInfo).length === 0) {
      return emptyUserInfo;
    }
    return userStore.userInfo;
  });

  const currentResume = computed(() => userStore.currentResume);

  const getUserProfile = async () => {
    if (userStore.userProfileLoaded) return;

    try {
      // Quick check for stored data
      // const { userInfo: storedInfo } = await loadUserInfo();
      // if (storedInfo) {
      //   userStore.setUserInfo(storedInfo);
      //   return storedInfo;
      // }

      const response = await ResumeAPI.getUserProfile();
      if (!response.data) {
        setEmptyUserInfo();
      } else {
        userStore.setUserInfo(response.data);
        // Try to save to storage for next time
        // saveUserInfo(response.data);
      }

      userStore.userProfileLoaded = true;
      return userStore.userInfo;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      toast.error("Failed to load user profile");
      return userStore.userInfo;
    }
  };

  const saveUserProfile = async (info: UserInfo) => {
    try {
      const response = await ResumeAPI.saveUserProfile(info);
      if (response) {
        userStore.setUserInfo(info);
        // saveUserInfo(info);
        toast.success("Profile saved successfully!");
      }
    } catch (error) {
      console.error("Failed to save user profile:", error);
      toast.error("An error occurred while saving information.");
      throw error;
    }
  };

  const hasUserData = computed(() => {
    const currentResume = userStore.currentResume as any;
    const personalInfo = currentResume?.personalInfo;
    return !!(
      personalInfo?.firstName ||
      personalInfo?.lastName ||
      personalInfo?.email ||
      currentResume?.workExperiences?.length ||
      currentResume?.education?.length ||
      currentResume?.skills?.length
    );
  });

  const setEmptyCurrentResume = () => {
    userStore.setCurrentResume(emptyUserInfo);
  };

  const setEmptyUserInfo = () => {
    userStore.setUserInfo(emptyUserInfo);
  };

  const getSavedResumes = async () => {
    try {
      const response = await ResumeAPI.getSavedResumes();
      return response.data.resumes || [];
    } catch (error) {
      console.error("Failed to fetch saved resumes:", error);
      toast.error("Failed to load saved resumes");
      throw error;
    }
  };

  const loadSavedResumes = async () => {
    resumesLoading.value = true;
    try {
      const resumes = await getSavedResumes();
      savedResumes.value = resumes;
      return resumes;
    } catch (error) {
      console.error("Error loading saved resumes:", error);
      savedResumes.value = [];
      return [];
    } finally {
      resumesLoading.value = false;
    }
  };

  const resumeOptions = computed(() => {
    const list = [
      !resumesLoading.value && (DEFAULT_RESUME as any),
      ...savedResumes.value,
    ];
    const options = list.map((resume) => ({
      value: resume.id,
      label: resume.name,
    }));
    return options;
  });

  const syncData = async (mute = false) => {
    syncing.value = true;
    try {
      if (!userStore.userInfo) {
        await getUserProfile();
      }
      const suggestions = getSuggestions();
      const clonedUserInfo = JSON.parse(JSON.stringify(suggestions));
      const synced = await GGRWindowEvents.saveUserInfo(clonedUserInfo);
      if (synced) {
        if (!mute) toast.success("Data synced successfully");
      } else {
        if (!mute) toast.error("Failed to sync data");
      }
    } catch (error) {
      console.error("Failed to sync data:", error);
      if (!mute) toast.error("Failed to sync data");
    } finally {
      setTimeout(() => {
        syncing.value = false;
      }, 1000);
    }
  };

  return {
    setEmptyUserInfo,
    getUserProfile,
    saveUserProfile,
    userInfo,
    hasUserData,
    currentResume,
    setEmptyCurrentResume,
    getSavedResumes,
    loadSavedResumes,
    savedResumes,
    resumesLoading,
    resumeOptions,
    syncing,
    syncData,
  };
}
