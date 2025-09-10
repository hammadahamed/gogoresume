<template>
  <div class="mb-6">
    <Select
      v-model="selectedResume"
      :options="resumeOptions"
      :placeholder="
        props.loading ? 'Loading resumes...' : 'Select resume to tweak'
      "
      value-key="value"
      label-key="label"
      :class="{ 'text-xs': isExtensionMode }"
      :disabled="props.loading || resumeOptions.length === 0"
      @change="handleResumeChange"
    />
    <p
      v-if="!props.loading && resumeOptions.length === 0"
      class="text-gray-500 text-sm mt-2"
    >
      No saved resumes found. Create a resume first to use the tweaker.
    </p>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch, computed } from "vue";
import Select from "../../common/components/Select.vue";

interface ResumeOption {
  value: string;
  label: string;
}

const props = defineProps<{
  modelValue: string;
  options: ResumeOption[];
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const isExtensionMode = inject("isExtensionMode");

// State
const selectedResume = ref(props.modelValue);

// Computed
const resumeOptions = computed(() => props.options);

// Methods

const handleResumeChange = (option: any) => {
  selectedResume.value = option.value;
  emit("update:modelValue", option.value);
};

// Watchers
watch(
  () => props.modelValue,
  (newValue) => {
    selectedResume.value = newValue;
  }
);
</script>
