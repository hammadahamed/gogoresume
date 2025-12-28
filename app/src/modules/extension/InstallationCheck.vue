<template>
  <div>
    <div class="p-6 border border-gray-200 rounded-lg">
      <div class="text-center">
        <PUZZLE_ICON class="w-40 h-40 mx-auto mb-4 opacity-90" />
        <div
          v-if="!extensionInstalled"
          class="flex items-center justify-center gap-3 flex-col-reverse sm:flex-row"
        >
          <div class="text-lg font-medium text-gray-900 mb-2">
            {{ loading ? "Checking ..." : "Chrome Extension Not Detected" }}
          </div>

          <div
            v-if="!loading"
            class="w-7 h-7 p-1 bg-red-200/30 rounded-full flex items-center justify-center -mt-2"
          >
            <CANCEL class="w-5 h-5 stroke-red-500 stroke-2" />
          </div>
        </div>
        <div
          v-if="extensionInstalled"
          class="flex items-center justify-center gap-3"
        >
          <div class="text-lg font-medium text-gray-900 mb-2">
            Chrome Extension Installed
          </div>

          <div
            class="zoom-revealer w-7 h-7 p-1 bg-green-200/30 border border-teal-600 rounded-full flex items-center justify-center -mt-2"
          >
            <TICK class="w-4 h-4 fill-teal-500" />
          </div>
        </div>

        <Spinner v-if="loading" />

        <p
          v-if="!loading && !extensionInstalled"
          class="text-sm text-gray-500 mb-6"
        >
          Install the GoGoResume Chrome Extension to apply for jobs directly
          from job boards with AI-powered resume tweaking.
        </p>

        <div
          v-if="!loading && !extensionInstalled"
          class="flex gap-5 px-10 flex-col sm:flex-row"
        >
          <button
            class="w-full bg-black text-sm text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-all duration-200"
            @click="installExtension"
          >
            Install Chrome Extension
          </button>

          <button
            class="w-full border border-gray-300 text-sm text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
            @click="recheckInstallation"
          >
            I've Installed It - Check Again
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import GGRWindowEvents from "@/utils/windowEvents";
import PUZZLE_ICON from "@/assets/illustrations/puzzle.svg";
import Spinner from "@/common/components/Spinner.vue";
import CANCEL from "@/assets/svg/cancel.svg";
import TICK from "@/assets/svg/tick.svg";
import { openExtensionPage } from "@/helper/ui.helper";
// Emits
const emit = defineEmits<{
  extensionInstalled: boolean;
}>();

const extensionInstalled = ref(false);

const loading = ref(true);

const checkExtensionInstalled = async () => {
  try {
    loading.value = true;
    const installed = await GGRWindowEvents.checkExtensionInstalled();

    if (installed) {
      extensionInstalled.value = true;
      emit("extensionInstalled", true);
    } else {
      emit("extensionInstalled", false);
    }
  } catch (error) {
    console.error("Error checking extension installed:", error);
  } finally {
    loading.value = false;
  }
};

const installExtension = () => {
  openExtensionPage();
};

const recheckInstallation = () => {
  window.location.reload();
};

onMounted(() => {
  checkExtensionInstalled();
});
</script>
