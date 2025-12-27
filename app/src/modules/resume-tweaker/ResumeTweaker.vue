<template>
  <div class="flex flex-col h-screen w-full">
    <!-- Section 2: Main Content -->
    <div
      class="flex-1 flex flex-col lg:flex-row-reverse mx-auto w-full max-w-[1100px]"
      :class="{ 'justify-between': isExtensionMode, 'pr-10': !isExtensionMode }"
    >
      <!-- Left: Resume Preview -->
      <div
        v-if="
          !isExtensionMode || (isExtensionMode && hasMeaningfulJobDescription)
        "
        class="w-full p-6 flex flex-col max-w-[800px] smooth-expand"
        :class="{ 'pb-0': isExtensionMode }"
      >
        <div
          class="flex-1 flex flex-col justify-center"
          :class="isExtensionMode ? 'w-full' : 'w-auto'"
        >
          <div class="flex items-center gap-3">
            <SelectResume
              v-model="selectedResumeId"
              :options="resumeOptions"
              :loading="resumesLoading"
              class="z-10"
              :class="isExtensionMode ? 'w-[130px]' : 'w-[240px]'"
            />

            <!-- Undo/Redo/View Changes Controls -->
            <UndoRedoControls
              v-if="!loading && currentResume"
              :can-undo="historyState.canUndo"
              :can-redo="historyState.canRedo"
              :show-highlights="showHighlights"
              :has-previous-state="hasPreviousState"
              @undo="handleUndo"
              @redo="handleRedo"
              @toggle-highlights="toggleHighlights"
            />
          </div>

          <div
            v-if="loading"
            class="flex items-center justify-center border-3 border-gray-800"
            style="height: auto; aspect-ratio: 1 / 1.41"
          >
            <Spinner />
          </div>

          <div class="relative" :class="!isExtensionMode && 'w-[520px]'">
            <MatchScoreDisplay
              :matchScore="matchScore"
              :show-score="!loading"
            />
            <ReactResumeBuilder
              v-show="!loading"
              :userData="currentResume"
              :highlightMode="showHighlights"
              :changes="resumeChanges"
              class="-mt-15 animate-fade-in"
            />

            <!-- Clean Twinkling Overlay -->
            <div
              v-show="!loading && isOptimizing"
              class="absolute inset-0 pointer-events-none z-10 h-full -mt-2"
              style="aspect-ratio: 1 / 1.42"
            >
              <!-- Subtle backdrop -->
              <div
                class="absolute inset-0 bg-white/40 backdrop-blur-[0.95px] rounded-lg pointer-events-none"
              >
                <div class="w-full h-full flex items-center justify-center">
                  <DotLottieVue
                    loop
                    autoplay
                    :src="LoadingLottie"
                    style="height: 80px"
                    speed="2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Interactive Cards -->
      <TweakerInputs
        :current-resume="currentResume"
        @resume-updated="handleResumeUpdate"
        @job-description-state="handleJobDescriptionState"
        @optimizing-state="handleOptimizingState"
        @match-score="handleMatchScore"
        @changes-detected="handleChangesDetected"
        @edit-section="handleOpenEditModal"
      />
    </div>

    <!-- Section Edit Modal -->
    <SectionEditModal
      :show="showEditModal"
      :section-type="editingSectionType"
      :professional-summary="currentResume?.professionalSummary"
      :skills="currentResume?.skills"
      :work-experiences="currentResume?.workExperiences"
      :projects="currentResume?.projects"
      @close="handleCloseEditModal"
      @save="handleSaveEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, watch, computed } from "vue";
import ReactResumeBuilder from "../../ReactResumeBuilder.vue";
import { useDataManager } from "../../composables/useDataManager";
import SelectResume from "./SelectResume.vue";
import TweakerInputs from "./TweakerInputs.vue";
import MatchScoreDisplay from "./components/MatchScoreDisplay.vue";
import UndoRedoControls from "./components/UndoRedoControls.vue";
import SectionEditModal from "./components/SectionEditModal.vue";
import { toast } from "vue3-toastify";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";
import { UserInfo } from "@/types/resume.types";
import { DEFAULT_RESUME } from "@/constants/app.constants";
import Spinner from "@/common/components/Spinner.vue";
import resumeApi from "@/api-factory/resume";
import { useResumeHistory } from "@/composables/useResumeHistory";
import SandyLoading from "@/assets/sandy_loading.lottie";
import LoadingLottie from "@/assets/loading.lottie";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import { diffResume, type ResumeChanges } from "./utils/diffResume";

const route = useRoute();
const userStore = useUserStore();

const {
  currentResume,
  getUserProfile,
  loadSavedResumes,
  resumeOptions,
  resumesLoading,
} = useDataManager();

// Initialize history management
const {
  history,
  state: historyState,
  hasPreviousState,
  saveState,
  undo,
  redo,
  getPreviousState,
  clearHistory,
} = useResumeHistory();

const loading = ref(true);
const selectedResumeId = ref("");
const isExtensionMode = inject("isExtensionMode");
const hasMeaningfulJobDescription = ref(false);
const isOptimizing = ref(false);
const matchScore = ref(0);
const showHighlights = ref(false);

// Section edit modal state
const showEditModal = ref(false);
const editingSectionType = ref<
  "professionalSummary" | "skills" | "workExperiences" | "projects"
>("professionalSummary");

// Compute resume changes dynamically from history
const resumeChanges = computed<ResumeChanges | null>(() => {
  const previousState = getPreviousState();
  if (!previousState || !currentResume.value) {
    return null;
  }
  return diffResume(previousState, currentResume.value);
});

watch(selectedResumeId, (newVal) => {
  setSelectedResumeData();
});

// Handle resume update from TweakerInputs component
const handleResumeUpdate = (updatedResume: UserInfo) => {
  // Save current state to history before updating
  saveState(updatedResume);
  userStore.setCurrentResume(updatedResume);
};

const resetMatchScore = () => (matchScore.value = 0);

// Handle undo action
const handleUndo = () => {
  undo();
  resetMatchScore();
  // Note: We don't reset showHighlights here - diff is computed dynamically
};

// Handle redo action
const handleRedo = () => {
  redo();
  resetMatchScore();
  // Note: We don't reset showHighlights here - diff is computed dynamically
};

// Handle job description state from TweakerInputs component
const handleJobDescriptionState = (hasDescription: boolean) => {
  hasMeaningfulJobDescription.value = hasDescription;
};

// Handle optimizing state from TweakerInputs component
const handleOptimizingState = (optimizing: boolean) => {
  isOptimizing.value = optimizing;
};

// Handle match score from TweakerInputs component
const handleMatchScore = (score: number) => {
  matchScore.value = score;
};

// Handle changes detected from TweakerInputs component
const handleChangesDetected = (changes: ResumeChanges) => {
  // Auto-enable highlights when changes are detected (user can turn off)
  if (changes.hasAnyChanges) {
    showHighlights.value = true;
  }
};

// Toggle highlight mode
const toggleHighlights = () => {
  showHighlights.value = !showHighlights.value;
};

// Section edit modal handlers
const handleOpenEditModal = (
  sectionType: "professionalSummary" | "skills" | "workExperiences" | "projects"
) => {
  editingSectionType.value = sectionType;
  showEditModal.value = true;
};

const handleCloseEditModal = () => {
  showEditModal.value = false;
};

const handleSaveEdit = ({
  sectionType,
  value,
}: {
  sectionType: string;
  value: any;
}) => {
  if (!currentResume.value) return;

  // Create updated resume with the edited section
  const updatedResume = { ...currentResume.value };
  updatedResume[sectionType as keyof UserInfo] = value;

  // Save to history and update store
  saveState(updatedResume);
  userStore.setCurrentResume(updatedResume);

  // Close modal
  showEditModal.value = false;
};

const setSelectedResumeData = async () => {
  loading.value = true;
  resetMatchScore();
  clearHistory();
  const resumeId = selectedResumeId.value;

  try {
    // check cache
    if (userStore.resumesDataCache[resumeId]) {
      const resumeFromCache = userStore.resumesDataCache[resumeId];
      userStore.setCurrentResume(resumeFromCache);
      return;
    }
    // check if it is default resume
    else if (resumeId === DEFAULT_RESUME.id) {
      if (!userStore.userInfo) await getUserProfile();
      userStore.setCurrentResume(userStore.userInfo);
      return;
    }

    const response = await resumeApi.getResumeById(resumeId);
    if (response && response.data) {
      userStore.setResumesDataCache(response.data._id, response.data.data);
      userStore.setCurrentResume(response.data.data);
    }
  } catch (error) {
    console.error("Failed to get selected resume data:", error);
    toast.error(error?.response?.data?.message || error.message);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 200);
  }
  return null;
};

const init = async () => {
  loading.value = true;

  try {
    await loadSavedResumes();
    const resumeId = route.query.resumeId as string | undefined;
    selectedResumeId.value = resumeId || DEFAULT_RESUME.id;
    await setSelectedResumeData();
    saveState(currentResume.value);
  } catch (error) {
    console.error("Failed to initialize resume data:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return null;
};

// Keyboard shortcuts handler
const handleKeyboardShortcuts = (event: KeyboardEvent) => {
  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const isCmdOrCtrl = isMac ? event.metaKey : event.ctrlKey;

  if (isCmdOrCtrl && event.key === "z" && !event.shiftKey) {
    event.preventDefault();
    if (historyState.canUndo) {
      handleUndo();
    }
  } else if (
    (isCmdOrCtrl && event.key === "y") ||
    (isCmdOrCtrl && event.key === "z" && event.shiftKey)
  ) {
    event.preventDefault();
    if (historyState.canRedo) {
      handleRedo();
    }
  }
};

onMounted(async () => {
  await init();
  document.addEventListener("keydown", handleKeyboardShortcuts);
});

onUnmounted(() => {
  userStore.clearResumesDataCache();
  userStore.clearCurrentResume();
  document.removeEventListener("keydown", handleKeyboardShortcuts);
  clearHistory();
});
</script>
<style scoped lang="scss" src="./ResumeTweaker.scss"></style>
<style scoped>
/* 4-pointed sparkle shapes */
.sparkle-blob {
  position: absolute;
  animation: sparkle-twinkle 3s ease-in-out infinite;
  transform-origin: center;
}

.sparkle-blob::before,
.sparkle-blob::after {
  content: "";
  position: absolute;
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  transform-origin: center;
}

/* Create 4-pointed sparkle with two diamond shapes */
.sparkle-blob::before {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
}

.sparkle-blob::after {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
}

/* Size variations */
.sparkle-blob.large::before,
.sparkle-blob.large::after {
  width: 24px;
  height: 6px;
  border-radius: 50px;
}

.sparkle-blob.medium::before,
.sparkle-blob.medium::after {
  width: 16px;
  height: 4px;
  border-radius: 50px;
}

.sparkle-blob.small::before,
.sparkle-blob.small::after {
  width: 10px;
  height: 3px;
  border-radius: 50px;
}

/* Animation delays */
.sparkle-blob.large {
  animation-delay: 0s;
}

.sparkle-blob.medium {
  animation-delay: 1s;
}

.sparkle-blob.small {
  animation-delay: 2s;
}

.center-sparkle {
  animation-delay: 0.5s;
}

/* Sparkle twinkle animation */
@keyframes sparkle-twinkle {
  0%,
  100% {
    transform: scale(0.6) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2) rotate(180deg);
    opacity: 1;
  }
}
</style>
../../composables/useResumeHistory
