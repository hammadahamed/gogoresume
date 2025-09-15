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
import { computed, onMounted, provide, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";

import Sidebar from "@/common/components/Sidebar.vue";
import type { SidebarUser } from "./types/sidebar";
import { useAppStore } from "./stores/useAppStore";

const appStore = useAppStore();

const route = useRoute();
const router = useRouter();
const isExtensionMode = inject("isExtensionMode");

// Watch for route changes and update store
watch(
  () => route.path,
  (newPath) => {
    appStore.initializeFromRoute(newPath);
  }
);

onMounted(() => {
  if (isExtensionMode.value) router.replace("/resume-tweaker");
  appStore.initializeFromRoute(route.path);
});
</script>

<style scoped>
/* Add your styles here */
</style>
