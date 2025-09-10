<script setup lang="ts">
import { computed } from "vue";
import Input from "@/common/components/Input.vue";
import Checkbox from "@/common/components/Checkbox.vue";

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
  disableCurrentOption: boolean;
}>();

// Define emits
const emit = defineEmits<{
  (e: "onChange", updatedExperience: any): void;
  (e: "onDelete"): void;
}>();

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
        <Input
          label="Start Date"
          type="month"
          name="startDate"
          :class="{ 'col-span-2': props.experience.current }"
          v-model="props.experience.startDate"
          required
        />
        <Transition name="fade">
          <Input
            v-if="!props.experience.current"
            label="End Date"
            type="month"
            name="endDate"
            v-model="props.experience.endDate"
            :disabled="props.experience.current"
            :required="!props.experience.current"
          />
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

      <div class="mt-6 flex justify-end">
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
