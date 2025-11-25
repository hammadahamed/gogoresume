<template>
    <section class="pain-cycle-section pb-32 mb-0 bg-white relative overflow-hidden">
        <!-- Background Grid Pattern -->
        <div class="absolute inset-0 z-0 opacity-[0.03]"
            style="background-image: radial-gradient(#000 1px, transparent 1px); background-size: 20px 20px;">
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-20">
                <div
                    class="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wide text-black uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    STRUGGLE IS REAL
                </div>
                <h2 class="text-4xl sm:text-5xl font-black text-black mb-6 leading-tight">
                    The Job Application <br class="hidden sm:block" />
                    <span class="relative z-10 text-white bg-highlight">Pain Cycle</span>
                </h2>
                <p class="text-xl text-gray-700 font-medium leading-relaxed max-w-2xl mx-auto">
                    Does this sound familiar? You spend hours tweaking files, only to get
                    ghosted. It's not you, it's the broken process.
                </p>
            </div>

            <div class="relative max-w-6xl mx-auto">
                <!-- Connecting Line (Desktop) -->
                <div
                    class="hidden md:block absolute top-1/2 left-0 w-full h-3 bg-black -translate-y-1/2 z-0 border-y-2 border-black">
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                    <div v-for="(step, index) in painSteps" :key="index" class="group relative">
                        <div class="absolute inset-0 bg-black translate-x-2 translate-y-2 z-0"></div>
                        <div
                            :class="[step.bgColor, 'p-6 border-2 border-black h-full flex flex-col items-center text-center relative z-10 hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-200']">
                            <div
                                :class="[step.badgeColor, step.badgeTextColor, 'absolute -top-5 left-1/2 -translate-x-1/2 font-black text-lg w-10 h-10 flex items-center justify-center border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]']">
                                {{ step.id }}
                            </div>

                            <div
                                :class="[step.shadowColor, 'mt-6 mb-4 w-16 h-16 bg-white border-2 border-black flex items-center justify-center text-3xl']">
                                {{ step.icon }}
                            </div>

                            <h3 class="font-bold text-xl text-black mb-3">{{ step.title }}</h3>
                            <p class="text-sm font-medium text-gray-700 leading-relaxed">
                                {{ step.description }}
                            </p>

                            <!-- Connector Arrow Mobile -->
                            <div v-if="index < painSteps.length - 1"
                                class="md:hidden mt-6 text-black font-black text-2xl">↓</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const painSteps = [
    {
        id: '01',
        icon: '📝',
        title: 'Endless Tweaking',
        description: 'Manually editing Word/Canva files for every single job description.',
        bgColor: 'bg-blue-50',
        badgeColor: 'bg-blue-500',
        badgeTextColor: 'text-white',
        shadowColor: 'shadow-[4px_4px_0px_0px_rgba(147,197,253,1)]'
    },
    {
        id: '02',
        icon: '⌨️',
        title: 'Repetitive Typing',
        description: 'Entering the same name, education, and experience on 50+ portals.',
        bgColor: 'bg-yellow-50',
        badgeColor: 'bg-yellow-400',
        badgeTextColor: 'text-black',
        shadowColor: 'shadow-[4px_4px_0px_0px_rgba(252,211,77,1)]'
    },
    {
        id: '03',
        icon: '📂',
        title: 'File Chaos',
        description: '"Resume_Final_v2_Real_Final.pdf" cluttering your desktop.',
        bgColor: 'bg-purple-50',
        badgeColor: 'bg-purple-500',
        badgeTextColor: 'text-white',
        shadowColor: 'shadow-[4px_4px_0px_0px_rgba(192,132,252,1)]'
    },
    {
        id: '04',
        icon: '👻',
        title: 'The Black Hole',
        description: 'Low ATS scores mean your resume is rejected before a human sees it.',
        bgColor: 'bg-red-50',
        badgeColor: 'bg-red-500',
        badgeTextColor: 'text-white',
        shadowColor: 'shadow-[4px_4px_0px_0px_rgba(248,113,113,1)]'
    }
];
</script>
