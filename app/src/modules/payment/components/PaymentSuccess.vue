<template>
  <div class="space-y-5">
    <div class="text-6xl mb-5">
      <SUCCESS_ICON class="w-20 h-20 mx-auto animate-scale-in" />
    </div>
    <h2 class="text-2xl font-semibold text-gray-800 mt-5 mb-2">
      Payment Successful!
    </h2>
    <p class="text-gray-600 text-base leading-relaxed mb-5">
      Thank you for your purchase. Your {{ planDetails.name }} plan is now
      active.
    </p>
    <div class="bg-gray-50 rounded-lg p-5 my-5 text-left space-y-2">
      <p class="text-gray-800 text-sm">
        <span class="font-semibold">Plan:</span> {{ planDetails.name }}
      </p>
      <p class="text-gray-800 text-sm">
        <span class="font-semibold">Valid Until:</span>
        {{ formatDate(purchaseData.planEnd) }}
      </p>
      <p class="text-gray-800 text-sm">
        <span class="font-semibold">Amount:</span> ${{ planDetails.price }}
      </p>
    </div>
    <div class="flex justify-center mt-7">
      <button
        class="bg-indigo-500 text-white px-6 py-3 rounded-sm font-semibold text-sm hover:bg-indigo-600 transition-all duration-300 cursor-pointer border-none"
        @click="$emit('goToWorkspace')"
      >
        Go to Dashboard
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SUCCESS_ICON from "@/assets/svg/success.svg";

interface Props {
  purchaseData: any;
  planDetails: any;
}

defineProps<Props>();
defineEmits<{
  goToWorkspace: [];
}>();

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
