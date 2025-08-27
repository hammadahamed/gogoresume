<template>
  <div class="flex flex-col h-screen w-full">
    <!-- Section 2: Main Content -->
    <div
      class="flex-1 flex flex-col lg:flex-row mx-auto w-full max-w-[1000px]"
      :class="{ 'justify-between': isExtensionMode }"
    >
      <!-- Left: Resume Preview -->
      <div v-if="!userInfo">No user info</div>
      <div
        v-else
        class="w-full p-6 flex flex-col max-w-[800px]"
        :class="{ 'pb-0': isExtensionMode }"
      >
        <div
          class="flex-1 flex flex-col justify-center"
          :class="isExtensionMode ? 'w-full' : 'w-auto'"
        >
          <SelectResume
            v-model="selectedResume"
            :class="isExtensionMode ? 'w-[180px]' : 'w-[240px]'"
          />
          <ReactResumeBuilder :userData="userInfo" class="-mt-15" />
        </div>
      </div>

      <!-- Right: Interactive Cards -->
      <div
        class="w-full flex flex-col justify-center"
        :class="isExtensionMode ? 'pt-2 justify-end px-6' : 'p-6'"
      >
        <!-- Job Description Card -->
        <div
          class="transition-all duration-300 mb-6"
          :class="{
            'p-0 mb-0 h-[50px]': isExtensionMode,
            'h-[300px] max-h-[400px] px-1.5': !isExtensionMode,
            'mb-0': isExtensionMode,
          }"
        >
          <p
            class="font-semibold text-gray-900 text-sm"
            :class="
              isExtensionMode ? 'pb-1 text-xs' : 'underline pb-2 text-base'
            "
          >
            Job Description
          </p>
          <textarea
            v-model="jobDescription"
            placeholder="Paste the job description here..."
            rows="4"
            :style="{
              height: isExtensionMode ? '50px' : 'calc(100% - 50px)',
            }"
            class="w-full bg--100 rounded border border-gray-400 p-3 text-sm text-gray-700 placeholder:text-gray-400 resize-none outline-none"
          ></textarea>
        </div>

        <!-- Sections Card -->
        <div
          class="rounded-3xl transition-all duration-300"
          :class="{
            'p-0 mb-0 mt-2': isExtensionMode,
            'mb-6 px-1.5': !isExtensionMode,
          }"
        >
          <p
            class="font-semibold text-gray-900 text-sm"
            :class="{
              'underline pb-2 text-base': !isExtensionMode,
              'pb-1 text-xs': isExtensionMode,
            }"
          >
            Sections to Optimize
          </p>
          <div
            style="height: calc(100% - 50px)"
            class="w-full bg-white/80 rounded-2xl"
          >
            <div
              class="flex flex-wrap"
              :class="isExtensionMode ? 'gap-1' : 'gap-2'"
            >
              <button
                v-for="section in sections"
                :key="section.id"
                @click="toggleSection(section.id)"
                :class="[
                  ' rounded-full text-xs font-medium transition-all duration-300  border',
                  section.isSelected
                    ? 'bg-[#6366f1] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-400',

                  isExtensionMode ? 'p-1 px-2' : 'px-3 py-1.5',
                ]"
              >
                {{ section.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Section 3: Bottom User Input -->
        <div class="py-4" :class="{ 'py-0': isExtensionMode }">
          <div class="w-[100%] mx-auto mb-5">
            <div
              class="px-1.5 border border-gray-300 bg-gray-100"
              :class="isExtensionMode ? 'rounded-2xl' : 'rounded-3xl'"
            >
              <div class="flex items-end rounded-4xl">
                <textarea
                  v-model="customInstructions"
                  placeholder="Add specific instructions for AI optimization..."
                  class="flex-1 translate-y-1 bg-transparent text-sm border-0 outline-none resize-none p-3 placeholder:text-gray-600"
                  :class="
                    isExtensionMode
                      ? 'h-[80px] placeholder:text-sm'
                      : 'h-[150px] '
                  "
                ></textarea>
                <button
                  @click="optimizeResume"
                  :disabled="!enableOptimizeButton"
                  class="m-1 mb-2 w-max flex items-center justify-center bg-black text-white hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="
                    isExtensionMode
                      ? 'px-3 rounded-2xl h-8'
                      : 'px-3 pr-2 rounded-full h-9'
                  "
                >
                  <p
                    class="font-semibold"
                    :class="isExtensionMode ? 'text-xs mr-1' : 'text-sm mr-2'"
                  >
                    {{ isOptimizing ? "Tweaking..." : "Tweak" }}
                  </p>
                  <p
                    class="font-semibold"
                    :class="{
                      'text-lg': isExtensionMode,
                      'text-xl': !isExtensionMode,
                    }"
                  >
                    ⚡️
                  </p>

                  <!-- <component :is="SEND" class="w-4 h-4" /> -->
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import ReactResumeBuilder from "../../ReactResumeBuilder.vue";
import { useUserInfoManager } from "../../composables/useUserInfoManager";
import SelectResume from "./SelectResume.vue";
import SEND from "@/assets/svg/send.svg";
import resumeApi from "@/api-factory/resume";
import { toast } from "vue3-toastify";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3010";

const { userInfo } = useUserInfoManager();
const jobDescription = ref("");
const customInstructions = ref("");
const selectedResume = ref("");

const isOptimizing = ref(false);
const isExtensionMode = inject("isExtensionMode");

const sections = ref([
  {
    id: "professionalSummary",
    label: "Professional Summary",
    isSelected: true,
  },
  { id: "workExperiences", label: "Work Experience", isSelected: false },
  { id: "skills", label: "Skills", isSelected: false },
  { id: "projects", label: "Projects", isSelected: false },
]);

const selectedSections = computed(() => {
  return sections.value
    .filter((section) => section.isSelected)
    .map((section) => section.id);
});

const enableOptimizeButton = computed(() => {
  return (
    jobDescription.value &&
    userInfo.value &&
    !isOptimizing.value &&
    selectedSections?.value?.length > 0
  );
});

const toggleSection = (sectionId: string) => {
  const section = sections.value.find((section) => section.id === sectionId);
  if (section) {
    section.isSelected = !section.isSelected;
  }
};

const optimizeResume = async () => {
  if (!enableOptimizeButton.value) return;
  isOptimizing.value = true;

  try {
    const data = {};

    selectedSections.value.forEach((section) => {
      data[section] = userInfo.value[section as keyof UserInfo];
    });

    const body = {
      data,
      jobDescription: jobDescription.value,
      userPrompt: customInstructions.value,
      sections: selectedSections.value,
    };

    const response = await resumeApi.tweakResume(body);

    if (!response.ok) {
      throw new Error("Failed to optimize resume");
    }

    const result = await response.json();
    console.log("🚀 ~ optimizeResume ~ result:", result);

    // Update the resume data with the tweaked content
    selectedSections.value.forEach((section) => {
      userInfo.value[section as keyof UserInfo] = result.data[section];
    });
  } catch (error) {
    console.error("Failed to optimize resume:", error);
    toast.error(error?.response?.data?.message || error.message);
  } finally {
    isOptimizing.value = false;
  }
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
