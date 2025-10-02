<script setup lang="ts">
import { computed } from "vue";
import Input from "@/common/components/Input.vue";
import { stringToDate, dateToString } from "@/helper/resume.helper";

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
  totalCount: number;
}>();

// Define emits
const emit = defineEmits<{
  (e: "onChange", updated: any): void;
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
  if (isSingleItem.value) return "Only one education entry - cannot reorder";
  if (isFirstItem.value) return "Already at the top";
  return "Move this education up in the list";
});

const moveDownTooltip = computed(() => {
  if (isSingleItem.value) return "Only one education entry - cannot reorder";
  if (isLastItem.value) return "Already at the bottom";
  return "Move this education down in the list";
});

// Computed values for DatePicker v-model
const startDateValue = computed({
  get: () => stringToDate(props.education.startDate),
  set: (date: Date | null) => {
    const dateString = dateToString(date);
    emit("onChange", { ...props.education, startDate: dateString });
  },
});

const endDateValue = computed({
  get: () => stringToDate(props.education.endDate),
  set: (date: Date | null) => {
    const dateString = dateToString(date);
    emit("onChange", { ...props.education, endDate: dateString });
  },
});
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
          class="col-span-2"
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
        <div class="mb-4">
          <label
            class="block text-sm font-semibold text-left text-gray-700 mb-1.5"
          >
            Start Date
          </label>
          <DatePicker
            v-model="startDateValue"
            view="month"
            size="small"
            dateFormat="M yy"
            placeholder="Select start date"
            fluid
          />
        </div>
        <div class="mb-4">
          <label
            class="block text-sm font-semibold text-left text-gray-700 mb-1.5"
          >
            End Date
          </label>
          <DatePicker
            v-model="endDateValue"
            view="month"
            size="small"
            dateFormat="M yy"
            placeholder="Select end date"
            fluid
          />
        </div>
      </div>

      <div class="flex justify-between items-center pt-4">
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
          title="Delete this education entry permanently"
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
