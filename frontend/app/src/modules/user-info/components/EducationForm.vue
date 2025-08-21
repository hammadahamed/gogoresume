<script setup lang="ts">
import { ref } from "vue";
import Input from "@/common/components/Input.vue";
import AddButton from "@/common/components/AddButton.vue";

// Define props
const props = defineProps<{
  education: {
    school: string;
    degree: string;
    fieldOfStudy: string;
    gpa?: string;
    startDate: string;
    endDate: string;
    honors?: string[];
  };
  index: number;
}>();

// Define emits
const emit = defineEmits<{
  (e: "onChange", updated: any): void;
  (e: "onDelete"): void;
}>();

// Local state for new honor
const newHonor = ref("");

// Methods to handle changes
function handleAddHonor() {
  if (newHonor.value.trim()) {
    emit("onChange", {
      ...props.education,
      honors: [...(props.education.honors || []), newHonor.value.trim()],
    });
    newHonor.value = "";
  }
}

function handleRemoveHonor(index: number) {
  emit("onChange", {
    ...props.education,
    honors: props.education.honors?.filter((_, i) => i !== index) || [],
  });
}
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
          label="Field of Study"
          name="fieldOfStudy"
          v-model="props.education.fieldOfStudy"
          required
          placeholder="e.g., Computer Science"
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

      <div class="mt-6">
        <div class="flex items-center justify-between mb-3">
          <label class="block text-sm font-semibold text-gray-700">
            Honors & Awards
          </label>
          <AddButton @click="handleAddHonor" />
        </div>

        <div class="flex gap-4 mb">
          <div class="flex-grow">
            <Input
              label=""
              v-model="newHonor"
              @keypress.enter.prevent="handleAddHonor"
              placeholder="Enter an honor or award and press Enter"
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-2">
          <div
            v-for="(honor, index) in props.education.honors"
            :key="index"
            class="flex items-center bg-gray-100 rounded-lg px-4 py-1 text-gray-900"
          >
            <span class="text-sm font-medium">{{ honor }}</span>
            <button
              type="button"
              @click="handleRemoveHonor(index)"
              class="ml-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <p
            v-if="
              !props.education.honors || props.education.honors.length === 0
            "
            class="text-gray-500 text-sm"
          >
            Add honors, awards, or notable academic achievements
          </p>
        </div>
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
