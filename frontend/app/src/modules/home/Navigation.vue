<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs sm:text-sm">GR</span>
          </div>
          <span class="text-lg sm:text-xl font-bold text-gray-900">GoGoResume</span>
        </div>
        <div class="flex-shrink-0">
          <GoogleLogin />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import GoogleLogin from "@/common/functional-components/GoogleLogin.vue";
</script>
