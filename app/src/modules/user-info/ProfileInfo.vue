<template>
  <div class="profile-info-layout">
    <!-- Left pane - Illustration and Copy (hidden on mobile) -->
    <div class="left-pane">
      <div class="max-w-md mt-28">
        <!-- Illustration -->
        <div class="mb-8 flex justify">
          <div
            class="w-64 h-64 flex items-center justify-center rounded-lg overflow-hidden"
          >
            <component :is="FILLOUT_INFO" class="h-full rounded-r-full" />
          </div>
        </div>

        <!-- Messaging -->
        <div class="space-y-6">
          <p class="text-3xl text-left font-bold text-gray-900 leading-tight">
            Build Your Master Profile
          </p>
          <!-- Resume Import Section -->
          <div class="pt-4 pb-8 border-t border-b border-gray-200">
            <p class="text-sm font-semibold text-gray-800 mb-3">
              Or import from an existing resume
            </p>
            <ResumeUpload @parsed="handleParsedResume" />
          </div>
          <p class="text-gray-700" style="line-height: 35px">
            Instead of typing your profile 1000s of times across many sites,

            <span class="font-bold bg-highlight"> Type here just once</span>
          </p>
          <!-- Benefits -->
          <div class="space-y-1 mt-8 mb-8">
            <div
              v-for="benefit in benefits"
              :key="benefit.id"
              class="flex items-center gap-3 text-base text-gray-800"
            >
              <div
                :style="{
                  background: 'black',
                }"
                class="w-1.5 h-1.5 rounded-full transform rotate-45"
              ></div>
              <span class="font">{{ benefit.text }}</span>
            </div>
          </div>

          <p class="text-gray-700">
            Go to
            <span
              class="font-bold cursor-pointer"
              @click="appStore.setActiveTab('my-resumes')"
              >My Resumes</span
            >
            to create multiple resumes. Pick a resume template from
            <span
              class="font-bold cursor-pointer"
              @click="appStore.setActiveTab('templates')"
              >Templates</span
            >
            and start building your resume.
          </p>
        </div>
      </div>
    </div>

    <!-- Right pane - UserInfo Form -->
    <div class="right-pane">
      <!-- Mobile: Resume Upload at top -->
      <div class="mobile-upload-section">
        <p class="text-sm font-semibold text-gray-700 mb-2">
          Import from an existing resume
        </p>
        <ResumeUpload @parsed="handleParsedResume" />
      </div>

      <div v-if="loading" class="flex justify-center items-center h-full">
        <Spinner />
      </div>
      <template v-else>
        <UserInfo />
        <div class="save-btn-container">
          <SaveProfileBtn :userInfo="currentResume" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import UserInfo from "./UserInfo.vue";
import SaveProfileBtn from "./SaveProfileBtn.vue";
import ResumeUpload from "./components/ResumeUpload.vue";
import FILLOUT_INFO from "@/assets/illustrations/fillout_resume_info.svg";
import { useAppStore } from "../../stores/useAppStore";
import { useDataManager } from "../../composables/useDataManager";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "vue3-toastify";
import Spinner from "@/common/components/Spinner.vue";
import type { UserInfo as UserInfoType } from "@/types/resume.types";

const appStore = useAppStore();
const { currentResume, getUserProfile } = useDataManager();
const userStore = useUserStore();
const loading = ref(true);

const benefits = [
  {
    id: 1,
    text: "Serves as base content for your other resumes",
  },
  {
    id: 2,
    text: "It's a one-time setup",
  },
  {
    id: 3,
    text: "AI-powered job optimization",
  },
];

const handleParsedResume = (parsedData: UserInfoType) => {
  // Update the user store with the parsed resume data
  userStore.setCurrentResume(parsedData);
  userStore.setUserInfo(parsedData);
  toast.success("Resume data imported! Review and save your profile.");
};

const init = async () => {
  try {
    loading.value = true;
    await getUserProfile();
    userStore.setCurrentResume(userStore.userInfo);
  } catch (error) {
    console.error("Error initializing user info:", error);
    toast.error("Failed to initialize user info");
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await init();
});
</script>

<style scoped>
.profile-info-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: white;
}

/* Left pane - desktop only */
.left-pane {
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  padding-top: 6rem;
  padding-bottom: 6rem;
  overflow-y: auto;
}

/* Right pane */
.right-pane {
  width: 50%;
  background-color: white;
  border: 4px solid black;
  margin: 2.5rem;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Mobile upload section - hidden on desktop */
.mobile-upload-section {
  display: none;
}

/* Save button container */
.save-btn-container {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
  margin-top: 1rem;
  padding-right: 1rem;
}

/* Mobile styles (< 1000px) */
@media (max-width: 999px) {
  .profile-info-layout {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }

  .left-pane {
    display: none;
  }

  .right-pane {
    width: 100%;
    margin: 0;
    border: none;
    height: auto;
    min-height: 100vh;
  }

  .mobile-upload-section {
    display: block;
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
    background-color: #f9fafb;
  }

  .save-btn-container {
    position: sticky;
    bottom: 0;
    background-color: white;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  }
}
</style>
