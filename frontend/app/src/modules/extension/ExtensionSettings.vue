<template>
  <div class="min-h-screen py-8 pb-32">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-2xl font-bold text-gray-900 mb-8">Chrome Extension</p>

      <InstallationCheck
        @extension-installed="handleExtensionInstalled"
        class="mb-8"
      />
      <SyncData v-if="extensionInstalled" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SyncData from "./SyncData.vue";
import InstallationCheck from "./InstallationCheck.vue";

const extensionInstalled = ref(false);

const handleExtensionInstalled = () => {
  extensionInstalled.value = true;
};
</script>
