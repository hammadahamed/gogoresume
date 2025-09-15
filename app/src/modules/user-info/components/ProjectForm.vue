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

      <div class="mt-6 flex justify-end border-t pt-4">
        <button
          type="button"
          @click="emit('onDelete')"
          class="text-sm font-medium bg-red-50 border border-red-500 text-red-600 px-3 py-1.5 hover:bg-red-100 transition-all duration-200 transform hover:translate-y-[-1px]"
        >
          Delete
        </button>
      </div>
    </div>
    <div class="border-b border-gray-200 mt-8"></div>
  </div>
</template>

<script setup lang="ts">
import Input from "@/common/components/Input.vue";
import type { Project } from "@/types/resume.types";

// Define props
const props = defineProps<{
  project: Project;
  index: number;
}>();

// Define emits
const emit = defineEmits<{
  (e: "onChange", updated: Project): void;
  (e: "onDelete"): void;
}>();
</script>

<style scoped>
/* Add your styles here if needed */
</style>
