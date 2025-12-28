<template>
  <div
    class="p-3 pb-4 border border-gray-200 rounded-l"
    :class="syncing && autoSync ? 'border-transparent' : 'border-gray-200'"
  >
    <div
      class="flex items-center px-2 gap-10 sm:gap-20 flex-col sm:flex-row"
      :class="syncing && autoSync ? 'justify-center' : 'justify-between'"
    >
      <div v-if="autoSync && syncing ? false : true">
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
          @click="syncData()"
          class="flex gap-2 justify-center items-center text-sm font-semibold border border-black text-black px-4 py-2 rounded-lg whitespace-nowrap hover:bg-gray-100 transition-all duration-200"
          :class="{ 'scale-130': syncing && autoSync }"
        >
          <p>Sync now</p>
          <SYNC_ICON
            class="w-5 h-5 mt-[2px]"
            :class="{ 'custom-spin': syncing }"
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
import { useRoute, useRouter } from "vue-router";
import { getSuggestions } from "@/utils/suggestions";

const userStore = useUserStore();
const { getUserProfile, syncing, syncData } = useDataManager();
const route = useRoute();
const router = useRouter();

const autoSync = computed(() => {
  return route.query.autoSync === "true";
});

onMounted(async () => {
  if (autoSync.value) {
    setTimeout(() => {
      syncData();
    }, 200);
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
