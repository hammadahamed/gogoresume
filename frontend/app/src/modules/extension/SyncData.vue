<template>
  <div class="p-3 pb-4 border border-gray-200 rounded-l">
    <div class="flex items-center justify-between px-2 gap-20">
      <div>
        <h6 class="text-md font-semibold text-gray-900 mb-1">
          Sync Suggestions
        </h6>
        <p class="text-sm text-gray-500">
          Update your Smart Suggestions. The Smart Suggestions are curated from
          your master profile. Please complete your master profile to get the
          Smart Suggestions.
        </p>
      </div>

      <div>
        <button
          @click="syncData"
          class="flex gap-2 justify-center items-center text-sm font-semibold border border-black text-black px-4 py-2 rounded-lg whitespace-nowrap hover:bg-gray-100 transition-all duration-200"
          :class="{ 'scale-150 mr-10': loading }"
        >
          <p>Sync now</p>
          <SYNC_ICON
            class="w-5 h-5 mt-[2px]"
            :class="{ 'custom-spin': loading }"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SYNC_ICON from "@/assets/svg/sync.svg";
import { ref, computed, onMounted } from "vue";
import { toast } from "vue3-toastify";
import GGRWindowEvents from "@/utils/windowEvents";
import { useUserStore } from "@/stores/useUserStore";
import { useDataManager } from "@/composables/useDataManager";
import { useRoute } from "vue-router";
import { getSuggestions } from "@/utils/suggestions";

const loading = ref(false);
const userStore = useUserStore();
const { getUserProfile } = useDataManager();
const route = useRoute();

const syncData = async () => {
  loading.value = true;
  setTimeout(async () => {
    try {
      if (!userStore.userInfo) {
        await getUserProfile();
      }
      const suggestions = getSuggestions();
      console.log("🚀 ~ syncData ~ suggestions:", suggestions);

      const clonedUserInfo = JSON.parse(JSON.stringify(suggestions));
      const synced = await GGRWindowEvents.saveUserInfo(clonedUserInfo);
      if (synced) {
        toast.success("Data synced successfully");
      } else {
        toast.error("Failed to sync data");
      }
    } catch (error) {
      console.error("Failed to sync data:", error);
      toast.error("Failed to sync data");
    } finally {
      loading.value = false;
    }
  }, 1000);
};

const autoSync = computed(() => {
  return route.query.autoSync === "true";
});

onMounted(() => {
  if (autoSync.value) {
    setTimeout(() => {
      syncData();
    }, 500);
  }
});
</script>

<style scoped>
.custom-spin {
  animation: spin 0.8s linear infinite;
  transform-origin: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
