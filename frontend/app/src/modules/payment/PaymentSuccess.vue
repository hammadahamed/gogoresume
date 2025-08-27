<template>
  <div class="min-h-screen w-screen flex items-center justify-center p-5">
    <div
      class="bg-white rounded-2xl p-8 sm:p-10 max-w-lg w-full text-center shadow-lg border border-gray-200"
    >
      <!-- Verifying State -->
      <div v-if="isVerifying" class="space-y-5">
        <Spinner borderWidth="3px" />
        <h2 class="text-2xl font-semibold text-gray-800 mt-5 mb-2">
          Verifying your payment...
        </h2>
        <p class="text-gray-600 text-base leading-relaxed mb-5">
          Please wait while we confirm your purchase.
        </p>
      </div>

      <!-- Success State -->
      <div v-else-if="verificationSuccess" class="space-y-5">
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
            @click="goToWorkspace"
          >
            Go to Dashboard
          </button>
        </div>
      </div>

      <!-- Error State -->
      <div v-else class="space-y-5">
        <div class="text-6xl mb-5">
          <ERROR_ICON class="w-20 h-20 mx-auto animate-scale-in" />
        </div>
        <h2 class="text-2xl font-semibold text-gray-800 mt-5 mb-2">
          Payment Verification Failed
        </h2>
        <p class="text-gray-600 text-base leading-relaxed mb-5">
          {{ errorMessage }}
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center mt-7">
          <button
            class="bg-gray-100 text-gray-800 px-6 py-3 rounded-sm font-semibold text-sm hover:bg-gray-200 transition-all duration-300 cursor-pointer border-none"
            @click="goToPricing"
          >
            Back to Pricing
          </button>
          <button
            class="bg-indigo-500 text-white px-6 py-3 rounded-sm font-semibold text-sm hover:bg-indigo-600 transition-all duration-300 cursor-pointer border-none"
            @click="retryVerification"
          >
            Retry Verification
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PaymentApi from "@/api-factory/payment";
import Spinner from "@/common/components/Spinner.vue";
import { toast } from "vue3-toastify";
import SUCCESS_ICON from "@/assets/svg/success.svg";
import ERROR_ICON from "@/assets/svg/failed.svg";
import { plans } from "@/modules/pricing/pricing";
import AuthApi from "@/api-factory/auth";

const route = useRoute();
const router = useRouter();

const isVerifying = ref(true);
const verificationSuccess = ref(false);
const errorMessage = ref("");
const purchaseData = ref<any>(null);
const planDetails = ref<any>(null);

onMounted(async () => {
  await verifyPayment();
});

async function verifyPayment() {
  try {
    isVerifying.value = true;
    verificationSuccess.value = false;
    errorMessage.value = "";

    // Get payment_id from URL for verification
    const paymentId = route.query.payment_id as string;

    console.log("Payment verification debug info:", {
      paymentId,
      fullQuery: route.query,
      currentUrl: window.location.href,
    });

    if (!paymentId) {
      throw new Error("Missing payment ID in URL");
    }

    // Verify the purchase using payment_id
    console.log("Calling PaymentApi.verifyPurchase with:", { paymentId });
    const verificationResult = await PaymentApi.verifyPurchase(paymentId);

    if (
      verificationResult.success &&
      verificationResult.payment.status === "succeeded"
    ) {
      purchaseData.value = verificationResult.payment;
      planDetails.value = plans.find(
        (plan) => plan.id === verificationResult.payment.internalPlanId
      );
      verificationSuccess.value = true;

      toast.success("Payment verified successfully!");
      await AuthApi.refreshToken();
    } else {
      const errorMessage =
        verificationResult.error || "Payment verification failed";

      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error: any) {
    console.error("Payment verification error:", error);
    errorMessage.value =
      error.response?.data?.message ||
      error.message ||
      "Failed to verify payment";
    verificationSuccess.value = false;
  } finally {
    isVerifying.value = false;
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function goToWorkspace() {
  router.push("/home");
}

function goToPricing() {
  router.push("/");
}

function retryVerification() {
  verifyPayment();
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
