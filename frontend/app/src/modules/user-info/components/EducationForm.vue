<script setup lang="ts">
import Input from "@/common/components/Input.vue";

// Define props
const props = defineProps<{
  education: {
    school: string;
    degree: string;
    gpa?: string;
    startDate: string;
    endDate: string;
  };
  index: number;
}>();

// Define emits
const emit = defineEmits<{
  (e: "onChange", updated: any): void;
  (e: "onDelete"): void;
}>();
</script>

<template>
  <div class="mb-6 mt-10">
    <div
      class="bg-white border border-gray-400 p-6 shadow-sm hover:shadow-md transition-shadow relative"
    >
      <div
        class="absolute -top-3 -left-3 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium"
      >
        {{ index + 1 }}
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <Input
          label="School"
          name="school"
          v-model="props.education.school"
          required
          placeholder="e.g., Stanford University"
        />
        <Input
          label="Degree"
          name="degree"
          v-model="props.education.degree"
          required
          placeholder="e.g., B.S., M.A."
        />
        <Input
          label="GPA (optional)"
          name="gpa"
          v-model="props.education.gpa"
          placeholder="e.g., 3.8/4.0"
        />
        <Input
          label="Start Date"
          type="month"
          name="startDate"
          v-model="props.education.startDate"
          required
        />
        <Input
          label="End Date"
          type="month"
          name="endDate"
          v-model="props.education.endDate"
          required
        />
      </div>

      <div class="mt-6 flex justify-end pt-4">
        <button
          type="button"
          @click="emit('onDelete')"
          class="text-sm font-medium bg-red-50 border border-red-500 text-red-600 px-3 py-1.5 hover:bg-red-100 transition-all duration-200 transform hover:translate-y-[-1px]"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here if needed */
</style>
