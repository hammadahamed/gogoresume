<template>
  <div
    class="bg-gray-900 border-10 border-indigo-300 p-8 text-white rounded-lg"
  >
    <!-- Header -->
    <div class="flex items-start justify-between mb-">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <div
            class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"
          >
            <span class="text-sm">🔗</span>
          </div>
          <span
            class="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full"
          >
            Free Extension
          </span>
        </div>
        <h3 class="text-2xl font-bold mb-2">Chrome Extension</h3>
        <p class="text-gray-300 text-sm">Optimize on any job site</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mb-8">
      <p class="text-lg text-gray-200 mb-6 leading-relaxed">
        Browse LinkedIn, Indeed, or any job board. Copy the job description and
        optimize your resume instantly without leaving the page.
      </p>

      <!-- Simple Features -->
      <div class="space-y-3 mb-6">
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span class="text-gray-300">One-click optimization</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span class="text-gray-300">Works on all job sites</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span class="text-gray-300">Instant download</span>
        </div>
      </div>
    </div>

    <!-- CTA Button -->
    <div class="space-y-3">
      <button
        class="w-full bg-white text-gray-900 font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors"
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
    <div class="mt-6 pt-6 border-t border-gray-700">
      <div class="flex items-center justify-center gap-4 text-gray-400 text-sm">
        <span>⭐ 4.9/5</span>
        <span>•</span>
        <span>1000+ users</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this promotional component
</script>

<style scoped>
/* Additional styles if needed */
</style>
