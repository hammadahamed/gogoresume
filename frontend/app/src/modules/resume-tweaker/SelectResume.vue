<template>
  <div class="mb-6">
    <Select
      v-model="selectedResume"
      :options="resumeOptions"
      placeholder="Select resume to tweak"
      value-key="value"
      label-key="label"
      :class="{ 'text-xs': isExtensionMode }"
      @change="handleResumeChange"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch } from "vue";
import Select from "../../common/components/Select.vue";

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

const handleResumeChange = (option: any) => {
  emit("update:modelValue", option.value);
};

watch(
  () => props.modelValue,
  (newValue) => {
    selectedResume.value = newValue;
  }
);
</script>
