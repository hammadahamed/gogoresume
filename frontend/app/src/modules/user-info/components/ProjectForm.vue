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

      <div class="mt-6">
        <div class="flex items-center justify-between mb-3">
          <label class="block text-sm font-semibold text-gray-700">
            Technologies Used
          </label>
          <AddButton @click="handleAddTechnology" />
        </div>

        <div class="flex gap-4 mb-4">
          <div class="flex-grow">
            <Input
              label=""
              v-model="newTechnology"
              @keydown.enter.prevent="handleAddTechnology"
              placeholder="Enter a technology and press Enter"
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <div
            v-for="(tech, index) in props.project.technologies"
            :key="index"
            class="flex items-center bg-gray-100 rounded-lg px-4 py-1 text-gray-900"
          >
            <span class="text-sm font-medium">{{ tech }}</span>
            <button
              type="button"
              @click="handleRemoveTechnology(index)"
              class="ml-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <p
            v-if="props.project.technologies.length === 0"
            class="text-gray-500 text-sm"
          >
            Add technologies used in this project
          </p>
        </div>
      </div>

      <div class="mt-5">
        <Input
          label="Project Outcome"
          name="outcome"
          v-model="props.project.outcome"
          multiline
          rows="2"
          placeholder="Describe the impact and results of the project..."
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
import { ref } from "vue";
import Input from "@/common/components/Input.vue";
import AddButton from "@/common/components/AddButton.vue";

// Define props
const props = defineProps<{
  project: {
    name: string;
    description: string;
    technologies: string[];
    outcome?: string;
    projectLink?: string;
    sourceCode?: string;
  };
  index: number;
}>();

// Define emits
const emit = defineEmits<{
  (e: "onChange", updated: any): void;
  (e: "onDelete"): void;
}>();

// Local state for new technology
const newTechnology = ref("");

// Methods to handle changes
function handleAddTechnology() {
  console.log(
    "🚀 ~ handleAddTechnology ~ newTechnology.value:",
    newTechnology.value
  );
  if (newTechnology.value.trim()) {
    emit("onChange", {
      ...props.project,
      technologies: [...props.project.technologies, newTechnology.value.trim()],
    });
    newTechnology.value = "";
  }
}

function handleRemoveTechnology(index: number) {
  emit("onChange", {
    ...props.project,
    technologies: props.project.technologies.filter((_, i) => i !== index),
  });
}
</script>

<style scoped>
/* Add your styles here if needed */
</style>
