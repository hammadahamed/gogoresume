<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center">
    <p class="text-xl mt-10 font-semibold mb-4">Welcome to GoGoResume 👋</p>
    <GoogleLogin />
    <p class="text-sm mt-4">Please login to continue</p>
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
