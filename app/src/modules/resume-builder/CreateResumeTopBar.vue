<template>
  <div class="px-6 py-3 mx-4">
    <div class="mx-auto flex items-center justify-between">
      <!-- Left: Resume Name -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <p class="text-sm font-semibold text-gray-900">
            {{ isEditing ? "Edit Resume" : "Create Resume" }}
          </p>
          <span class="text-gray-400">/</span>
        </div>

        <div class="flex items-center gap-2">
          <input
            v-model="resumeName"
            placeholder="Enter resume name..."
            class="-ml-2 -mt-1 px-3 py-2 pb-1 border-b border-gray-300 text-sm focus:outline-none focus:border-b-2 focus:border-indigo-500 max-w-xs"
            :class="{ 'border-red-300': nameError }"
            @blur="validateName"
          />
          <span v-if="nameError" class="text-red-500 text-xs">{{
            nameError
          }}</span>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-4">
        <!-- Template Selector -->
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">Template:</label>
          <TemplateSelector
            v-model="selectedTemplate"
            placeholder="Choose template..."
            @change="handleTemplateChange"
            class="w-48"
          />
        </div>

        <!-- View Changes Button (icon-only) -->
        <button
          v-if="hasChanges"
          @click="handleToggleHighlights"
          class="p-2 rounded-lg transition-all duration-200 relative group"
          :class="
            showHighlights
              ? 'bg-green-100 text-green-700 border border-green-400'
              : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-green-50 hover:border-green-300'
          "
          :title="showHighlights ? 'Hide Changes' : 'View Changes'"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <!-- Tooltip -->
          <span
            class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
          >
            {{ showHighlights ? "Hide Changes" : "View Changes" }}
          </span>
        </button>

        <!-- Download Button (icon-only in extension mode) -->
        <button
          @click="handleDownload"
          class="secondary-btn-1"
          :class="{ 'px-2': isExtensionMode }"
          :title="isExtensionMode ? 'Download' : undefined"
        >
          <svg
            v-if="isExtensionMode"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <span v-else>Download</span>
        </button>

        <!-- Save/Update Button -->
        <button
          @click="handleSave"
          :disabled="isSaving || !canSave"
          class="px-4 py-2 primary-btn-2 flex items-center gap-2"
        >
          <Spinner v-if="isSaving" :size="'16px'" />
          <span>{{ isEditing ? "Update" : "Save" }} Resume</span>
        </button>

        <!-- Cancel Button (only when editing) -->
        <button
          v-if="isEditing"
          @click="handleCancel"
          class="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import TemplateSelector from "../../modules/templates/TemplateSelector.vue";
import Spinner from "@/common/components/Spinner.vue";
import resumeApi from "../../api-factory/resume";
import { useDataManager } from "../../composables/useDataManager";
import { triggerResumeDownload } from "../../utils/resumeDownload";
import { UserInfo } from "@/types/resume.types";
import {
  validatePayloadSize,
  PAYLOAD_SIZE_LIMITS,
} from "../../helper/common.helper";

interface Props {
  modelValue?: string; // selected template
  resumeId?: string; // when editing
  resumeData?: UserInfo;
  // View changes props
  showHighlights?: boolean;
  hasChanges?: boolean;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
  (e: "template-change", template: string): void;
  (e: "resume-saved", data: { resumeId: string; name: string }): void;
  (e: "resume-updated"): void;
  (e: "toggle-highlights"): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "classic",
  showHighlights: false,
  hasChanges: false,
});

const isExtensionMode = inject("isExtensionMode", false);

const emit = defineEmits<Emits>();

const route = useRoute();
const router = useRouter();
const { currentResume } = useDataManager();

// Component state
const resumeName = ref("");
const selectedTemplate = ref(props.modelValue);
const isSaving = ref(false);
const nameError = ref("");
const originalResumeData = ref<any>(null);

// Computed
const isEditing = computed(() => !!props.resumeId);
const canSave = computed(() => {
  return resumeName.value.trim() && currentResume.value && !nameError.value;
});

// Watch for prop changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && newValue !== selectedTemplate.value) {
      selectedTemplate.value = newValue;
    }
  },
  { immediate: true }
);

// Methods
const validateName = () => {
  const name = resumeName.value.trim();
  if (!name) {
    nameError.value = "Resume name is required";
    return false;
  }
  if (name.length < 2) {
    nameError.value = "Resume name must be at least 2 characters";
    return false;
  }
  if (name.length > 50) {
    nameError.value = "Resume name must be less than 50 characters";
    return false;
  }
  nameError.value = "";
  return true;
};

const handleTemplateChange = (template: any) => {
  const templateId = typeof template === "object" ? template.id : template;
  selectedTemplate.value = templateId;
  emit("update:modelValue", templateId);
  emit("template-change", templateId);
};

const handleSave = async () => {
  if (!validateName() || !currentResume.value) return;

  // Validate payload size before making API call
  const validation = validatePayloadSize(
    currentResume.value,
    PAYLOAD_SIZE_LIMITS.RESUME_DATA
  );
  if (!validation.isValid) {
    toast.error(validation.error);
    return;
  }

  isSaving.value = true;

  try {
    if (isEditing.value && props.resumeId) {
      // Update existing resume
      await resumeApi.updateResume(
        props.resumeId,
        resumeName.value.trim(),
        currentResume.value,
        selectedTemplate.value
      );

      toast.success("Resume updated successfully!");
      emit("resume-updated");
    } else {
      // Create new resume
      const response = await resumeApi.saveResume(
        resumeName.value.trim(),
        currentResume.value,
        selectedTemplate.value
      );

      emit("resume-saved", {
        resumeId: response.resumeId,
        name: resumeName.value.trim(),
      });

      setTimeout(() => {
        toast.success("Resume saved successfully!");
      }, 100);

      // Navigate to edit mode
      router.push("/my-resumes");
    }
  } catch (error: any) {
    console.error("Error saving resume:", error);

    // Check if it's a content too long error from backend
    if (
      error?.response?.status === 413 ||
      error?.response?.data?.message?.includes("too large")
    ) {
      // Use backend error message if available (includes character count)
      const backendMessage = error?.response?.data?.message;
      toast.error(
        backendMessage ||
          "Resume data is too large. Please reduce the amount of information and try again."
      );
    } else {
      toast.error(error?.response?.data?.message || "Failed to save resume");
    }
  } finally {
    isSaving.value = false;
  }
};

const handleDownload = () => {
  triggerResumeDownload("CreateResumeTopBar");
};

const handleToggleHighlights = () => {
  emit("toggle-highlights");
};

const handleCancel = () => {
  // Reset to original data if editing
  if (originalResumeData.value && currentResume.value) {
    Object.assign(currentResume.value, originalResumeData.value);
  }

  // Navigate back to saved resumes
  router.push("/my-resumes");
};

// Initialize component
onMounted(() => {
  if (props.resumeData) {
    resumeName.value = props.resumeData.name;
    selectedTemplate.value = props.resumeData.templateId;
  }
  if (!isEditing.value) {
    const now = new Date();
    resumeName.value = `Untitled Resume`;
  }
});
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
../templates/TemplateSelector.vue
