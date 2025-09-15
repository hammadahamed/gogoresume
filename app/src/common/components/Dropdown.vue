<template>
  <div class="relative" ref="dropdownRef">
    <!-- Trigger Button -->
    <button
      type="button"
      @click="toggleDropdown"
      :class="triggerClass"
      class="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
    >
      <!-- Default three dots icon if no slot provided -->
      <slot name="trigger">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
          />
        </svg>
      </slot>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      :class="[
        'absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10 border',
        menuClass,
      ]"
      :style="{ minWidth: minWidth }"
    >
      <div class="py-1">
        <slot name="menu" :close="closeDropdown">
          <!-- Default menu items if options are provided -->
          <button
            v-for="option in options"
            :key="option.value"
            type="button"
            @click="handleOptionClick(option)"
            class="block w-full text-left px-4 py-2 text-sm transition-colors"
            :class="getOptionClass(option)"
          >
            {{ option.label }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

export interface DropdownOption {
  value: string;
  label: string;
  variant?: "default" | "danger";
  disabled?: boolean;
}

interface Props {
  options?: DropdownOption[];
  triggerClass?: string;
  menuClass?: string;
  minWidth?: string;
  closeOnClick?: boolean;
}

interface Emits {
  (e: "select", value: string, option: DropdownOption): void;
  (e: "open"): void;
  (e: "close"): void;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  triggerClass: "",
  menuClass: "w-48",
  minWidth: "12rem",
  closeOnClick: true,
});

const emit = defineEmits<Emits>();

const dropdownRef = ref<HTMLElement>();
const isOpen = ref(false);

// Methods
const toggleDropdown = () => {
  if (isOpen.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
};

const openDropdown = () => {
  isOpen.value = true;
  emit("open");
};

const closeDropdown = () => {
  isOpen.value = false;
  emit("close");
};

const handleOptionClick = (option: DropdownOption) => {
  if (option.disabled) return;

  emit("select", option.value, option);

  if (props.closeOnClick) {
    closeDropdown();
  }
};

const getOptionClass = (option: DropdownOption) => {
  const baseClass = "hover:bg-gray-100";

  if (option.disabled) {
    return "text-gray-400 cursor-not-allowed";
  }

  if (option.variant === "danger") {
    return `text-red-600 hover:bg-red-50 ${baseClass}`;
  }

  return `text-gray-700 ${baseClass}`;
};

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Expose methods for external control
defineExpose({
  open: openDropdown,
  close: closeDropdown,
  toggle: toggleDropdown,
  isOpen: () => isOpen.value,
});
</script>
