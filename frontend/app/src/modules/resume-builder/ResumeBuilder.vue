<template>
  <div class="resume-builder-container">
    <div class="controls-section">
      <!-- Template Selector -->
      <div class="template-selector-section mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold mb-3">Template</h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="template in availableTemplates"
            :key="template.id"
            @click="selectedTemplate = template.id"
            :class="[
              'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              selectedTemplate === template.id
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200',
            ]"
          >
            {{ template.name }}
          </button>
        </div>
      </div>

      <!-- Embed the actual UserInfo component -->
      <div class="user-info-section">
        <UserInfo />
      </div>
    </div>

    <!-- React PDF Builder -->
    <div class="pdf-section flex justify-center items-center">
      <ReactResumeBuilder :userData="userInfo" :templateId="selectedTemplate" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import ReactResumeBuilder from "../../ReactResumeBuilder.vue";
import UserInfo from "../user-info/UserInfo.vue";
import { useUserInfoManager } from "../../composables/useUserInfoManager";
import { getAllTemplates } from "../../a-app-react/templates/TemplateManager.jsx";

const route = useRoute();
const { userInfo, getUserProfile } = useUserInfoManager();

// Get available templates
const availableTemplates = ref(getAllTemplates());

// Get template from query parameter, default to 'classic'
const selectedTemplate = ref((route.query.template as string) || "classic");

// Watch for route changes to update template
watch(
  () => route.query.template,
  (newTemplate) => {
    if (newTemplate && typeof newTemplate === "string") {
      selectedTemplate.value = newTemplate;
    }
  }
);

// Load user profile data on mount
onMounted(async () => {
  await getUserProfile();
});
</script>

<style scoped lang="scss">
.resume-builder-container {
  display: flex;
  gap: 2rem;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;
  max-width: 1200px;
}

.controls-section {
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
}

.pdf-section {
  width: 50%;
  overflow-y: auto;

  > * {
    width: 100%;
    max-width: 500px; // Reasonable max width for A4
    aspect-ratio: 1 / 1.2; // A4 aspect ratio (width:height = 1:√2)
    border-radius: 8px;
  }
}

.user-info-section {
  :deep(form) {
    width: 100% !important;
    max-width: none !important;
    padding-top: 0 !important;
  }
}
</style>
