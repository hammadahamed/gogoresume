<template>
  <div>
    <Select
      v-model="selectedTemplate"
      :options="templates"
      :label="label"
      :placeholder="placeholder"
      value-key="id"
      label-key="name"
      @change="handleTemplateChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { getAllTemplates } from "../../a-app-react/templates/TemplateManager.jsx";
import Select from "../../common/components/Select.vue";

interface Template {
  id: string;
  name: string;
}

interface Props {
  modelValue?: string;
  label?: string;
  placeholder?: string;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
  (e: "change", template: Template): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  label: "",
  placeholder: "Select a template",
});

const emit = defineEmits<Emits>();

const templates = ref<Template[]>([]);
const selectedTemplate = ref(props.modelValue);

// Handle template changes
const handleTemplateChange = (template: Template) => {
  emit("update:modelValue", template.id);
  emit("change", template);
};

// Load templates on mount
onMounted(() => {
  templates.value = getAllTemplates();
});

// Watch for prop changes
watch(
  () => props.modelValue,
  (newValue) => {
    selectedTemplate.value = newValue;
  }
);

// Watch selectedTemplate for v-model updates
watch(selectedTemplate, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
