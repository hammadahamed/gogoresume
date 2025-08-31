<template>
  <div class="px-6 py-3 mx-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
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

        <button @click="handleDownload" class="secondary-btn-1">
          Download
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
import { computed, ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import TemplateSelector from "../../modules/templates/TemplateSelector.vue";
import Spinner from "@/common/components/Spinner.vue";
import resumeApi from "../../api-factory/resume";
import { useUserInfoManager } from "../../composables/useUserInfoManager";
import { triggerResumeDownload } from "../../utils/resumeDownload";

interface Props {
  modelValue?: string; // selected template
  resumeId?: string; // when editing
}

interface Emits {
  (e: "update:modelValue", value: string): void;
  (e: "template-change", template: string): void;
  (e: "resume-saved", data: { resumeId: string; name: string }): void;
  (e: "resume-updated"): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "classic",
});

const emit = defineEmits<Emits>();

const route = useRoute();
const router = useRouter();
const { userInfo } = useUserInfoManager();

// Component state
const resumeName = ref("");
const selectedTemplate = ref(props.modelValue);
const isSaving = ref(false);
const nameError = ref("");
const originalResumeData = ref<any>(null);

// Computed
const isEditing = computed(() => !!props.resumeId);
const canSave = computed(() => {
  return resumeName.value.trim() && userInfo.value && !nameError.value;
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
  if (!validateName() || !userInfo.value) return;

  isSaving.value = true;

  try {
    if (isEditing.value && props.resumeId) {
      // Update existing resume
      await resumeApi.updateResume(
        props.resumeId,
        resumeName.value.trim(),
        userInfo.value,
        selectedTemplate.value
      );

      toast.success("Resume updated successfully!");
      emit("resume-updated");
    } else {
      // Create new resume
      const response = await resumeApi.saveResume(
        resumeName.value.trim(),
        userInfo.value,
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
    toast.error(error?.response?.data?.message || "Failed to save resume");
  } finally {
    isSaving.value = false;
  }
};

const handleDownload = () => {
  triggerResumeDownload("CreateResumeTopBar");
};

const handleCancel = () => {
  // Reset to original data if editing
  if (originalResumeData.value && userInfo.value) {
    Object.assign(userInfo.value, originalResumeData.value);
  }

  // Navigate back to saved resumes
  router.push("/my-resumes");
};

const loadResumeData = async () => {
  if (!props.resumeId) return;

  try {
    const response = await resumeApi.getResumeById(props.resumeId);
    if (response.data) {
      resumeName.value = response.data.name;
      selectedTemplate.value = response.data.templateId || "classic";

      // Store original data for cancel functionality
      originalResumeData.value = { ...response.data.data };

      emit("update:modelValue", selectedTemplate.value);
      emit("template-change", selectedTemplate.value);
    }
  } catch (error) {
    console.error("Error loading resume:", error);
    toast.error("Failed to load resume data");
  }
};

// Initialize component
onMounted(() => {
  if (isEditing.value) {
    loadResumeData();
  } else {
    // Set default name for new resume
    const now = new Date();
    resumeName.value = `Untitled Resume`;
  }
});
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
