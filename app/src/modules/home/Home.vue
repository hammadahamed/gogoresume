<template>
  <div
    class=""
    :class="{
      'bg-transparent': homeView,
      'bg-white h-full overflow-auto': !homeView,
    }"
  >
    <div class="max-w-[900px] mx-auto px-6 py-16">
      <!-- Hero Section -->
      <div class="text-center mb-22">
        <p
          class="text-3xl font-bold text-gray-900 mb-2 leading-tight"
          :class="{
            'text-4xl mb-8': homeView,
          }"
        >
          AI-Powered Resume Optimizer
        </p>

        <p class="text-2xl mb font-medium text-gray-700 mt-5">
          <span class="squiggly-underlin bg-highlight">Tweak resume</span> for
          every <span class="squiggly-underlin bg-">job description</span> in
          <span class="squiggly-underlin">seconds </span> 🔥
        </p>
      </div>

      <!-- 3-Step Process -->
      <div class="mb-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <!-- Dynamic Step Cards -->
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            class="bg-white cursor-pointer border-3 border-gray-900 hover:scale-101 hover:shadow-sm transition-all duration-300 flex flex-col h-full"
            @click="appStore.setActiveTab(step.route)"
          >
            <!-- Illustration Section (Top) -->
            <div
              :class="[
                'h-40 flex items-center justify-center relative',
                step.illustrationBg,
              ]"
              :style="{
                backgroundColor:
                  step.id === 3 ? '#c4c8ff' : step.illustrationBg,
              }"
            >
              <div
                class="w-full h-full flex items-center justify-center overflow-hidden"
              >
                <component :is="step.illustration" />
              </div>

              <!-- Step Number Badge -->
              <!-- <div
                class="absolute top-1 left-1 w-10 h-10 bg-black text-white backdrop-blur-sm rounded-full flex items-center justify-center text-sm font-bold shadow-sm"
              >
                {{ index + 1 }}
              </div> -->
            </div>

            <!-- Content Section (Bottom) -->
            <div
              class="p-5 flex flex-col flex-grow"
              :class="{ 'h-60': !homeView }"
            >
              <!-- Text Content -->
              <div class="mb-6 flex-grow">
                <h3 class="text-xl font-bold text-gray-900 mb-3">
                  {{ step.title }}
                </h3>
                <p class="text-gray-600 leading-relaxed whitespace-pre-line">
                  {{ step.description }}
                </p>
              </div>

              <!-- Action Button -->
              <div v-if="!homeView" class="mt-auto mx-auto translate-y-11">
                <SpecialBtn
                  :text="step.buttonText"
                  size="default"
                  :variant="step.buttonVariant"
                  :primaryColor="'black'"
                  :secondaryColor="'white'"
                  :textColor="'white'"
                  class="transition-all duration-300 shadow-lg"
                  @click="appStore.setActiveTab(step.route)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chrome Extension Promotion -->
      <div class="mb-16" v-if="homeView">
        <ChromeExtPromotion />
      </div>

      <div class="mb-16" v-if="!homeView">
        <InstallationCheck @extensionInstalled="handleExtensionInstalled" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from "../../stores/useAppStore";
import SpecialBtn from "@/common/components/SpecialBtn.vue";
import ChromeExtPromotion from "./ChromeExtPromotion.vue";
import FILLOUT_INFO from "../../assets/illustrations/fillout_resume_info.svg";
import MULTIPLE_RESUMES from "../../assets/illustrations/create_multiple_versions.svg";
import PICK_AND_TWEAK from "../../assets/illustrations/tweak_with_ai.svg";
import { defineProps, ref } from "vue";
import InstallationCheck from "../extension/InstallationCheck.vue";

const props = defineProps({
  homeView: {
    type: Boolean,
    default: false,
  },
});
const appStore = useAppStore();

const showPromotion = ref(false);

const handleExtensionInstalled = (status: boolean) => {
  showPromotion.value = status;
};

const steps = [
  {
    id: 1,
    title: "Add Your Info",
    description:
      "Fill out your work experience, skills, and education just once.",
    buttonText: "Start Now",
    buttonVariant: "default",
    route: "master-profile",
    illustrationBg: "bg-blue-100",
    mainEmoji: "📝",
    supportEmoji: "��",
    illustration: FILLOUT_INFO,
  },
  {
    id: 2,
    title: "Create Resumes",
    description:
      "Create multiple versions of your resume with different templates & content",
    buttonText: "See Templates",
    buttonVariant: "default",
    route: "my-resumes",
    illustrationBg: "bg-purple-100",
    mainEmoji: "🎨",
    supportEmoji: "📄",
    illustration: MULTIPLE_RESUMES,
  },
  {
    id: 3,
    title: "Pick & Tweak with AI",
    description:
      "1. Paste the job description \n 2. Optimize it with AI \n 3. Download & Apply.",
    buttonText: "Try Optimizer",
    buttonVariant: "dark",
    route: "resume-tweaker",
    illustrationBg: "#c4c8ff",
    mainEmoji: "🤖",
    supportEmoji: "⚡",
    illustration: PICK_AND_TWEAK,
  },
];
</script>

<style scoped></style>
