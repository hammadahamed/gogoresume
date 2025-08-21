<template>
  <div class="flex h-screen w-screen bg-white overflow-hidden">
    <!-- Sidebar with store integration -->
    <Sidebar v-if="!isExtensionMode" />

    <!-- Main content with router-view -->
    <main class="w-full overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, watch } from "vue";
import { useRoute } from "vue-router";

import Sidebar from "@/common/components/Sidebar.vue";
import type { SidebarUser } from "./types/sidebar";
import { useAppStore } from "./stores/useAppStore";

const route = useRoute();
const appStore = useAppStore();

const isExtensionMode = computed(() => {
  return route.query.extension === "true";
});

provide("isExtensionMode", isExtensionMode);

// Watch for route changes and update store
watch(
  () => route.path,
  (newPath) => {
    appStore.initializeFromRoute(newPath);
  }
);

onMounted(() => {
  appStore.initializeFromRoute(route.path);
});
</script>

<style scoped>
/* Add your styles here */
</style>
