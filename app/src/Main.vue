<template>
  <div class="main-layout">
    <!-- Mobile Warning Modal -->
    <MobileWarningModal v-if="!isExtensionMode" />

    <!-- Mobile Header (only on mobile) -->
    <MobileHeader v-if="!isExtensionMode" @toggle-menu="toggleSidebar" />

    <!-- Sidebar with store integration -->
    <Sidebar
      v-if="!isExtensionMode"
      :is-open="isSidebarOpen"
      @close="closeSidebar"
    />

    <!-- Main content with router-view -->
    <main class="flex-1 w-full overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";

import Sidebar from "@/common/components/Sidebar.vue";
import MobileHeader from "@/common/components/MobileHeader.vue";
import MobileWarningModal from "@/common/components/MobileWarningModal.vue";
import type { SidebarUser } from "./types/sidebar";
import { useAppStore } from "./stores/useAppStore";

const appStore = useAppStore();

const route = useRoute();
const router = useRouter();
const isExtensionMode = inject("isExtensionMode");

// Mobile sidebar state
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

// Watch for route changes and update store
watch(
  () => route.path,
  (newPath) => {
    appStore.initializeFromRoute(newPath);
    // Close sidebar on route change (mobile)
    closeSidebar();
  }
);

onMounted(() => {
  if (isExtensionMode.value) router.replace("/resume-tweaker");
  appStore.initializeFromRoute(route.path);
});
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: white;
  overflow: hidden;
}

/* Desktop layout (>= 1000px) */
@media (min-width: 1000px) {
  .main-layout {
    flex-direction: row;
  }
}
</style>
