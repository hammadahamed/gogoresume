<template>
  <div class="mb-6 mt-10">
    <div
      class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative"
    >
      <div
        class="absolute -top-3 -left-3 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium"
      >
        {{ index + 1 }}
      </div>
      <div class="grid grid-cols-1">
        <Input
          label="Project Name"
          name="name"
          v-model="props.project.name"
          required
          placeholder="e.g., E-commerce Platform"
        />
      </div>

      <div class="mt-2">
        <Input
          label="Project Description"
          name="description"
          v-model="props.project.description"
          multiline
          rows="3"
          required
          placeholder="Describe the project, its goals, and your role..."
        />
      </div>

      <div class="grid grid-cols-2 gap-4 mt-5">
        <Input
          label="Project Link"
          name="projectLink"
          v-model="props.project.projectLink"
          placeholder="e.g., https://myproject.com"
          type="url"
        />
        <Input
          label="Source Code"
          name="sourceCode"
          v-model="props.project.sourceCode"
          placeholder="e.g., https://github.com/user/project"
          type="url"
        />
      </div>

      <div class="mt-6 flex justify-between items-center border-t pt-4">
        <!-- Reorder buttons -->
        <div class="flex gap-2">
          <button
            type="button"
            @click="emit('onMoveUp')"
            :disabled="moveUpDisabled"
            :class="[
              'text-sm font-medium px-3 py-1.5 transition-all duration-200 border rounded',
              moveUpDisabled
                ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                : 'bg-blue-50 border-blue-500 text-blue-600 hover:bg-blue-100 transform hover:translate-y-[-1px]',
            ]"
            :title="moveUpTooltip"
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
                d="M7 14l5-5 5 5"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            @click="emit('onMoveDown')"
            :disabled="moveDownDisabled"
            :class="[
              'text-sm font-medium px-3 py-1.5 transition-all duration-200 border rounded',
              moveDownDisabled
                ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                : 'bg-blue-50 border-blue-500 text-blue-600 hover:bg-blue-100 transform hover:translate-y-[-1px]',
            ]"
            :title="moveDownTooltip"
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
                d="M17 10l-5 5-5-5"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Delete button -->
        <button
          type="button"
          @click="emit('onDelete')"
          class="text-sm font-medium bg-red-50 border border-red-500 text-red-600 px-3 py-1.5 hover:bg-red-100 transition-all duration-200 transform hover:translate-y-[-1px] rounded"
          title="Delete this project permanently"
        >
          Delete
        </button>
      </div>
    </div>
    <div class="border-b border-gray-200 mt-8"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Input from "@/common/components/Input.vue";
import type { Project } from "@/types/resume.types";

// Define props
const props = defineProps<{
  project: Project;
  index: number;
  totalCount: number;
}>();

// Define emits
const emit = defineEmits<{
  (e: "onChange", updated: Project): void;
  (e: "onDelete"): void;
  (e: "onMoveUp"): void;
  (e: "onMoveDown"): void;
}>();

// Computed properties for button states
const isSingleItem = computed(() => props.totalCount === 1);
const isFirstItem = computed(() => props.index === 0);
const isLastItem = computed(() => props.index === props.totalCount - 1);

const moveUpDisabled = computed(() => isSingleItem.value || isFirstItem.value);
const moveDownDisabled = computed(() => isSingleItem.value || isLastItem.value);

const moveUpTooltip = computed(() => {
  if (isSingleItem.value) return "Only one project - cannot reorder";
  if (isFirstItem.value) return "Already at the top";
  return "Move this project up in the list";
});

const moveDownTooltip = computed(() => {
  if (isSingleItem.value) return "Only one project - cannot reorder";
  if (isLastItem.value) return "Already at the bottom";
  return "Move this project down in the list";
});
</script>

<style scoped>
/* Add your styles here if needed */
</style>
