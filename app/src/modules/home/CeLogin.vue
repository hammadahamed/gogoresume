<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center">
    <p class="text-xl font-semibold mb-4">Welcome to GoGoResume 👋</p>
    <GoogleLogin />
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
