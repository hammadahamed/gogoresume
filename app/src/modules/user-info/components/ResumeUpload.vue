<template>
  <div class="resume-upload">
    <!-- Upload Area -->
    <div
      class="upload-zone"
      :class="{
        'drag-over': isDragging,
        'has-file': selectedFile,
        uploading: isUploading,
      }"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        accept=".pdf,.docx"
        class="hidden"
        @change="handleFileSelect"
      />

      <!-- Upload Icon / Loading -->
      <div v-if="isUploading" class="flex flex-col items-center gap-3">
        <Spinner size="40px" color="var(--primary-color)" border-width="3px" />
        <p class="text-sm text-gray-600">Parsing your resume...</p>
        <p class="text-xs text-gray-400">This may take a few seconds</p>
      </div>

      <!-- Default State -->
      <div v-else-if="!selectedFile" class="flex flex-col items-center gap-3">
        <div
          class="w-14 h-14 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center"
        >
          <svg
            class="w-7 h-7 text-[var(--primary-color)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <div class="text-center">
          <p class="text-sm font-medium text-gray-700">
            Drop your resume here or
            <span class="text-[var(--primary-color)] cursor-pointer"
              >browse</span
            >
          </p>
          <p class="text-xs text-gray-400 mt-1">PDF or DOCX (max 2MB)</p>
        </div>
      </div>

      <!-- File Selected State -->
      <div v-else class="flex flex-col items-center gap-3">
        <div
          class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center"
        >
          <svg
            class="w-7 h-7 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="text-center">
          <p class="text-sm font-medium text-gray-700 truncate max-w-[200px]">
            {{ selectedFile.name }}
          </p>
          <p class="text-xs text-gray-400 mt-1">
            {{ formatFileSize(selectedFile.size) }}
          </p>
        </div>
        <button
          @click.stop="clearFile"
          class="text-xs text-red-500 hover:text-red-700 underline"
        >
          Remove
        </button>
      </div>
    </div>

    <!-- Parse Button -->
    <button
      v-if="selectedFile && !isUploading"
      @click="parseResume"
      class="mt-4 w-full py-2.5 bg-[var(--primary-color)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
    >
      <svg
        class="w-4 h-4"
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
      Import Resume
    </button>

    <!-- Error Message -->
    <p v-if="errorMessage" class="mt-3 text-sm text-red-500 text-center">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import resumeApi from "@/api-factory/resume";
import { toast } from "vue3-toastify";
import Spinner from "@/common/components/Spinner.vue";

const emit = defineEmits<{
  (e: "parsed", data: any): void;
}>();

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const isDragging = ref(false);
const isUploading = ref(false);
const errorMessage = ref("");

const triggerFileInput = () => {
  if (!isUploading.value) {
    fileInput.value?.click();
  }
};

const handleDragOver = () => {
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    validateAndSetFile(files[0]);
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    validateAndSetFile(files[0]);
  }
};

const validateAndSetFile = (file: File) => {
  errorMessage.value = "";

  // Check file type
  const validTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (!validTypes.includes(file.type)) {
    errorMessage.value = "Please upload a PDF or DOCX file";
    return;
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errorMessage.value = "File size must be less than 2MB";
    return;
  }

  selectedFile.value = file;
};

const clearFile = () => {
  selectedFile.value = null;
  errorMessage.value = "";
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

const parseResume = async () => {
  if (!selectedFile.value) return;

  isUploading.value = true;
  errorMessage.value = "";

  try {
    const response = await resumeApi.parseResume(selectedFile.value);

    if (response.data) {
      emit("parsed", response.data);
      toast.success("Resume imported successfully!");
      clearFile();
    }
  } catch (error: any) {
    console.error("Parse error:", error);
    errorMessage.value =
      error?.response?.data?.message ||
      "Failed to parse resume. Please try again.";
    toast.error(errorMessage.value);
  } finally {
    isUploading.value = false;
  }
};
</script>

<style scoped>
.upload-zone {
  border-width: 2px;
  border-style: dashed;
  border-color: #d1d5db;
  border-radius: 0.75rem;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-zone:hover:not(.uploading) {
  border-color: var(--primary-color);
  background-color: color-mix(in srgb, var(--primary-color) 5%, transparent);
}

.upload-zone.drag-over {
  border-color: var(--primary-color);
  background-color: color-mix(in srgb, var(--primary-color) 10%, transparent);
}

.upload-zone.has-file {
  border-color: #4ade80;
  background-color: #f0fdf4;
}

.upload-zone.uploading {
  border-color: var(--primary-color);
  background-color: color-mix(in srgb, var(--primary-color) 5%, transparent);
  cursor: wait;
}
</style>
