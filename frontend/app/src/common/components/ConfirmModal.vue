<template>
  <Modal v-model:show="showModal.show" modal-class="w-full max-w-md">
    <div class="p-6">
      <!-- Header -->
      <div
        class="flex items-center gap-3 mb-4"
        :class="{ '-translate-x-1.5': type }"
      >
        <div
          v-if="type"
          class="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          :style="{
            background: typeColor[type].bg,
            color: typeColor[type].color,
            stroke: `${typeColor[type].color} !important`,
            fill: `${typeColor[type].color} !important`,
          }"
        >
          <component :is="typeColor[type].icon" class="w-3.5 h-3.5" />
        </div>
        <h2 v-if="heading" class="text-sm font-semibold text-gray-900">
          {{ heading }}
        </h2>
      </div>

      <!-- Content -->
      <div class="mb-6">
        <slot></slot>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3">
        <button
          v-if="badText"
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          @click="emit('badClick')"
        >
          {{ badText }}
        </button>

        <button
          v-if="goodText"
          type="button"
          :disabled="processing"
          class="inline-flex items-center gap-4 px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
          :class="[
            processing ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90',
            type === ConfirmModalTypes.DELETE
              ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
              : 'bg-gray-900 hover:bg-gray-800 focus:ring-gray-500',
            goodBtnClass,
          ]"
          @click="emit('goodClick')"
        >
          <Spinner v-if="processing" size="16px" />
          {{ processing ? "Processing..." : goodText }}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "./Modal.vue";
import { ConfirmModalTypes } from "@/constants/componentConstants";
import { PropType } from "vue";
import DELETE from "@/assets/svg/delete.svg";
import INFO from "@/assets/svg/info.svg";
import WARNING from "@/assets/svg/warning.svg";
import CANCEL from "@/assets/svg/cancel.svg";
import Spinner from "./Spinner.vue";

const emit = defineEmits(["goodClick", "badClick"]);

const props = defineProps({
  showModal: {
    type: Object,
    required: true,
  },
  heading: {
    type: String,
  },
  goodText: {
    type: String,
  },
  badText: {
    type: String,
  },
  type: { type: String as PropType<ConfirmModalTypes> },
  goodBtnClass: { type: String },
  processing: {
    type: Boolean,
  },
});

const typeColor = {
  [ConfirmModalTypes.INFO]: {
    bg: "#eaf0ffa8",
    color: "rgba(100, 151, 221, 0.8)",
    icon: INFO,
  },
  [ConfirmModalTypes.WARNING]: {
    bg: "#fff3de",
    color: "orange",
    icon: WARNING,
  },
  [ConfirmModalTypes.ERROR]: { bg: "#ffe6e6", color: "#de4c4c", icon: CANCEL },
  [ConfirmModalTypes.DELETE]: { bg: "#ffe6e6", color: "#de4c4c", icon: DELETE },
};
</script>
