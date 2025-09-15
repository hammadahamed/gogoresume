<template>
  <div class="flex h-screen overflow-hidden bg-white">
    <!-- Left pane - Illustration and Copy -->
    <div class="w-[45%] flex flex-col justify-center items-center p-12 -mt-14">
      <div class="max-w-md">
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
              class="font-bold squiggly-underline cursor-pointer"
              @click="appStore.setActiveTab('my-resumes')"
              >My Resumes</span
            >
            to create multiple resumes. Pick a resume template from
            <span
              class="font-bold squiggly-underline cursor-pointer"
              @click="appStore.setActiveTab('templates')"
              >Templates</span
            >
            and start building your resume.
          </p>
        </div>
      </div>
    </div>

    <!-- Right pane - UserInfo Form -->

    <div
      class="w-[50%] bg-white border-4 border-black m-10"
      style="height: calc(100vh - 120px)"
    >
      <div v-if="loading" class="flex justify-center items-center h-full">
        <Spinner />
      </div>
      <UserInfo v-else />
      <div class="flex justify-end pb-10 mt-4">
        <SaveProfileBtn :userInfo="currentResume" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import UserInfo from "./UserInfo.vue";
import SaveProfileBtn from "./SaveProfileBtn.vue";
import FILLOUT_INFO from "@/assets/illustrations/fillout_resume_info.svg";
import { useAppStore } from "../../stores/useAppStore";
import { useDataManager } from "../../composables/useDataManager";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "vue3-toastify";
import Spinner from "@/common/components/Spinner.vue";

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
.squiggly-underline::after {
  bottom: -6px;
}
</style>
