<template>
  <Modal
    :show="show"
    modal-class="max-w-[450px] h-[480px] rounded-xl"
    @close="handleClose"
    @update:show="$emit('update:show', $event)"
  >
    <div class="p-6 h-full mx-auto flex flex-col items-center justify-center">
      <FILLOUT_INFO class="w-[200px] h-[200px] mb-8 rounded-full" />
      <h3 class="text-lg font-semibold mb-2 text-center">
        Prefill Your Resume ?
      </h3>
      <p class="text-gray-600 mb-8 text-center text-base">
        Would you like to pre-populate your resume with data from your
        <span class="font-bold squiggly-underline">Master Profile</span> ?
      </p>
      <div
        class="flex gap-3 justify-center text-sm font-medium transition-all duration-200"
      >
        <button
          @click="handleStartFresh"
          class="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300/40 transition-colors"
        >
          Start Fresh
        </button>
        <button
          @click="handlePopulateFromMaster"
          class="px-6 py-2 bg-primary text-white rounded hover:opacity-90"
        >
          Yes, Pre-fill
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/common/components/Modal.vue";
import FILLOUT_INFO from "@/assets/illustrations/fillout_resume_info.svg";

interface Props {
  show: boolean;
}

interface Emits {
  (e: "update:show", value: boolean): void;
  (e: "populate-from-master"): void;
  (e: "start-fresh"): void;
  (e: "close"): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handlePopulateFromMaster = () => {
  emit("populate-from-master");
};

const handleStartFresh = () => {
  emit("start-fresh");
};

const handleClose = () => {
  emit("close");
};
</script>
