<template>
  <div class="h-full overflow-auto">
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between gap-12"
    >
      <!-- Header -->
      <div class="mb-8 max-w-3xl">
        <p class="text-3xl font-bold text-gray-900">Saved Resumes</p>
        <p class="mt-2 text-gray-600">
          Create and save multiple versions of your resume for
          <span class="font-semibold squiggly-underlin bg-highlight w-max"
            >different job roles</span
          >
          with
          <span class="font-semibold squiggly-underlin">different context</span>
          to quickly pull and tweak later.
        </p>
      </div>

      <!-- Create New Resume Button -->
      <button
        class="w-max h-max whitespace-nowrap cursor-pointer bg-black text-white px-4 py-2 pb-2.5 hover:bg-indigo-500 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200"
        @click="handleCreateNewResume"
      >
        Create New Resume
      </button>
    </div>
    <!-- Empty State (if no resumes) -->

    <div class="text-center py-12 flex flex-col items-center justify-center">
      <div
        class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center"
      >
        <span class="text-4xl">📄</span>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">No resumes yet</h3>
      <p class="text-gray-600 mb-6">Create your first resume to get started.</p>
      <button
        class="w-max h-max whitespace-nowrap cursor-pointer bg-black text-white px-4 py-2 pb-2.5 hover:bg-indigo-500 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200"
        @click="handleCreateNewResume"
      >
        Create Your First Resume
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

// SavedResumes component

const router = useRouter();

const handleCreateNewResume = () => {
  router.push("/resume-builder");
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
