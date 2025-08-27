<template>
  <span :class="['loader', customClass]" :style="customStyle"> </span>
</template>

<script setup>
import { computed } from "vue";

// Define props for the component
const props = defineProps({
  size: {
    type: String,
    default: "28px", // Default size
  },
  color: {
    type: String,
    default: "var(--primary-1)", // Default color
  },
  customClass: {
    type: String,
    default: "", // Allows passing additional classes
  },
  borderWidth: {
    type: String,
    default: "2px", // Border width
  },
});

// Compute custom styles based on props
const customStyle = computed(() => ({
  width: props.size,
  height: props.size,
  borderWidth: props.borderWidth,
  borderColor: props.color,
  borderBottomColor: "transparent", // Keeps the spinning effect
}));
</script>

<style scoped lang="scss">
.loader {
  border-style: solid;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
