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
    schema: {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "SoftwareApplication",
                "name": "GoGoResume",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web, Chrome Extension",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "description": "AI-powered resume optimization tool that tailors your resume to job descriptions and autofills job applications automatically. Free ATS resume scanner and resume keyword optimizer.",
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "100"
                }
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Why do I need GoGoResume?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "If you are a job-hunter and constantly tweak your resume to get past the ATS, GoGoResume is for you. Create a base version and tailor it instantly with AI."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How does AI resume optimization work?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Our AI analyzes job descriptions and optimizes your resume content to match relevant keywords and phrases that ATS systems look for, improving your chances of landing an interview."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Is GoGoResume ATS-friendly?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes, our templates are specifically designed to be easily parsed by Applicant Tracking Systems (ATS), ensuring your resume doesn't get rejected for formatting issues."
                        }
                    }
                ]
            }
        ]
    }
});

const pricingSection = ref<HTMLElement>();
const scrollToPricing = () => {
    pricingSection.value?.scrollIntoView({ behavior: "smooth" });
};
</script>
