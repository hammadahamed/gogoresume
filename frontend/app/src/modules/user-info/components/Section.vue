<script setup lang="ts">
import { defineProps } from "vue";

// Define props
const props = defineProps<{
  title: string;
  className?: string;
}>();
</script>

<template>
  <div :class="`bg-white rounded-lg p-6 ${props.className || ''}`">
    <h2 class="text-xl font-semibold text-gray-800 mb-2 text-left">
      {{ "/" + props.title }}
    </h2>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here if needed */
</style>
