<template>
    <section class="max-w-5xl mx-auto px-4 sm:px-6 ats-explainer my-16 py-20 bg-white relative overflow-hidden">
        <!-- Background Grid Pattern -->
        <div class="absolute inset-0 z-0 opacity-[0.03]"
            style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;">
        </div>

        <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
            <!-- Centered Title Section -->
            <div class="text-center max-w-3xl mx-auto mb-16">
                <div
                    class="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-black uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    The Hidden Problem
                </div>
                <h2 class="text-4xl sm:text-5xl font-bold text-black mb-6 leading-tight">
                    What is an <span class="relative inline-block px-2 mx-1">
                        <span class="relative z-10 bg-highlight">ATS</span>
                    </span>?
                </h2>
                <p class="font-mono text-sm bg-gray-100 inline-block px-2 py-1 border border-black">
                    ATS = Applicant Tracking System
                </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <!-- Text Content -->
                <div class="order-2 lg:order-1">
                    <p class="text-xl text-gray-800 font-medium mb-6 leading-relaxed">
                        It's the robot gatekeeper that reads your resume before a human ever does.
                        <strong class="bg-yellow-100 px-1 border-black">Over 75% of resumes are rejected
                            instantly</strong>
                        because they aren't optimized for these systems.
                    </p>
                    <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                        Keywords, formatting, and relevance are all scored. If you don't
                        hit the mark, you fall into the "black hole" — never to be seen
                        again.
                    </p>

                    <div class="flex flex-col gap-4 mt-4">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </div>
                            <span class="font-medium text-gray-900 text-lg">Rejects Generic Resumes</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </div>
                            <span class="font-medium text-gray-900 text-lg">Ignores Bad Formatting</span>
                        </div>
                    </div>
                </div>

                <!-- Visual/Illustration -->
                <div class="order-1 lg:order-2 flex justify-center relative">
                    <div class="relative w-full max-w-md aspect-square flex items-center justify-center">

                        <!-- The ATS Machine Box -->
                        <div
                            class="relative w-72 h-80 bg-gray-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] flex flex-col items-center pt-8 z-10">
                            <!-- Machine Header -->
                            <div class="absolute top-0 left-0 w-full h-12 bg-black flex items-center px-4 gap-2">
                                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                                <div class="ml-auto font-mono text-white text-xs">ATS_SCANNER</div>
                            </div>

                            <!-- Scanning Area -->
                            <div class="mt-8 w-56 h-48 bg-white border-2 border-black relative overflow-hidden">
                                <!-- Resume Document -->
                                <div
                                    class="absolute top-4 left-1/2 -translate-x-1/2 w-40 h-52 bg-white border-2 border-gray-300 flex flex-col p-3 gap-2 animate-slide-down">
                                    <div class="w-12 h-12 bg-gray-200 mb-2 border border-gray-300"></div>
                                    <div class="w-full h-2 bg-gray-200"></div>
                                    <div class="w-3/4 h-2 bg-gray-200"></div>
                                    <div class="w-full h-2 bg-gray-200 mt-2"></div>
                                    <div class="w-full h-2 bg-gray-200"></div>
                                    <div class="w-1/2 h-2 bg-gray-200"></div>
                                </div>

                                <!-- Scanner Line -->
                                <div
                                    class="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-scan z-20">
                                </div>

                                <!-- Scan Overlay -->
                                <div class="absolute inset-0 bg-red-500/10 z-10"></div>
                            </div>

                            <!-- Status Output -->
                            <div class="mt-4 w-56 flex justify-between items-center">
                                <div class="font-mono text-xs font-bold">STATUS:</div>
                                <div
                                    class="bg-red-100 text-red-600 px-2 py-1 font-mono text-xs font-bold border border-red-500 animate-pulse">
                                    MATCH: 12%
                                </div>
                            </div>
                        </div>

                        <!-- Rejected Stamp (Floating) -->
                        <div class="absolute -bottom-6 -right-6 z-20 transform rotate-12 animate-stamp">
                            <div
                                class="bg-red-300 text-white px-6 py-2 font-black text-2xl border-2 border-black shdow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase tracking-widest">
                                Rejected
                            </div>
                        </div>

                        <!-- Decorative Elements -->

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes scan {
    0% {
        top: 0%;
    }

    50% {
        top: 100%;
    }

    100% {
        top: 0%;
    }
}

@keyframes slide-down {
    0% {
        transform: translate(-50%, -20px);
    }

    100% {
        transform: translate(-50%, 20px);
    }
}

@keyframes stamp {
    0% {
        transform: rotate(12deg) scale(1.1);
        opacity: 0;
    }

    100% {
        transform: rotate(12deg) scale(1);
        opacity: 1;
    }
}

.animate-scan {
    animation: scan 3s ease-in-out infinite;
}

.animate-slide-down {
    animation: slide-down 3s ease-in-out infinite;
}

.animate-stamp {
    animation: stamp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards 1s;
    opacity: 0;
    /* Start hidden */
    animation-fill-mode: forwards;
}
</style>
