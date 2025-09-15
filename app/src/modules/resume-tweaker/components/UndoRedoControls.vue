<template>
  <div class="flex items-center gap-1 z-10 -mt-6">
    <button
      @click="$emit('undo')"
      :disabled="!canUndo"
      :title="`Undo (${isMac ? '⌘' : 'Ctrl'}+Z)`"
      class="p-2 rounded-lg border border-transparent hover:border-gray-500 bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      :class="canUndo ? 'text-gray-700' : 'text-gray-400'"
    >
      <svg
        class="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
        />
      </svg>
    </button>

    <button
      @click="$emit('redo')"
      :disabled="!canRedo"
      :title="`Redo (${isMac ? '⌘' : 'Ctrl'}+Y)`"
      class="p-2 rounded-lg border border-transparent hover:border-gray-500 bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
      :class="canRedo ? 'text-gray-700' : 'text-gray-400'"
    >
      <svg
        class="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="3"
          d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
// Props
defineProps<{
  canUndo: boolean;
  canRedo: boolean;
}>();

// Emits
defineEmits<{
  undo: [];
  redo: [];
}>();

// Detect platform for keyboard shortcuts
const isMac =
  typeof navigator !== "undefined" &&
  navigator.platform.toUpperCase().indexOf("MAC") >= 0;
</script>
