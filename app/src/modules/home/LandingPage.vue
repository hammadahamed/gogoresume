<template>
    <div class="h-screen w-screen overflow-y-auto">
        <Navigation />
        <HeroSection @scroll-to-pricing="scrollToPricing" />

        <ATSEducationSection />
        <PainCycleSection />
        <HowItWorks />
        <AutoApplyProblemSection />
        <!-- <RepetitiveTypingSection /> -->

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
import PainCycleSection from "./PainCycleSection.vue";
import ATSEducationSection from "./ATSEducationSection.vue";
import AutoApplyProblemSection from "./AutoApplyProblemSection.vue";
import RepetitiveTypingSection from "./RepetitiveTypingSection.vue";
import IdealUsersSection from "./IdealUsersSection.vue";
import HowItWorks from "./HowItWorks.vue";
// import ComparisonSection from "./ComparisonSection.vue";
import PricingSection from "./PricingSection.vue";
import FAQSection from "./FAQSection.vue";
import Footer from "./Footer.vue";

const pricingSection = ref<HTMLElement>();
const scrollToPricing = () => {
    pricingSection.value?.scrollIntoView({ behavior: "smooth" });
};
</script>
