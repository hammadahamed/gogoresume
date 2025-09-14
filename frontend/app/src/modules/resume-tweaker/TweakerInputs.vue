<template>
  <!-- Right: Interactive Cards -->
  <div
    class="w-full flex flex-col justify-center smooth-expand"
    :class="isExtensionMode ? 'pt-2 justify-end px-6' : 'p-6'"
  >
    <!-- Extension Mode ONLY: Initial State with JD Box -->
    <div
      v-if="isExtensionMode && !hasMeaningfulJobDescription"
      class="flex flex-col items-center justify-center h-screen py-8 smooth-expand"
    >
      <div class="text-center mb-6 animate-fade-in">
        <div
          class="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm"
        >
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h3 class="text-sm font-semibold text-gray-900 mb-1">
          Ready to optimize?
        </h3>
        <button class="text-xs text-gray-500" @click="openMasterProfile()">
          open master profile
        </button>
        <p class="text-xs text-gray-500">
          Paste the job description to get started
        </p>
      </div>

      <div class="w-full">
        <div
          class="relative"
          :class="{
            'rainbow-border-wrapper': !hasMeaningfulJobDescription,
          }"
        >
          <div class="relative">
            <textarea
              id="ggr-job-description"
              v-model="jobDescription"
              placeholder="Paste the job description here..."
              :maxlength="JOB_DESCRIPTION_LIMIT"
              :class="[
                'w-full h-[120px] bg-gray-50 rounded-lg border-[2px] p-3 text-sm text-gray-700 placeholder:text-gray-800 resize-none outline-none transition-all duration-300 relative z-10 focus:ring animate-rainbow-border',
                isJobDescriptionOverLimit
                  ? ''
                  : 'border-[var(--primary-color)] focus:ring-[var(--primary-color)]',
              ]"
            ></textarea>
            <div class="absolute bottom-2 right-2 text-xs">
              {{ jobDescriptionCount }}/{{ JOB_DESCRIPTION_LIMIT }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full UI State (Normal mode OR Extension mode with JD) -->
    <div v-else class="smooth-expand animate-fade-in mt-6">
      <!-- Step 1: Job Description Card -->
      <div
        class="transition-all duration-300 mb-6 animate-fade-in"
        :class="{
          'p-0 mb-0 h-[50px]': isExtensionMode,
          'h-[350px] max-h-[500px] px-1.5': !isExtensionMode,
          'mb-0': isExtensionMode,
        }"
      >
        <div class="flex items-center gap-3 mb-2">
          <!-- indicator -->
          <div
            v-if="!isExtensionMode"
            class="-translate-y-1 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
            :class="
              isStep1Complete
                ? 'bg-teal-500 text-white'
                : 'bg-gray-300 text-gray-600'
            "
          >
            <span v-if="!isStep1Complete">1</span>
            <TICK v-else class="w-3 h-3" />
          </div>
          <div>
            <p
              class="font-semibold text-gray-900 text-sm"
              :class="isExtensionMode ? 'text-xs' : 'text-base'"
            >
              Job Description
            </p>
            <p class="text-xs text-gray-500" v-if="!isExtensionMode">
              Paste the job posting you're applying for
            </p>
          </div>
        </div>
        <div
          class="relative"
          :style="{
            marginLeft: isExtensionMode ? '0' : '33px',
            width: isExtensionMode ? '100%' : 'calc(100% - 50px)',
            height: 'calc(100% - 40px)',
          }"
        >
          <textarea
            id="ggr-job-description-normal"
            v-model="jobDescription"
            placeholder="Paste the job description here..."
            rows="4"
            :maxlength="JOB_DESCRIPTION_LIMIT"
            :style="{
              height: isExtensionMode ? '50px' : 'calc(100% - 30px)',
            }"
            :class="[
              'w-full border border-gray-400  focus:ring-1 focus:ring-indigo-500 rounded p-3 text-sm text-gray-700 placeholder:text-gray-400 resize-none outline-none transition-colors',
            ]"
          ></textarea>
          <div
            class="absolute text-xs font-medium"
            :class="[
              isJobDescriptionOverLimit ? 'text-amber-500' : 'text-gray-500',
              isExtensionMode ? '-top-[23px] right-2' : '-top-[38px] right-0',
            ]"
          >
            {{ jobDescriptionCount }}/{{ JOB_DESCRIPTION_LIMIT }}
          </div>
        </div>
      </div>

      <!-- Step 2: Sections Card -->
      <div
        class="rounded-3xl transition-all duration-300 animate-fade-in-delayed"
        :class="{
          'p-0 mt-2 mb-1': isExtensionMode,
          'mb-6 px-1.5': !isExtensionMode,
        }"
      >
        <div class="flex items-center gap-3 mb-2">
          <!-- indicator -->
          <div
            v-if="!isExtensionMode"
            class="-translate-y-1 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold"
            :class="
              isStep2Complete
                ? 'bg-teal-500 text-white'
                : 'bg-gray-300 text-gray-600'
            "
          >
            <span v-if="!isStep2Complete">2</span>
            <TICK v-else class="w-3 h-3" />
          </div>
          <div>
            <p
              class="font-semibold text-gray-900 text-sm"
              :class="
                isExtensionMode ? 'text-xs mt-3 -mb-1 ml-[1px]' : 'text-base'
              "
            >
              Sections to Optimize
            </p>
            <p class="text-xs text-gray-500" v-if="!isExtensionMode">
              Choose which parts of your resume to improve
            </p>
          </div>
        </div>
        <div
          style="height: calc(100% - 50px)"
          class="w-full bg-white/80 rounded-2xl"
        >
          <div
            class="flex flex-wrap"
            :class="isExtensionMode ? 'gap-1' : 'gap-2 ml-[30px]'"
          >
            <div
              v-for="section in sections"
              :key="section.id"
              class="relative group"
            >
              <button
                @click="toggleSection(section.id)"
                :disabled="section.disabled()"
                :class="[
                  'rounded-full text-xs font-medium transition-all duration-300 border',
                  section.disabled()
                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    : section.isSelected
                    ? 'bg-[#6366f1] text-white border-[#6366f1]'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-400',
                  isExtensionMode ? 'p-1 px-2' : 'px-3 py-1.5',
                ]"
              >
                {{ section.label }}
              </button>

              <!-- Tooltip for disabled sections -->
              <div
                v-if="section.disabled()"
                class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20"
              >
                Selected resume doesn't have any
                {{ section.label.toLowerCase() }} section
                <!-- Tooltip arrow -->
                <div
                  class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Custom Instructions (Optional) -->
      <div
        class="py-4 animate-fade-in-delayed-2"
        :class="{ 'py-0': isExtensionMode }"
      >
        <div
          class="flex items-center gap-3 mb-3 ml-[33px]"
          v-if="!isExtensionMode"
        >
          <!-- indicator -->
          <div
            v-if="false"
            class="-translate-y-1 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold transition-colors duration-200"
            :class="
              isStep1Complete && isStep2Complete
                ? 'bg-gray-400 text-white'
                : 'bg-gray-200 text-gray-400'
            "
          >
            3
          </div>
          <div>
            <p class="font-semibold text-gray-900 text-base">
              Custom Instructions
            </p>
            <p class="text-xs text-gray-500">
              Optional • Add specific requirements or focus areas
            </p>
          </div>
        </div>

        <div
          class="w-[100%] mx-auto mb-5"
          :class="isExtensionMode ? '' : 'ml-[31px] w-[calc(100%-50px)]'"
        >
          <div
            class="px-1.5 border border-gray-300 bg-gray-100"
            :class="
              isExtensionMode ? 'rounded-2xl h-[90px]' : 'rounded-2xl pb-3'
            "
          >
            <div class="flex items-end relative">
              <textarea
                id="ggr-custom-instructions"
                v-model="customInstructions"
                placeholder="e.g. Make minor tweaks, don't lie. (⌘+Enter or Ctrl+Enter to tweak)"
                :maxlength="CUSTOM_INSTRUCTIONS_LIMIT"
                @keydown="handleKeyDown"
                :class="[
                  'pr-16 flex-1 translate-y-1 bg-transparent text-sm border-0 outline-none resize-none placeholder:text-gray-400 transition-colors ',
                  isExtensionMode
                    ? 'h-[80px] placeholder:text-[12px] p-1 pb-3'
                    : 'h-[180px] p-2 py-1 placeholder:text-[13px]',
                ]"
              ></textarea>
              <div
                class="absolute text-xs font-medium pointer-events-none"
                :class="[
                  isCustomInstructionsOverLimit
                    ? 'text-amber-500'
                    : 'text-gray-500',
                  isExtensionMode
                    ? '-top-[20px] right-0'
                    : '-top-[48px] right-0',
                ]"
              >
                {{ customInstructionsCount }}/{{ CUSTOM_INSTRUCTIONS_LIMIT }}
              </div>
              <div class="relative group">
                <button
                  @click="optimizeResume"
                  :disabled="!enableOptimizeButton"
                  class="absolute bottom-0 right-0 m-1 mb w-max flex items-center justify-center bg-black text-white hover:opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
                  :class="
                    isExtensionMode
                      ? 'px-3 rounded-2xl h-8 mb-0 mr-0'
                      : 'px-3 pr-2 rounded-full h-9 -mb-1.5 mr-0'
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
                      'text-md': !isExtensionMode,
                    }"
                  >
                    ✨
                  </p>
                </button>

                <!-- Tooltip for disabled button -->
                <div
                  v-if="
                    !enableOptimizeButton &&
                    (isJobDescriptionOverLimit || isCustomInstructionsOverLimit)
                  "
                  class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20"
                >
                  Text exceeds character limits
                  <div
                    class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Full UI State -->
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onUnmounted, ref, watch } from "vue";
import TICK from "@/assets/svg/tick.svg";
import resumeApi from "@/api-factory/resume";
import { toast } from "vue3-toastify";
import { UserInfo } from "@/types/resume.types";

// Props
const props = defineProps<{
  currentResume: UserInfo | null;
}>();

// Emits
const emits = defineEmits<{
  "resume-updated": [resume: UserInfo];
  "job-description-state": [hasMeaningfulJobDescription: boolean];
  "optimizing-state": [isOptimizing: boolean];
  "match-score": [matchScore: number];
}>();

const jobDescription = ref("");
const customInstructions = ref("");
const isOptimizing = ref(false);
const isExtensionMode = inject("isExtensionMode");

// Input limits
const JOB_DESCRIPTION_LIMIT = 5000;
const CUSTOM_INSTRUCTIONS_LIMIT = 500;

// Debounced job description for UI switching
const debouncedJobDescription = ref("");
let debounceTimer: NodeJS.Timeout | null = null;

const openMasterProfile = () => {
  window.open("https://gogoresume.com/master-profile", "_blank");
};

// Watch for changes in job description and debounce
watch(
  jobDescription,
  (newValue) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      debouncedJobDescription.value = newValue;
    }, 800);
  },
  { immediate: true }
);

const sections = ref([
  {
    id: "professionalSummary",
    label: "Professional Summary",
    isSelected: false,
    disabled: () => props.currentResume?.professionalSummary?.length === 0,
  },
  {
    id: "workExperiences",
    label: "Work Experience",
    isSelected: false,
    disabled: () => props.currentResume?.workExperiences?.length === 0,
  },
  {
    id: "skills",
    label: "Skills",
    isSelected: false,
    disabled: () => props.currentResume?.skills?.length === 0,
  },
  {
    id: "projects",
    label: "Projects",
    isSelected: false,
    disabled: () => props.currentResume?.projects?.length === 0,
  },
]);

const selectedSections = computed(() => {
  return sections.value
    .filter((section) => section.isSelected)
    .map((section) => section.id);
});

// Character count computeds
const jobDescriptionCount = computed(() => jobDescription.value.length);
const customInstructionsCount = computed(() => customInstructions.value.length);

const isJobDescriptionOverLimit = computed(
  () => jobDescriptionCount.value >= JOB_DESCRIPTION_LIMIT
);
const isCustomInstructionsOverLimit = computed(
  () => customInstructionsCount.value >= CUSTOM_INSTRUCTIONS_LIMIT
);

const enableOptimizeButton = computed(() => {
  return (
    jobDescription.value &&
    props.currentResume &&
    !isOptimizing.value &&
    selectedSections?.value?.length > 0 &&
    !isJobDescriptionOverLimit.value &&
    !isCustomInstructionsOverLimit.value
  );
});

// Use debounced job description for UI switching
const hasMeaningfulJobDescription = computed(() => {
  return debouncedJobDescription.value.trim().length > 0;
});

// Watch for changes in hasMeaningfulJobDescription and emit to parent
watch(
  hasMeaningfulJobDescription,
  (newValue) => {
    emits("job-description-state", newValue);
  },
  { immediate: true }
);

// Watch for changes in optimizing state and emit to parent
watch(
  isOptimizing,
  (newValue) => {
    emits("optimizing-state", newValue);
  },
  { immediate: true }
);

// Watch for changes in currentResume and deselect disabled sections
watch(
  () => props.currentResume,
  () => {
    if (props.currentResume) {
      sections.value.forEach((section) => {
        if (section.disabled() && section.isSelected) {
          section.isSelected = false;
        }
      });
    }
  },
  { deep: true }
);

// Step completion indicators
const isStep1Complete = computed(() => hasMeaningfulJobDescription.value);
const isStep2Complete = computed(() => selectedSections.value.length > 0);

const toggleSection = (sectionId: string) => {
  const section = sections.value.find((section) => section.id === sectionId);
  if (section && !section.disabled()) {
    section.isSelected = !section.isSelected;
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  // Check for Cmd+Enter (Mac) or Ctrl+Enter (Windows/Linux)
  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault(); // Prevent default textarea behavior

    // Only trigger if the optimize button is enabled
    if (enableOptimizeButton.value) {
      optimizeResume();
    }
  }
};

const optimizeResume = async () => {
  if (!enableOptimizeButton.value) return;
  isOptimizing.value = true;

  try {
    const data = {};

    selectedSections.value.forEach((section) => {
      data[section] = props.currentResume[section as keyof UserInfo];
    });

    const body = {
      data,
      jobDescription: jobDescription.value,
      userPrompt: customInstructions.value,
      sections: selectedSections.value,
    };

    const response = await resumeApi.tweakResume(body);

    if (!response.data) {
      throw new Error("Failed to optimize resume");
    }

    // Create updated resume object
    const updatedResume = { ...props.currentResume };
    selectedSections.value.forEach((section) => {
      updatedResume[section as keyof UserInfo] = response.data[section];
    });

    // Emit the updated resume and match score to the parent
    emits("resume-updated", updatedResume);
    emits("match-score", response.matchScore || 0);
  } catch (error) {
    console.error("Failed to optimize resume:", error);
    toast.error(error?.response?.data?.message || error.message);
  } finally {
    isOptimizing.value = false;
  }
};

onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
});
</script>
