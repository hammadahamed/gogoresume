<template>
  <button
    @click="$emit('click')"
    :class="[
      'inline-flex items-center gap-3 rounded-full font-semibold transition-all duration-300 group relative overflow-hidden',
      sizeClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      'rainbow-border',
      props.className,
    ]"
    :style="buttonStyles"
    :disabled="disabled"
  >
    <!-- Rainbow border overlay -->
    <div class="rainbow-border-overlay"></div>

    <!-- Button content -->
    <div class="relative z-10 flex items-center gap-3 w-full">
      <span
        v-if="text"
        :class="textClass"
        :style="{ color: computedTextColor }"
        >{{ text }}</span
      >
      <slot v-else name="text"></slot>
      <div
        :class="iconContainerClasses"
        class="rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300"
        :style="iconStyles"
      >
        <svg
          :class="iconSvgClasses"
          :style="{ color: primaryColor }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  text?: string;
  variant?: "dark" | "light";
  size?: "big" | "small";
  disabled?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  textColor?: string;
  className?: string;
}>();

defineEmits<{
  click: [];
}>();

// Size configurations
const sizeConfig = {
  big: {
    padding: "pl-8 pr-3 py-4",
    iconContainer: "w-10 h-10",
    iconSvg: "w-5 h-5",
    textClass: "text-lg",
  },
  small: {
    padding: "pl-4 pr-2 py-2",
    iconContainer: "w-6 h-6",
    iconSvg: "w-3 h-3",
    textClass: "text-xs",
  },
  default: {
    padding: "pl-5 pr-3 py-2",
    iconContainer: "w-8 h-8",
    iconSvg: "w-4 h-4",
    textClass: "text-sm",
  },
};

// Get current size config
const currentSizeConfig = computed(() => {
  if (props.size === "big") return sizeConfig.big;
  if (props.size === "small") return sizeConfig.small;
  return sizeConfig.default;
});

// Size-based classes
const sizeClasses = computed(() => currentSizeConfig.value.padding);
const iconContainerClasses = computed(
  () => currentSizeConfig.value.iconContainer
);
const iconSvgClasses = computed(() => currentSizeConfig.value.iconSvg);
const textClass = computed(() => currentSizeConfig.value.textClass);
// Default colors
const defaultColors = {
  dark: {
    primary: "#000000",
    secondary: "#ffffff",
    text: "#ffffff",
    iconColor: "#000000",
  },
  light: {
    primary: "#ffffff",
    secondary: "#000000",
    text: "#000000",
    iconColor: "#ffffff",
  },
};

// Computed styles based on props or defaults
const computedPrimaryColor = computed(() => {
  if (props.primaryColor) return props.primaryColor;
  return props.variant === "light"
    ? defaultColors.light.primary
    : defaultColors.dark.primary;
});

const computedSecondaryColor = computed(() => {
  if (props.secondaryColor) return props.secondaryColor;
  return props.variant === "light"
    ? defaultColors.light.secondary
    : defaultColors.dark.secondary;
});

const computedTextColor = computed(() => {
  if (props.textColor) return props.textColor;
  return props.variant === "light"
    ? defaultColors.light.text
    : defaultColors.dark.text;
});

// Button styles
const buttonStyles = computed(() => ({
  backgroundColor: computedPrimaryColor.value,
  color: computedTextColor.value,
}));

// Icon container styles
const iconStyles = computed(() => ({
  backgroundColor: computedSecondaryColor.value,
}));
</script>

<style scoped>
.rainbow-border {
  position: relative;
  background: linear-gradient(45deg, transparent, transparent);
}

.rainbow-border-overlay {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: conic-gradient(
    from 0deg,
    #667eea,
    #764ba2,
    #f093fb,
    #f5576c,
    #4facfe,
    #00f2fe,
    #43e97b,
    #38f9d7,
    #5b73db,
    #9b59b6,
    #e74c3c,
    #667eea
  );
  border-radius: inherit;
  animation: rainbow-rotate 3s linear infinite;
  z-index: 1;
}

.rainbow-border::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: inherit;
  border-radius: inherit;
  z-index: 2;
}

@keyframes rainbow-rotate {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

/* Ensure button content is above the rainbow border */
.rainbow-border > div:last-child {
  position: relative;
  z-index: 10;
}
</style>
