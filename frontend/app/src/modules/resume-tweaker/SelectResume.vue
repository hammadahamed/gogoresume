<template>
  <div class="mb-6 relative">
    <select
      v-model="selectedResume"
      class="w-full px-2 pr-4 text-sm font-medium text-gray-600 py-2 pr-6 rounded-lg cursor-pointer bg-gray-100 border border-gray-200 outline-none hover:border-gray-300 relative z-10 focus:outline-none"
      :class="{ 'text-xs text-gray-600 mb-0.5': isExtensionMode }"
      @change="$emit('update:modelValue', selectedResume)"
    >
      <option value="" disabled>Select resume to tweak</option>
      <option
        v-for="option in resumeOptions"
        :key="option.value"
        :value="option.value"
        class="py-2 px-4 bg-white hover:bg-gray-100"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const isExtensionMode = inject("isExtensionMode");

const resumeOptions = [
  { value: "software-engineer", label: "Software Engineer Resume" },
  { value: "product-manager", label: "Product Manager Resume" },
  { value: "marketing-specialist", label: "Marketing Specialist Resume" },
];

const selectedResume = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    selectedResume.value = newValue;
  }
);
</script>

<style scoped>
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em;
}

select:hover {
  cursor: pointer;
}

select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 1px #6366f1;
}

/* Ensure dropdown options are visible */
select option {
  padding: 8px 12px;
  cursor: pointer;
}

/* Fix for Safari */
@media not all and (min-resolution: 0.001dpcm) {
  @supports (-webkit-appearance: none) {
    select {
      padding-right: 25px;
    }
  }
}
</style>
