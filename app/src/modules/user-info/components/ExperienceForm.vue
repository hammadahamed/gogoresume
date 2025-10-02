<script setup lang="ts">
import { computed } from "vue";
import Input from "@/common/components/Input.vue";
import Checkbox from "@/common/components/Checkbox.vue";
import { stringToDate, dateToString } from "@/helper/resume.helper";

// Define props
const props = defineProps<{
  experience: {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
  };
  index: number;
  totalCount: number;
  disableCurrentOption: boolean;
}>();

// Define emits
const emit = defineEmits<{
  (e: "onChange", updatedExperience: any): void;
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
  if (isSingleItem.value) return "Only one experience - cannot reorder";
  if (isFirstItem.value) return "Already at the top";
  return "Move this experience up in the list";
});

const moveDownTooltip = computed(() => {
  if (isSingleItem.value) return "Only one experience - cannot reorder";
  if (isLastItem.value) return "Already at the bottom";
  return "Move this experience down in the list";
});

// Computed property to join description array for textarea display
const descriptionText = computed({
  get: () => props.experience.description.join("\n"),
  set: (value: string) => {
    const descriptionArray = value
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    emit("onChange", { ...props.experience, description: descriptionArray });
  },
});

// Computed values for DatePicker v-model
const startDateValue = computed({
  get: () => stringToDate(props.experience.startDate),
  set: (date: Date | null) => {
    const dateString = dateToString(date);
    emit("onChange", { ...props.experience, startDate: dateString });
  },
});

const endDateValue = computed({
  get: () => stringToDate(props.experience.endDate),
  set: (date: Date | null) => {
    const dateString = dateToString(date);
    emit("onChange", { ...props.experience, endDate: dateString });
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company"
          name="company"
          v-model="props.experience.company"
          required
          placeholder="e.g., Google"
        />
        <Input
          label="Position"
          name="position"
          v-model="props.experience.position"
          required
          placeholder="e.g., Senior Software Engineer"
        />
      </div>

      <div class="mt-4">
        <Input
          label="Location"
          name="location"
          v-model="props.experience.location"
          required
          placeholder="e.g., Mountain View, CA"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div :class="{ 'col-span-2': props.experience.current }" class="mb-4">
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
        <Transition name="fade">
          <div v-if="!props.experience.current" class="mb-4">
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
              :disabled="props.experience.current"
            />
          </div>
        </Transition>
      </div>

      <div class="mt-2">
        <Checkbox
          name="current"
          :checked="props.experience.current"
          @update:checked="
            (value) => emit('onChange', { ...props.experience, current: value })
          "
          :disabled="props.disableCurrentOption"
          label="I currently work here"
        />
      </div>

      <div class="mt-4">
        <Input
          label="Description"
          name="description"
          v-model="descriptionText"
          multiline
          rows="3"
          required
          placeholder="Describe your role, responsibilities, and key contributions...&#10;Each line will be treated as a separate bullet point."
        />
      </div>

      <div class="mt-6 flex justify-between items-center">
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
          title="Delete this work experience permanently"
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
