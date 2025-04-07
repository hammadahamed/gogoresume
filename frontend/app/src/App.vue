<template>
  <div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserInfoManager } from "./composables/useUserInfoManager";

const isLoading = ref(true);
const { getUserProfile } = useUserInfoManager();

onMounted(async () => {
  try {
    await getUserProfile();
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

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid black;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
