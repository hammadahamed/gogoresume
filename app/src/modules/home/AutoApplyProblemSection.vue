<template>
    <section class="problem-statement pb-20 bg-white relative overflow-hidden">
        <!-- Background Grid Pattern -->
        <div class="absolute inset-0 z-0 opacity-[0.03]"
            style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;">
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <div
                    class="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-gray-500 uppercase border-2 border-gray-200 rounded-full">
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

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-center">
                <!-- The Bot Way -->
                <div
                    class="bg-white p-8 border-2 border-gray-200 rounded-xl relative overflow-hidden group hover:border-gray-300 transition-colors">
                    <div class="flex items-center gap-4 mb-8">
                        <div
                            class="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center text-2xl text-gray-400">
                            🤖
                        </div>
                        <div>
                            <h3 class="font-bold text-2xl text-gray-400">The Bot Way</h3>
                            <p class="text-sm font-medium text-gray-400 uppercase tracking-wider">Spray and Pray</p>
                        </div>
                    </div>

                    <ul class="space-y-5">
                        <li class="flex items-start gap-4">
                            <div class="mt-1 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </div>
                            <span class="text-gray-500 font-medium">Sends 1,000+ generic resumes</span>
                        </li>
                        <li class="flex items-start gap-4">
                            <div class="mt-1 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </div>
                            <span class="text-gray-500 font-medium">Zero customization for the role</span>
                        </li>
                        <li class="flex items-start gap-4">
                            <div class="mt-1 text-gray-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </div>
                            <span class="text-gray-500 font-medium">Gets flagged as spam by ATS</span>
                        </li>
                        <li class="flex items-start gap-4 pt-4 border-t border-gray-100">
                            <span class="text-gray-400 font-bold text-lg">Result: 0 Interviews</span>
                        </li>
                    </ul>
                </div>

                <!-- The Smart Way -->
                <div
                    class="bg-white p-8 border-2 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden transform md:-translate-y-4 z-10">
                    <div class="flex items-center gap-4 mb-8">
                        <div
                            class="w-14 h-14 bg-black text-white rounded-lg flex items-center justify-center text-2xl shadow-md">
                            ✨
                        </div>
                        <div>
                            <h3 class="font-black text-2xl text-black">The Smart Way</h3>
                            <p class="text-sm font-bold text-black uppercase tracking-wider">Tailored Precision</p>
                        </div>
                    </div>

                    <ul class="space-y-5">
                        <li class="flex items-start gap-4">
                            <div class="mt-1 text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span class="text-black font-bold">Tailors every resume to the job</span>
                        </li>
                        <li class="flex items-start gap-4">
                            <div class="mt-1 text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span class="text-black font-bold">Optimizes keywords for ATS</span>
                        </li>
                        <li class="flex items-start gap-4">
                            <div class="mt-1 text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <span class="text-black font-bold">Highlights relevant experience</span>
                        </li>
                        <li class="flex items-start gap-4 pt-4 border-t-2 border-gray-100">
                            <span
                                class="bg-[var(--primary-color)] text-white font-black text-lg px-2 py-0.5 transform -rotate-1 inline-block">Result:
                                More Interviews</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* No extra styles needed, using Tailwind */
</style>
