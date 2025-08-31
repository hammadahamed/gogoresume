<template>
  <div class="h-screen w-screen overflow-y-auto" style="background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);">
    <Navigation />
    <HeroSection @scroll-to-pricing="scrollToPricing" />
    <HowItWorksSection />
    <WorkingProcessSection />
    <!-- <ComparisonSection /> -->
    <PricingSection ref="pricingSection" />
    <FAQSection />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Navigation from "./Navigation.vue";
import HeroSection from "./HeroSection.vue";
import HowItWorksSection from "./HowItWorksSection.vue";
import WorkingProcessSection from "./WorkingProcessSection.vue";
// import ComparisonSection from "./ComparisonSection.vue";
import PricingSection from "./PricingSection.vue";
import FAQSection from "./FAQSection.vue";
import Footer from "./Footer.vue";

const pricingSection = ref<HTMLElement>();
const scrollToPricing = () => {
  pricingSection.value?.scrollIntoView({ behavior: "smooth" });
};
</script>
