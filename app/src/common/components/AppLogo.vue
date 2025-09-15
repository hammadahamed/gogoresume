<template>
  <div
    class="flex items-center cursor-pointer"
    :class="containerClass"
    @click="handleClick"
  >
    <div class="flex items-center" :class="itemsSpacing">
      <!-- Mascot Image (Navigation style) -->
      <img
        src="@/assets/images/mascot.webp"
        alt="GoGoResume Mascot"
        :class="imageClass"
      />

      <!-- Title -->
      <span class="font-bold text-gray-900" :class="titleClass">
        {{ title }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "icon" | "image" | "logo";
  title?: string;
  logoText?: string;
  logoSrc?: string;
  size?: "sm" | "md" | "lg";
  containerClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "icon",
  title: "GoGoResume",
  logoText: "GR",
  logoSrc: "",
  size: "md",
  containerClass: "",
});

const emit = defineEmits<{
  click: [];
}>();

// Computed classes based on variant and size
const itemsSpacing = computed(() => {
  return props.variant === "image" || props.variant === "logo"
    ? "space-x-2"
    : "space-x-3";
});

const imageClass = computed(() => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10 sm:w-12 sm:h-12",
    lg: "w-12 h-12 sm:w-14 sm:h-14",
  };
  return `${sizeClasses[props.size]} rounded-2xl cursor-pointer`;
});

const iconClass = computed(() => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-7 h-7 sm:w-8 sm:h-8",
    lg: "w-8 h-8 sm:w-10 sm:h-10",
  };
  return sizeClasses[props.size];
});

const iconTextClass = computed(() => {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-xs sm:text-sm",
    lg: "text-sm sm:text-base",
  };
  return sizeClasses[props.size];
});

const titleClass = computed(() => {
  const sizeClasses = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-xl sm:text-2xl",
  };
  return sizeClasses[props.size];
});

const handleClick = () => {
  emit("click");
};
</script>
