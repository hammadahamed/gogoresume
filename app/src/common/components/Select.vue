<template>
  <div class="relative">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
    </label>

    <!-- Select Button -->
    <button
      type="button"
      @click="toggleDropdown"
      @blur="handleBlur"
      class="bg-gray-100/70 rounded-md group relative w-full border border-gray-300 px-4 py-1.5 text-left cursor-pointer focus:outline-none transition-all duration-200 hover:border-gray-400 focus:border-black focus:ring focus:ring-black"
      :class="{
        'border-[var(--primary-color)] ring-4 ring-[--primary-color]/10':
          isOpen,
        'bg-gray-50 border-gray-200': disabled,
      }"
      :disabled="disabled"
    >
      <div class="flex items-center justify-between">
        <span
          class="block truncate text-sm"
          :class="{
            'text-gray-900': selectedLabel,
            'text-gray-500': !selectedLabel,
            'text-gray-400': disabled,
          }"
        >
          {{ selectedLabel || placeholder }}
        </span>

        <!-- Chevron -->
        <svg
          class="w-4 h-4 transition-all duration-200 text-gray-400 group-hover:text-gray-600"
          :class="{
            'rotate-180 text-[--app-primary]': isOpen,
            'text-gray-300': disabled,
          }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </button>

    <!-- Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="isOpen"
        class="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 max-h-64 overflow-auto"
        :class="{ 'pb-3': options.length > 8 }"
      >
        <div
          v-for="option in options"
          :key="getOptionValue(option)"
          @click="selectOption(option)"
          class="relative cursor-pointer select-none py-2 px-4 text-sm transition-colors duration-150"
          :class="{
            'text-[var(--primary-color)]': isSelected(option),
            'text-gray-900 hover:bg-gray-50': !isSelected(option),
          }"
        >
          <div class="flex items-center justify-between">
            <span
              class="truncate"
              :class="{
                'font-medium': isSelected(option),
                'text-slate-600 font-semibold': option.value === 'default',
              }"
            >
              {{ getOptionLabel(option) }}
              {{ option.value === "default" ? "📒" : "" }}
            </span>

            <!-- Selected checkmark -->
            <svg
              v-if="isSelected(option)"
              class="w-4 h-4 ml-2 flex-shrink-0"
              fill="var(--primary-color)"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <!-- Empty state -->
        <div
          v-if="!options.length"
          class="py-6 px-4 text-center text-sm text-gray-500"
        >
          No options available
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  modelValue?: any;
  options?: any[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  valueKey?: string;
  labelKey?: string;
}

interface Emits {
  (e: "update:modelValue", value: any): void;
  (e: "change", option: any): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  options: () => [],
  label: "",
  placeholder: "Select an option...",
  disabled: false,
  valueKey: "value",
  labelKey: "label",
});

const emit = defineEmits<Emits>();

const isOpen = ref(false);

// Helper functions for option handling
const getOptionValue = (option: any) => {
  if (typeof option === "string" || typeof option === "number") {
    return option;
  }
  return option[props.valueKey] || option.id || option.value;
};

const getOptionLabel = (option: any) => {
  if (typeof option === "string" || typeof option === "number") {
    return option;
  }
  return (
    option[props.labelKey] ||
    option.name ||
    option.label ||
    getOptionValue(option)
  );
};

const isSelected = (option: any) => {
  const optionValue = getOptionValue(option);
  return props.modelValue === optionValue;
};

const selectedLabel = computed(() => {
  if (props.modelValue === null || props.modelValue === undefined) return "";

  const selectedOption = props.options.find(
    (option) => getOptionValue(option) === props.modelValue
  );

  return selectedOption ? getOptionLabel(selectedOption) : "";
});

// Methods
const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
  }
};

const selectOption = (option: any) => {
  const value = getOptionValue(option);
  isOpen.value = false;
  emit("update:modelValue", value);
  emit("change", option);
};

const handleBlur = (event: FocusEvent) => {
  setTimeout(() => {
    if (
      !event.relatedTarget ||
      !event.currentTarget?.contains(event.relatedTarget as Node)
    ) {
      isOpen.value = false;
    }
  }, 150);
};

// Close dropdown when clicking outside
import { onMounted, onUnmounted } from "vue";

const handleClickOutside = (event: Event) => {
  const target = event.target as Element;
  if (!target.closest(".relative")) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
