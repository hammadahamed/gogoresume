<template>
  <div class="h-screen flex flex-col">
    <!-- Top Bar -->
    <CreateResumeTopBar
      v-model="selectedTemplate"
      :resume-id="resumeId"
      @template-change="handleTemplateChange"
    />

    <!-- Main Content -->
    <div class="resume-builder-container flex-1">
      <div class="controls-section">
        <!-- Embed the actual UserInfo component -->
        <div class="user-info-section">
          <UserInfo />
        </div>
      </div>

      <!-- React PDF Builder -->
      <div class="pdf-section flex justify-center items-center">
        <ReactResumeBuilder
          :key="`${selectedTemplate}-${resumeId || 'new'}`"
          :userData="userInfo"
          :templateId="selectedTemplate"
          :hideDownloadButton="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import ReactResumeBuilder from "../../ReactResumeBuilder.vue";
import UserInfo from "../user-info/UserInfo.vue";
import CreateResumeTopBar from "./CreateResumeTopBar.vue";
import { useUserInfoManager } from "../../composables/useUserInfoManager";
import resumeApi from "../../api-factory/resume";
import { toast } from "vue3-toastify";

const route = useRoute();
const router = useRouter();
const { userInfo, getUserProfile } = useUserInfoManager();

// Get parameters from route
const resumeId = computed(() => route.query.resumeId as string | undefined);
const selectedTemplate = ref((route.query.template as string) || "classic");

// Handle template changes
const handleTemplateChange = (template: string) => {
  console.log("Template changed to:", template);
  selectedTemplate.value = template;

  // Update route query to reflect the change
  router.replace({
    query: {
      ...route.query,
      template: template,
    },
  });
};

// Load resume data if editing
const loadResumeData = async () => {
  if (!resumeId.value) return;

  try {
    const response = await resumeApi.getResumeById(resumeId.value);
    if (response.data && response.data.data) {
      // Load the resume data into userInfo
      Object.assign(userInfo.value || {}, response.data.data);

      // Update template if specified
      if (response.data.templateId) {
        selectedTemplate.value = response.data.templateId;
      }
    }
  } catch (error: any) {
    console.error("Error loading resume:", error);
    toast.error("Failed to load resume data");
    // Redirect to saved resumes on error
    router.push("/saved-resumes");
  }
};

// Watch for route changes
watch(
  () => route.query.template,
  (newTemplate) => {
    if (newTemplate && typeof newTemplate === "string") {
      selectedTemplate.value = newTemplate;
    }
  }
);

watch(
  () => route.query.resumeId,
  (newResumeId) => {
    if (newResumeId) {
      loadResumeData();
    }
  }
);

// Watch for template changes to debug
watch(
  () => selectedTemplate.value,
  (newTemplate, oldTemplate) => {
    console.log(
      "ResumeBuilder: Template changed from",
      oldTemplate,
      "to",
      newTemplate
    );
  }
);

// Initialize component
onMounted(async () => {
  // Load user profile first
  await getUserProfile();

  // Then load resume data if editing
  if (resumeId.value) {
    await loadResumeData();
  }
});
</script>

<style scoped lang="scss">
.resume-builder-container {
  display: flex;
  gap: 2rem;
  margin: 0 80px 0 50px;
  height: 100%;
  overflow: hidden;
  margin-top: -10px;
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
