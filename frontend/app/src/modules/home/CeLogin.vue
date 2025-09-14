<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center">
    <img
      src="@/assets/images/mascot.webp"
      alt="GoGoResume Mascot"
      class="w-40 h-40 rounded-full mb-5"
    />
    <p class="text-xl font-semibold mb-4">Welcome to GoGoResume 👋</p>
    <GoogleLogin />
    <p v-if="isExtensionMode" class="text-sm text-gray-500 mt-3">
      Powered by GoGoResume
    </p>
  </div>
</template>

<script setup lang="ts">
import GoogleLogin from "@/common/functional-components/GoogleLogin.vue";
import StorageService from "@/services/storage.service";
import { inject } from "vue";

const storageService = new StorageService();

const isExtensionMode = inject("isExtensionMode");
</script>

<style scoped></style>
