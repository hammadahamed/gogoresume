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
      <div class="mt-30 flex flex-wrap gap-x-40 gap-y-20 justify-center">
        <div
          v-for="(template, index) in templates"
          :key="template.id"
          @click="selectTemplate(template)"
          class="w-[380px] overflow-hidden"
          style="aspect-ratio: 1 / 1.4"
        >
          <!-- Preview Container -->
          <ReactResumeBuilder
            :key="`${selectedTemplate}-${resumeId || 'new'}`"
            :userData="sampleUserData"
            :builderMode="true"
            :templateId="template.id"
            :hideDownloadButton="true"
          />
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
  console.log("Selected template:", template);
  // Navigate to resume builder with selected template
  router.push({
    path: "/resume-builder",
    query: { template: template.id },
  });
};

onMounted(() => {
  console.log("Available templates:", templates.value);
});
</script>

<style scoped>
/* Additional styles if needed */

a {
  color: white;
}
</style>
