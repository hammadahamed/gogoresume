<script setup lang="ts">
// Define props
const props = defineProps<{
  title: string;
  className?: string;
}>();
</script>

<template>
  <div :class="`bg-white rounded-lg py-4 ${props.className || ''}`">
    <h2 class="text-md font-bold text-gray-700 mb-2 text-left underline">
      {{ "" + props.title }}
    </h2>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here if needed */
</style>
