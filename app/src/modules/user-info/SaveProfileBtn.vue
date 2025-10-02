<template>
  <button
    type="button"
    :disabled="isSaving"
    @click="handleSave"
    class="bg-black text-white px-4 py-2 pb-2.5 hover:bg-indigo-500 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200"
  >
    <span
      v-if="isSaving"
      class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
    ></span>
    {{ isSaving ? "Saving..." : "Save Information" }}
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../../stores/useUserStore";
import { toast } from "vue3-toastify";
import ResumeApi from "@/api-factory/resume";
import { useDataManager } from "../../composables/useDataManager";
import {
  validatePayloadSize,
  PAYLOAD_SIZE_LIMITS,
} from "../../helper/common.helper";

const { syncData } = useDataManager();

const props = defineProps<{
  userInfo: any; // Type this properly based on your UserInfo interface
}>();

const userStore = useUserStore();
const isSaving = ref(false);

async function handleSave() {
  if (isSaving.value) return;

  // Validate payload size before making API call
  const validation = validatePayloadSize(
    props.userInfo,
    PAYLOAD_SIZE_LIMITS.USER_PROFILE
  );
  if (!validation.isValid) {
    toast.error(validation.error);
    return;
  }

  try {
    isSaving.value = true;
    await ResumeApi.saveUserProfile(props.userInfo);
    userStore.setUserInfo(props.userInfo);
    toast.success("Profile saved successfully!");
    await syncData(true);
  } catch (error: any) {
    // Check if it's a content too long error from backend
    if (
      error?.response?.status === 413 ||
      error?.response?.data?.message?.includes("too large")
    ) {
      // Use backend error message if available (includes character count)
      const backendMessage = error?.response?.data?.message;
      toast.error(
        backendMessage ||
          "Profile data is too large. Please reduce the amount of information and try again."
      );
    } else {
      toast.error("Failed to save profile. Please try again.");
    }
    console.error("Failed to save profile:", error);
  } finally {
    isSaving.value = false;
  }
}
</script>
