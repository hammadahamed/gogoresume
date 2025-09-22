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
      <PaymentSuccess
        v-else-if="verificationSuccess"
        :purchaseData="purchaseData"
        :planDetails="planDetails"
        @goToWorkspace="goToWorkspace"
      />

      <!-- Error/Failure State -->
      <PaymentFailure
        v-else-if="isPaymentFailure"
        :errorMessage="errorMessage"
        :isPaymentFailure="isPaymentFailure"
        :failureData="paymentFailureData"
        @goToPricing="goToPricing"
        @retryVerification="retryVerification"
      />
      <OtherPaymentStatus
        v-else-if="unsuccessfulData"
        :data="unsuccessfulData"
        @goToSettings="goToSettings"
        @retryVerification="retryVerification"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PaymentApi from "@/api-factory/payment";
import Spinner from "@/common/components/Spinner.vue";
import { toast } from "vue3-toastify";
import { plans } from "@/modules/pricing/pricing";
import AuthApi from "@/api-factory/auth";
import PaymentSuccess from "./components/PaymentSuccess.vue";
import PaymentFailure from "./components/PaymentFailure.vue";
import OtherPaymentStatus from "./components/OtherPaymentStatus.vue";
import { scrollToSection } from "@/helper/ui.helper";

const route = useRoute();
const router = useRouter();

const isVerifying = ref(true);
const verificationSuccess = ref(false);
const errorMessage = ref("");
const purchaseData = ref<any>(null);
const planDetails = ref<any>(null);
const isPaymentFailure = ref(false);
const paymentFailureData = ref<any>(null);
const unsuccessfulData = ref(false);

enum PaymentStatus {
  SUCCESS = "succeeded",
  FAILURE = "failed",
}

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

    if (!paymentId) {
      throw new Error("Missing payment ID in URL");
    }

    // Verify the purchase using payment_id
    const verificationResult = await PaymentApi.verifyPurchase(paymentId);

    if (
      verificationResult.success &&
      verificationResult.payment.status === PaymentStatus.SUCCESS
    ) {
      purchaseData.value = verificationResult.payment;
      planDetails.value = plans.find(
        (plan) => plan.id === verificationResult.payment.internalPlanId
      );
      verificationSuccess.value = true;

      toast.success("Payment verified successfully!");
      await AuthApi.refreshToken();
    } else {
      if (
        verificationResult.status === PaymentStatus.FAILURE &&
        verificationResult.providerPaymentId
      ) {
        // Payment itself failed
        isPaymentFailure.value = true;
        paymentFailureData.value = verificationResult;
        errorMessage.value =
          verificationResult.failedReason || "Your payment was declined";
        // toast.error("Payment failed: " + errorMessage.value);
      } else {
        // Verification failed
        unsuccessfulData.value = verificationResult;
      }
    }
  } catch (error: any) {
    console.error("Payment verification error:", error);

    // Only update error message if it wasn't already set by payment failure handling
    if (!isPaymentFailure.value) {
      errorMessage.value =
        error.response?.data?.message ||
        error.message ||
        "Failed to verify payment";
    }

    verificationSuccess.value = false;
  } finally {
    isVerifying.value = false;
  }
}

function goToWorkspace() {
  router.push("/home");
}

function goToPricing() {
  router.push("/");
  setTimeout(() => {
    scrollToSection("pricing");
  }, 100);
}

function goToSettings() {
  router.push("/settings");
}

function retryVerification() {
  verifyPayment();
}
</script>
