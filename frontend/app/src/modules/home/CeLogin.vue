<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center">
    <GoogleLogin />
  </div>
</template>

<script setup lang="ts">
import GoogleLogin from "@/common/functional-components/GoogleLogin.vue";
import StorageService from "@/services/storage.service";

const storageService = new StorageService();
</script>

<style scoped></style>
