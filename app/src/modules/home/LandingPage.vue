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
import { useSEO } from "@/composables/useSEO";

// Apply SEO meta tags for landing page
useSEO({
  title:
    "GoGoResume – AI Resume Tailor + Autofill Assistant | ATS Optimized Resume Builder",
  description:
    "Tailor your resume to any job instantly + autofill job applications in one click. AI-powered ATS resume optimizer that matches your resume to job descriptions automatically. Free ATS resume scanner and resume keyword optimizer.",
  keywords:
    "ATS resume checker, resume keyword optimizer, how to match resume to job description, autofill job applications, chrome extension autofill resume, resume writer ai, ATS resume scanner, resume tailored for job, free ATS resume scanner, resume keyword extractor, job description matching, ATS resume optimizer",
  canonical: "https://gogoresume.com",
});

const pricingSection = ref<HTMLElement>();
const scrollToPricing = () => {
  pricingSection.value?.scrollIntoView({ behavior: "smooth" });
};
</script>
