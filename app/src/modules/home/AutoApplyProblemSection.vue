<template>
    <section class="problem-statement pb-20 bg-white relative overflow-hidden" style="margin-top: -50px ;">
        <!-- Background Grid Pattern -->
        <div class="absolute inset-0 z-0 opacity-[0.2]"
            style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;">
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <div
                    class="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-black uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Quality vs Quantity
                </div>
                <h2 class="text-4xl sm:text-5xl font-black text-black mb-6 leading-tight">
                    Stop Using <span class="relative inline-block">"Auto-Applying"
                        <svg class="absolute w-full h-3 -bottom-1 left-0 text-gray-300" viewBox="0 0 100 10"
                            preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
                        </svg>
                    </span> Bots
                </h2>
                <p class="text-xl text-gray-600 font-medium leading-relaxed">
                    Recruiters can smell a generic resume from a mile away. Spamming 1,000
                    applications is the fastest way to get blacklisted.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
                <!-- The Bot Way -->
                <div style="height: min-content;"
                    class="mt-10 bg-white p-8 border-2 border-gray-200 rounded-xl relative overflow-hidden group hover:border-gray-300 transition-colors h-full">
                    <div class="flex items-center gap-4 mb-8">
                        <div
                            class="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-2xl text-gray-400 shrink-0">
                            {{ botWay.icon }}
                        </div>
                        <div>
                            <h3 class="font-bold text-2xl text-gray-600">{{ botWay.title }}</h3>
                            <p class="text-sm font-medium text-gray-700 uppercase tracking-wider">{{ botWay.subtitle }}
                            </p>
                        </div>
                    </div>

                    <ul class="space-y-5">
                        <li v-for="(point, index) in botWay.points" :key="index" class="flex items-start gap-4">
                            <div class="mt-1 text-gray-300 shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </div>
                            <span class="text-gray-600 font-medium">{{ point }}</span>
                        </li>
                        <li class="flex items-start gap-4 pt-4 border-t border-gray-100">
                            <span class="text-red-400 font-semibold text-lg">{{ botWay.result }}</span>
                        </li>
                    </ul>
                </div>

                <!-- The Smart Way -->
                <div
                    class="bg-white p-8 border-2 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden transform md:-translate-y-4 z-10 h-full">
                    <div class="flex items-center gap-4 mb-8">
                        <div
                            class="w-14 h-14 bg-black text-white rounded-lg flex items-center justify-center text-2xl shadow-md shrink-0">
                            {{ smartWay.icon }}
                        </div>
                        <div>
                            <h3 class="font-black text-2xl text-black">{{ smartWay.title }}</h3>
                            <p class="text-sm font-bold text-black uppercase tracking-wider">{{ smartWay.subtitle }}</p>
                        </div>
                    </div>

                    <ul class="space-y-5">
                        <li v-for="(point, index) in smartWay.points" :key="index" class="flex items-start gap-4">
                            <div class="mt-1 text-black shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span class="text-gray-700 font-medium">{{ point }}</span>
                        </li>
                        <li class="flex items-start gap-4 pt-4 border-t-2 border-gray-100">
                            <span
                                class="bg-[var(--primary-color)] text-white font-black text-lg px-2 py-0.5 transform -rotate-1 inline-block">{{
                                    smartWay.result }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const botWay = {
    title: "The Auto-Apply Bot Way",
    subtitle: "SPARY and PRAY",
    icon: "🤖",
    points: [
        "Blasts generic resumes to 500+ jobs",
        "Doesn’t read or analyze the job description",
        "Gets flagged by ATS for spam-like behavior",
        "Hurts your chances with real recruiters",
    ],
    result: "Result: Rejections pile up"
};

const smartWay = {
    title: "The Smart Way",
    subtitle: "With GoGoResume",
    icon: "✨",
    points: [
        "Gives smart, JD-based suggestions you can apply instantly",
        "Helps you tailor your resume for each job without rewriting everything",
        "Highlights relevant keywords to improve ATS score",
        "Lets you tweak content in seconds with the sidebar",
        "Autofills job forms so you don’t retype details again",
        "Keeps full control in your hands — nothing is auto-applied"
    ],
    result: "Result: More Interviews + Confidence"
};
</script>

<style scoped>
/* No extra styles needed, using Tailwind */
</style>
