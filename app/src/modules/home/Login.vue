<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center">
    <CeLogin v-if="isExtensionMode" />
    <LoginPage v-else />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import CeLogin from "./CeLogin.vue";
import LoginPage from "./LoginPage.vue";

const isExtensionMode = inject("isExtensionMode");
</script>
