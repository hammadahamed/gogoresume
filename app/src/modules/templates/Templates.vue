<template>
  <div class="h-full overflow-auto">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8 -mt-2">
        <p class="text-2xl font-bold text-gray-900">Resume Templates</p>
        <p class="mt-2 text-gray-600">
          ATS doesn't care about how beautiful your resume is, it only cares
          about
          <span class="bg-highlight font-semibold">layout and content.</span>

          We've handpicked these templates that
          <span class="squiggly-underlin font-semibold"> really work.</span>
        </p>
      </div>

      <!-- Templates Grid -->
      <div
        class="mt-0 mb-10 lg:mb-0 lg:mt-30 flex flex-wrap gap-6 sm:gap-10 lg:gap-x-40 lg:gap-y-20 justify-center"
      >
        <div
          v-for="(template, index) in templates"
          :key="template.id"
          class="w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px] relative group"
        >
          <!-- Hover overlay for desktop -->
          <div
            class="z-10 w-full h-[95%] bg-white/50 absolute top-0 left-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex"
          >
            <button
              @click="selectTemplate(template)"
              class="bg-black cursor-pointer text-white text-xs hover:scale-105 font-semibold px-4 py-2 rounded-full transform scale-95 group-hover:scale-100 transition-transform duration-200"
            >
              Use Template
            </button>
          </div>
          <!-- Preview Container -->
          <ReactResumeBuilder
            :key="index"
            :userData="sampleUserData"
            :builderMode="true"
            :templateId="template.id"
            :hideDownloadButton="true"
            style="aspect-ratio: 1 / 1.4"
            class="overflow-hidden z-0"
          />

          <p
            class="text text-center font-semibold text-gray-900 mt-3 lg:mt-[15px]"
          >
            {{ template.name }}
          </p>

          <!-- Mobile: Button below template -->
          <button
            @click="selectTemplate(template)"
            class="sm:hidden w-full mt-2 bg-black cursor-pointer text-white text-sm font-semibold px-4 py-2.5 rounded-full"
          >
            Use Template
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAllTemplates } from "../../a-app-react/templates/TemplateManager.jsx";
import { useSampleUserData } from "../../a-app-react/templates/sampleData";
import { useDataManager } from "../../composables/useDataManager";
import ReactResumeBuilder from "../../ReactResumeBuilder.vue";
import ReactResumeBuilder2 from "../../ReactResumeBuilder2.vue";

const router = useRouter();
const { userInfo, hasUserData } = useDataManager();

// Get templates from TemplateManager
const templates = ref(getAllTemplates());
const { sampleUserData } = useSampleUserData();

// Use actual user data if available, otherwise use sample data
const previewData = computed(() => {
  return sampleUserData;
});

const selectTemplate = (template: any) => {
  // Navigate to resume builder with selected template
  router.push({
    path: "/resume-builder",
    query: { template: template.id },
  });
};
</script>

<style scoped>
/* Additional styles if needed */

a {
  color: white;
}
</style>
../../a-app-react/templates/sampleData.js../../composables/useDataManager.js
