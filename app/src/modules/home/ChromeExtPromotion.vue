<template>
  <div class="bg-gray-900 borde border-indigo-300 p-8 text-white rounded-lg">
    <!-- Header -->
    <div class="flex items-start justify-between">
      <div class="translate-y-0 md:translate-y-10">
        <div class="flex items-center gap-3 mb-2">
          <span
            class="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full"
          >
            FREE Chrome Extension
          </span>
        </div>
        <h3 class="text-3xl font-bold mb-">Chrome Extension</h3>
        <p class="text-gray-300 text-sm mb-4">Optimize on any job site</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col md:flex-row items-start justify-between mb-15">
      <div class="w-[350px] translate-y-0 md:translate-y-10">
        <p class="text-base text-gray-200 leading-relaxed mb-8">
          Browse LinkedIn, Indeed, or any job board. <br />
          Copy the job description and optimize your resume instantly without
          leaving the page.
        </p>

        <!-- Simple Features -->
        <div class="space-y-1 gap-4">
          <div class="flex items-center gap-3">
            <div class="">😎</div>
            <span class="text-gray-300">One-click optimization</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="">🔥</div>
            <span class="text-gray-300">Works on all job sites</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="">🚀</div>
            <span class="text-gray-300">Instant download</span>
          </div>
        </div>
      </div>

      <div
        class="max-w-[500px] w-full bg-gray-800 shadow-2xl rounded-lg p-4 aspect-[1/0.65] mr-0 md:-mr-[80px] mt-10 md:-mt-20"
      ></div>
    </div>

    <!-- CTA Button -->
    <div class="space-y-3">
      <button
        class="w-full bg-white text-gray-900 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
        @click="openExtensionPage"
      >
        Install Extension
      </button>
      <button
        class="w-full text-gray-300 text-sm hover:text-white transition-colors"
      >
        Watch demo video
      </button>
    </div>

    <!-- Simple Social Proof -->
    <div class="mt-6 pt-6 border-t border-gray-700" v-if="false">
      <div class="flex items-center justify-center gap-4 text-gray-400 text-sm">
        <span>⭐ 4.9/5</span>
        <span>•</span>
        <span>1000+ users</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { openExtensionPage } from "@/helper/ui.helper";
</script>
