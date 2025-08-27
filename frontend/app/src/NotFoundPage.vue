<template>
  <div
    class="min-h-screen w-screen bg-gray-50 flex items-center justify-center px-4"
  >
    <div class="text-center max-w-md mx-auto">
      <!-- 404 Number -->
      <div class="mb-8">
        <h1 class="text-8xl font-bold text-gray-800 mb-2">404</h1>
        <div class="w-16 h-1 bg-violet-500 mx-auto rounded-full"></div>
      </div>

      <!-- Message -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold text-gray-700 mb-3">
          Page Not Found
        </h2>
        <p class="text-gray-600">The page you're looking for doesn't exist.</p>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-3">
        <button
          @click="goHome"
          class="w-full px-6 py-3 bg-violet-500 text-white font-medium rounded-lg hover:bg-violet-600 transition-colors duration-200"
        >
          Go Home
        </button>

        <button
          @click="goBack"
          class="w-full px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};

const goBack = () => {
  router.go(-1);
};
</script>
