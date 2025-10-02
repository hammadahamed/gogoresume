<template>
  <div class="h-screen w-screen overflow-y-auto">
    <Navigation :noLoginButton="false" />

    <main class="flex-1">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from "./Navigation.vue";
import Footer from "./Footer.vue";
</script>

<style scoped>
/* Ensure proper spacing for fixed navigation */
main {
  padding-top: 80px; /* Adjust based on Navigation height */
}
</style>
