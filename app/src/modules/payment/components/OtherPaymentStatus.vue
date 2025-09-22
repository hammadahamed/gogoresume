<template>
  <div class="space-y-5">
    <div class="text-6xl mb-5">
      <div
        class="w-20 h-20 mx-auto animate-scale-in bg-orange-100 rounded-full flex items-center justify-center"
      >
        <div class="text-4xl">⏳</div>
      </div>
    </div>
    <h2 class="text-2xl font-semibold text-gray-800 mt-5 mb-2">
      Payment Status <br />
    </h2>
    <p
      class="bg-gray-100/50 text-amber-600 border-2 border-orange-200 px-2 py-1 rounded-lg text- font-medium w-min whitespace-nowrap mx-auto"
    >
      {{ formatStatus(props.data.status) }}
    </p>

    <!-- Payment details -->
    <div class="bg-gray-50 rounded-lg p-5 my-5 text-left space-y-2">
      <p class="text-gray-800 text-sm">
        <span class="font-semibold">Status:</span>
        {{ props.data.status }}
      </p>
      <p v-if="props.data.providerPaymentId" class="text-gray-800 text-sm">
        <span class="font-semibold">Payment ID:</span>
        {{ props.data.providerPaymentId }}
      </p>
      <p v-if="props.data.failedReason" class="text-gray-800 text-sm">
        <span class="font-semibold">Reason:</span>
        {{ props.data.failedReason }}
      </p>
      <p v-if="props.data.errorCode" class="text-gray-800 text-sm">
        <span class="font-semibold">Error Code:</span>
        {{ props.data.errorCode }}
      </p>
      <p
        v-if="!props.data.failedReason && !props.data.errorCode"
        class="text-gray-800 text-sm"
      >
        <span class="font-semibold">Details:</span>
        No additional details available
      </p>
    </div>

    <div class="flex flex-col sm:flex-row gap-3 justify-center mt-7">
      <button
        class="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-all duration-300 cursor-pointer border-none"
        @click="$emit('goToSettings')"
      >
        Back to Settings
      </button>
      <button
        class="bg-black text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-black/80 transition-all duration-300 cursor-pointer border-none"
        @click="$emit('retryVerification')"
      >
        Check Status Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits("goToSettings", "retryVerification");
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
function formatStatus(status: string): string {
  return status
    ?.split("_")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
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
