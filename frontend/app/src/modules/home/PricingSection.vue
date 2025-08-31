<template>
  <section ref="pricingSection" class="py-12 sm:py-16 lg:py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Simple,
          <span class="bg-highlight text-black px-1 sm:px-2">Transparent</span> Pricing
        </h2>
        <p class="text-lg sm:text-xl text-gray-600 px-4 sm:px-0">One-time payment. No recurring fees. No hidden costs.</p>
      </div>
      <Pricing />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Pricing from "../pricing/PricingPage.vue";

const pricingSection = ref<HTMLElement>();

defineExpose({
  pricingSection
});
</script>
