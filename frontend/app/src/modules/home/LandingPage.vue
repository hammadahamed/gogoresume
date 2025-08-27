<template>
  <div class="bg-white w-screen h-screen">
    <GoogleLogin class="px-10 mx-auto my-5" />
    <div class="h-screen overflow-y-auto mx-auto max-w-7xl">
      <Pricing />
    </div>
  </div>
</template>

<script setup lang="ts">
import Pricing from "@modules/pricing/PricingPage.vue";
import GoogleLogin from "@/common/functional-components/GoogleLogin.vue";
</script>
