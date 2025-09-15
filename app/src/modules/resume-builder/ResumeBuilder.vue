<template>
  <div v-if="loading" class="h-screen flex items-center justify-center gap-4">
    <Spinner />
    <p>Initializing Resume Data...</p>
  </div>
  <div v-else class="h-screen flex flex-col">
    <!-- Top Bar -->
    <CreateResumeTopBar
      v-model="selectedTemplate"
      :resume-id="resumeId"
      :resume-data="resumeData"
      @template-change="handleTemplateChange"
    />

    <!-- Main Content -->
    <div class="resume-builder-container flex-1">
      <div class="controls-section">
        <!-- Embed the actual UserInfo component -->
        <div class="user-info-section">
          <UserInfoComponent />
        </div>
      </div>

      <!-- React PDF Builder -->
      <div class="pdf-section flex justify-center items-center">
        <ReactResumeBuilder
          :key="`${selectedTemplate}-${resumeId || 'new'}`"
          :userData="currentResume"
          :builderMode="true"
          :templateId="selectedTemplate"
          :hideDownloadButton="true"
        />
      </div>
    </div>

    <!-- Master Profile Modal -->
    <PrePopulateConfirmModal
      :show="showMasterProfileModal"
      @populate-from-master="handlePopulateFromMaster"
      @start-fresh="handleStartFresh"
      @close="handleStartFresh"
      @update:show="showMasterProfileModal = $event"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ReactResumeBuilder from "../../ReactResumeBuilder.vue";
import UserInfoComponent from "../user-info/UserInfo.vue";
import CreateResumeTopBar from "./CreateResumeTopBar.vue";
import PrePopulateConfirmModal from "./PrePopulateConfirmModal.vue";
import { useDataManager } from "../../composables/useDataManager";
import resumeApi from "../../api-factory/resume";
import { toast } from "vue3-toastify";
import { UserInfo } from "@/types/resume.types";
import Spinner from "@/common/components/Spinner.vue";
import { useUserStore } from "@/stores/useUserStore";

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const { getUserProfile, currentResume, setEmptyCurrentResume, hasUserData } =
  useDataManager();
const userStore = useUserStore();
const resumeData = ref<UserInfo | null>(null);
const showMasterProfileModal = ref(false);

// Get parameters from route
const resumeId = computed(() => route.query.resumeId as string | undefined);
const selectedTemplate = ref("classic");

// Handle template changes
const handleTemplateChange = (template: string) => {
  selectedTemplate.value = template;

  // Update route query to reflect the change
  router.replace({
    query: {
      ...route.query,
      template: template,
    },
  });
};

// Handle modal actions
const handlePopulateFromMaster = async () => {
  showMasterProfileModal.value = false;
  try {
    await getUserProfile();
    userStore.setCurrentResume(userStore.userInfo);
    resumeData.value = { data: userStore.userInfo };
    toast.success("Populated from master profile");
  } catch (error) {
    console.error("Error loading master profile:", error);
    toast.error("Failed to load master profile");
    handleStartFresh();
  }
};

const handleStartFresh = () => {
  showMasterProfileModal.value = false;
};

// Load resume data if editing
const loadResumeData = async () => {
  loading.value = true;
  if (!resumeId.value) return;

  try {
    const response = await resumeApi.getResumeById(resumeId.value);
    if (response.data && response.data) {
      resumeData.value = response.data;
      userStore.setCurrentResume(response.data.data);

      if (response.data.templateId) {
        selectedTemplate.value = response.data.templateId;
      }
    }
  } catch (error: any) {
    console.error("Error loading resume:", error);
    toast.error("Failed to load resume data");
    // Redirect to saved resumes on error
    router.push("/saved-resumes");
  } finally {
    loading.value = false;
  }
};

const initTemplate = () => {
  if (route.query.template) {
    selectedTemplate.value = route.query.template as string;
  }
};

// Initialize component
onMounted(async () => {
  try {
    loading.value = true;
    initTemplate();

    if (resumeId.value) {
      await loadResumeData();
    } else {
      setEmptyCurrentResume();
      setTimeout(() => {
        showMasterProfileModal.value = true;
      }, 1000);
    }
  } catch (error) {
    console.error("Error initializing resume data:", error);
    toast.error("Failed to initialize resume data");
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  userStore.clearCurrentResume();
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
