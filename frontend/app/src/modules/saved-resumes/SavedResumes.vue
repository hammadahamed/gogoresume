<template>
  <div class="h-full overflow-auto">
    <!-- Header -->
    <div class="">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-2xl font-bold text-gray-900">Saved Resumes</p>
            <p class="mt-2 text-gray-600">
              Create and save multiple versions of your resume for
              <span class="squiggly-underline">different job roles</span>
              and contexts to quickly pull and tweak later.
            </p>
          </div>
          <button
            v-if="resumes.length"
            @click="handleCreateNewResume"
            class="primary-btn-2"
          >
            Create New Resume
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <Spinner class="w-8 h-8" />
        <span class="ml-3 text-gray-600">Loading your resumes...</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="!resumes.length" class="text-center py-16 mt-16">
        <div
          class="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center"
        >
          <BOX_ICON class="w-12 h-12" />
        </div>
        <p class="font-medium text-gray-900 mb-4">No resume created yet</p>
        <button @click="handleCreateNewResume" class="secondary-btn-2">
          Create Your First Resume
        </button>
      </div>

      <!-- Resumes Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResumeListItem
          v-for="resume in resumes"
          :key="resume.id"
          :resume="resume"
          :is-duplicating="duplicatingId === resume.id"
          @edit="editResume"
          @duplicate="duplicateResume"
          @delete="deleteResume"
          @use-for-tweak="useForTweak"
        />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :showModal="deleteConfirmModal"
      :type="ConfirmModalTypes.DELETE"
      heading="Delete Resume"
      goodText="Delete"
      badText="Cancel"
      :processing="deleteLoading"
      @goodClick="confirmDeleteResume"
      @badClick="cancelDelete"
    >
      <p class="text-gray-700 text-sm">
        Are you sure you want to delete "<span class="font-semibold">{{
          resumeToDelete?.name
        }}</span
        >"?
      </p>
      <p class="text-gray-600 text-sm mt-2">This action cannot be undone.</p>
    </ConfirmModal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import Spinner from "../../common/components/Spinner.vue";
import ConfirmModal from "../../common/components/ConfirmModal.vue";
import ResumeListItem, { type SavedResume } from "./ResumeListItem.vue";
import { ConfirmModalTypes } from "../../constants/componentConstants";
import resumeApi from "../../api-factory/resume";
import BOX_ICON from "@/assets/svg/box.svg";

const router = useRouter();

// Component state
const loading = ref(true);
const resumes = ref<SavedResume[]>([]);

// Delete confirmation state
const deleteConfirmModal = ref({ show: false });
const deleteLoading = ref(false);
const resumeToDelete = ref<SavedResume | null>(null);

// Duplicate loading state
const duplicatingId = ref<string | null>(null);

// Methods
const handleCreateNewResume = () => {
  router.push("/resume-builder");
};

const editResume = (resumeId: string) => {
  router.push({
    path: "/resume-builder",
    query: { resumeId },
  });
};

const useForTweak = (resumeId: string) => {
  router.push({
    path: "/resume-tweaker",
    query: { resumeId },
  });
};

const duplicateResume = async (resume: SavedResume) => {
  duplicatingId.value = resume.id; // Set loading state for this specific resume

  try {
    // First get the full resume data
    const response = await resumeApi.getResumeById(resume.id);
    if (response.data) {
      // Save as new resume with "Copy of" prefix
      await resumeApi.saveResume(
        `Copy of ${resume.name}`,
        response.data.data,
        resume.templateId
      );

      toast.success("Resume duplicated successfully!");
      await loadResumes(); // Refresh the list
    }
  } catch (error: any) {
    console.error("Error duplicating resume:", error);
    toast.error("Failed to duplicate resume");
  } finally {
    duplicatingId.value = null; // Clear loading state
  }
};

const deleteResume = (resumeId: string, resumeName: string) => {
  // Find the resume object to store for modal display
  const resume = resumes.value.find((r) => r.id === resumeId);
  if (!resume) return;

  resumeToDelete.value = resume;
  deleteConfirmModal.value.show = true;
};

const confirmDeleteResume = async () => {
  if (!resumeToDelete.value) return;

  deleteLoading.value = true;
  const resumeIdToDelete = resumeToDelete.value.id;

  try {
    await resumeApi.deleteResume(resumeIdToDelete);

    // Remove the item from local list instead of reloading
    resumes.value = resumes.value.filter(
      (resume) => resume.id !== resumeIdToDelete
    );

    toast.success("Resume deleted successfully!");
    deleteConfirmModal.value.show = false;
    resumeToDelete.value = null;
  } catch (error: any) {
    console.error("Error deleting resume:", error);
    toast.error("Failed to delete resume");
  } finally {
    deleteLoading.value = false;
  }
};

const cancelDelete = () => {
  deleteConfirmModal.value.show = false;
  resumeToDelete.value = null;
  deleteLoading.value = false;
};

const loadResumes = async () => {
  loading.value = true;
  try {
    const response = await resumeApi.getSavedResumes();
    resumes.value = response.data || [];
  } catch (error: any) {
    console.error("Error loading resumes:", error);
    toast.error("Failed to load resumes");
    resumes.value = [];
  } finally {
    loading.value = false;
  }
};

// Initialize component
onMounted(async () => {
  await loadResumes();
});
</script>

<style scoped>
/* Additional styles if needed */
</style>
