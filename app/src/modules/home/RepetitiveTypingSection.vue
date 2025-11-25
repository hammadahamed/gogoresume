<template>
    <section class="repetitive-typing-section py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <!-- Left: The Pain (Manual Typing) -->
                <div class="relative">
                    <div class="absolute -top-10 -left-10 w-40 h-40 bg-red-100 rounded-full filter blur-3xl opacity-30">
                    </div>

                    <div
                        class="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8 relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-full h-1 bg-red-400"></div>
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="font-bold text-gray-900">Job Portal #42</h3>
                            <span class="text-xs font-mono text-red-500">Step 1 of 8</span>
                        </div>

                        <div class="space-y-4 opacity-75">
                            <div>
                                <label class="block text-xs font-semibold text-gray-500 mb-1">First Name</label>
                                <div class="h-8 bg-gray-100 rounded border border-gray-200 w-full"></div>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-500 mb-1">Last Name</label>
                                <div class="h-8 bg-gray-100 rounded border border-gray-200 w-full"></div>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-500 mb-1">Education History</label>
                                <div class="h-24 bg-gray-100 rounded border border-gray-200 w-full p-2">
                                    <span class="text-xs text-gray-400">Typing...</span>
                                </div>
                            </div>
                            <div>
                                <label class="block text-xs font-semibold text-gray-500 mb-1">Work Experience</label>
                                <div class="h-24 bg-gray-100 rounded border border-gray-200 w-full"></div>
                            </div>
                        </div>

                        <!-- Frustration Overlay -->
                        <div class="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]">
                            <div
                                class="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold border border-red-100 shadow-lg transform -rotate-6">
                                Why again?! 😫
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: The Solution (Text) -->
                <div class="lg:pl-8">
                    <div
                        class="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
                        Save Time
                    </div>
                    <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        The Repeated <br /><span
                            class="text-black bg-yellow-200 px-2 transform -rotate-1 inline-block">Typing Hell</span>
                    </h2>
                    <p class="text-lg text-gray-600 mb-6 leading-relaxed">
                        You type the same information 50+ times across different job portals. Name, email, education,
                        skills... over and over again.
                    </p>
                    <p class="text-lg text-gray-900 font-medium mb-8">
                        Why waste your life on data entry?
                    </p>

                    <div class="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white text-xl">
                            ⚡️
                        </div>
                        <div>
                            <h4 class="font-bold text-gray-900">One-Click Autofill</h4>
                            <p class="text-sm text-gray-500">Coming soon to GoGoResume</p>
                        </div>
                        <div class="ml-auto">
                            <button
                                class="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// Static component
</script>
