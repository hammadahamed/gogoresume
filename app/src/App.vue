<template>
  <div>
    <Onboarding
      :showModal="appStore.showOnboarding"
      @update:showModal="appStore.showOnboarding = $event"
    />
    <div v-if="isLoading" class="loading-overlay">
      <Spinner />
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, provide } from "vue";
import { useDataManager } from "./composables/useDataManager";
import useAuthComposable from "./composables/useAuth";
import Onboarding from "./common/functional-components/Onboarding.vue";
import { useAppStore } from "./stores/useAppStore";
import Spinner from "@/common/components/Spinner.vue";
import { useRoute } from "vue-router";

const isLoading = ref(true);

const appStore = useAppStore();
const { bootstrap } = useAuthComposable();

const route = useRoute();

const isExtensionMode = computed(() => {
  return route.query.extension === "true";
});

provide("isExtensionMode", isExtensionMode);
appStore.isExtensionMode = isExtensionMode;

onMounted(async () => {
  try {
    await bootstrap();
    // await getUserProfile();
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
