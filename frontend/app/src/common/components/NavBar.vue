<script setup lang="ts">
// Define props
const props = defineProps<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}>();

// Define tabs
const TABS = [
  { id: "user-info", label: "User Info" },
  { id: "resume-builder", label: "Resume Builder" },
  { id: "resume-helper", label: "Resume Helper" },
  { id: "settings", label: "Settings" },
];
</script>

<template>
  <div
    class="flex items-center justify-between py-3 px-10 pl-6 gap-10 w-screen border-b border-gray-200"
  >
    <!-- Logo/Title -->
    <p class="text-xl font-bold text-gray-900">GoGoResume</p>

    <!-- Navigation Links -->
    <div class="flex items-center space-x-2 text-sm">
      <template v-for="(tab, index) in TABS" :key="tab.id">
        <span v-if="index > 0" class="text-gray-500">·</span>
        <button
          :class="[
            'transition-colors relative py-1',
            activeTab === tab.id
              ? 'text-gray-900 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900'
              : 'text-gray-500 hover:text-gray-900',
          ]"
          @click="props.setActiveTab(tab.id)"
        >
          {{ tab.label }}
        </button>
      </template>
    </div>

    <!-- Auth Buttons -->
    <div class="flex space-x-4">
      <button class="text-sm font-semibold text-gray-900 hover:text-gray-700">
        Sign up
      </button>
      <button
        class="text-sm font-semibold bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800"
      >
        Log in
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here if needed */
</style>
