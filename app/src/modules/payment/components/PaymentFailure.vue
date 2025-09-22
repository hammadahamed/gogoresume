<template>
  <div class="space-y-5">
    <div class="text-6xl mb-5">
      <ERROR_ICON class="w-20 h-20 mx-auto animate-scale-in" />
    </div>
    <h2 class="text-2xl font-semibold text-gray-800 mt-5 mb-2">
      {{ isPaymentFailure ? "Payment Failed" : "Payment Verification Failed" }}
    </h2>
    <p class="text-gray-600 text-base leading-relaxed mb-5">
      {{ errorMessage }}
    </p>

    <!-- Payment failure details -->
    <div
      v-if="isPaymentFailure && failureData"
      class="bg-red-50 rounded-lg p-5 my-5 text-left space-y-2"
    >
      <p class="text-gray-800 text-sm">
        <span class="font-semibold">Payment ID:</span>
        {{ failureData.providerPaymentId }}
      </p>
      <p class="text-gray-800 text-sm">
        <span class="font-semibold">Reason:</span>
        {{ failureData.failedReason }}
      </p>
      <p v-if="failureData.errorCode" class="text-gray-800 text-sm">
        <span class="font-semibold">Error Code:</span>
        {{ failureData.errorCode }}
      </p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 justify-center mt-7">
      <button
        class="bg-gray-100 text-gray-800 px-6 py-3 rounded-sm font-semibold text-sm hover:bg-gray-200 transition-all duration-300 cursor-pointer border-none"
        @click="$emit('goToPricing')"
      >
        Back to Pricing
      </button>
      <button
        v-if="!isPaymentFailure"
        class="bg-indigo-500 text-white px-6 py-3 rounded-sm font-semibold text-sm hover:bg-indigo-600 transition-all duration-300 cursor-pointer border-none"
        @click="$emit('retryVerification')"
      >
        Retry Verification
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ERROR_ICON from "@/assets/svg/failed.svg";

interface FailureData {
  success: false;
  status: string;
  providerPaymentId: string;
  reason: string;
  errorCode?: string;
}

interface Props {
  errorMessage: string;
  isPaymentFailure?: boolean;
  failureData?: FailureData | null;
}

defineProps<Props>();
defineEmits<{
  goToPricing: [];
  retryVerification: [];
}>();
</script>

<style scoped>
@keyframes scale-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scale-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
</style>
