<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center">
    <div class="text-2xl font-bold">
      <button @click="setDate">SET Date</button>
    </div>
    <div class="text-2xl font-bold">
      <button @click="getDate">GET Date</button>
    </div>

    <GoogleLogin />
  </div>
</template>

<script setup lang="ts">
import GoogleLogin from "@/common/functional-components/GoogleLogin.vue";
import StorageService from "@/services/storage.service";

const storageService = new StorageService();
const setDate = async () => {
  await storageService.set("date", new Date().toISOString());
  console.log("Date set");
};

const getDate = async () => {
  const date = await storageService.get("date");
  console.log("Date:", date);
};
</script>

<style scoped></style>
