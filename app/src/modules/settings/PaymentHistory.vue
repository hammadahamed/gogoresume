<template>
  <div class="min-h-screen py-8 pb-32">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <p class="text-2xl font-bold text-gray-900">Payment History</p>
          <p class="text-gray-600 mt-2 w-[500px]">
            Recent payment transactions that require attention or have
            encountered issues. contact support if you need help.
          </p>
        </div>
        <button
          @click="goBack"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-150"
        >
          ← Back to Settings
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-16">
        <div class="text-center">
          <Spinner size="32px" />
          <p class="text-gray-600 text-sm mt-4">Loading payment history...</p>
        </div>
      </div>

      <!-- Payment Records -->
      <div v-else-if="paymentHistory.length > 0" class="space-y-4 mt-14">
        <div
          v-for="payment in paymentHistory"
          :key="payment.orderId"
          class="bg-white rounded-lg border mt-12 border-gray-200 transition-all duration-200"
        >
          <!-- Date -->
          <div class="text-xs font-medium text-gray-500 -mt-6 ml-0.5">
            {{ formatDate(payment.createdAt.toString()) }}
          </div>
          <div class="p-6">
            <div class="flex items-start justify-between">
              <!-- Left Side - Payment Info -->
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <!-- Status Badge -->
                  <span
                    :class="getStatusBadgeClass(payment.status)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    <span
                      class="w-1.5 h-1.5 rounded-full mr-1.5"
                      :class="getStatusDotClass(payment.status)"
                    ></span>
                    {{ formatStatus(payment.status) }}
                  </span>
                </div>

                <!-- Payment Details -->
                <div class="space-y-2">
                  <div class="flex items-center text-sm">
                    <span class="font-medium text-gray-700 w-20"
                      >Order ID:</span
                    >
                    <code
                      class="text-gray-900 bg-gray-100 px-2 py-1 rounded text-xs font-mono"
                    >
                      {{ payment.orderId }}
                    </code>
                  </div>

                  <!-- Plan Info if available -->
                  <div
                    v-if="payment.internalPlanId"
                    class="flex items-center text-sm"
                  >
                    <span class="font-medium text-gray-700 w-20">Plan:</span>
                    <span class="text-gray-900">{{
                      getPlanDisplayName(payment.internalPlanId)
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Right Side - Error Code -->
              <div class="flex flex-col items-end gap-2 ml-4">
                <div v-if="payment.errorCode" class="text-right">
                  <span class="text-xs text-gray-500 font-medium"
                    >Error Code</span
                  >
                  <p
                    class="text-xs font-mono text-red-600 bg-red-50 px-2 py-1 rounded mt-1"
                  >
                    {{ payment.errorCode }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Error/Issue Message -->
            <div
              v-if="payment.failedReason"
              :class="getMessageBoxClass(payment.status)"
              class="mt-4 p-3 border rounded-lg"
            >
              <div class="flex items-start">
                <svg
                  :class="getMessageIconClass(payment.status)"
                  class="w-4 h-4 mt-0.5 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    v-if="payment.status === 'failed'"
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                  <path
                    v-else
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div>
                  <p
                    :class="getMessageTitleClass(payment.status)"
                    class="text-sm font-medium"
                  >
                    {{ getMessageTitle(payment.status) }}
                  </p>
                  <p
                    :class="getMessageTextClass(payment.status)"
                    class="text-xs mt-1"
                  >
                    {{ payment.failedReason }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-xl border border-gray-200 p-12">
        <div class="text-center">
          <div
            class="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No payment history
          </h3>
          <p class="text-gray-600 text-sm">
            Your payment transactions that require attention will appear here.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import UserApi from "@/api-factory/user";
import Spinner from "@/common/components/Spinner.vue";

const router = useRouter();
const paymentHistory = ref<any[]>([]);
const isLoading = ref(false);

function goBack() {
  router.push("/settings");
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatStatus(status: string) {
  return status
    ?.split("_")
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getStatusBadgeClass(status: string) {
  const statusClasses: Record<string, string> = {
    failed: "bg-red-100 text-red-800",
    succeeded: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    cancelled: "bg-gray-100 text-gray-800",
    requires_customer_action: "bg-orange-100 text-orange-800",
  };
  return statusClasses[status] || "bg-gray-100 text-gray-800";
}

function getStatusDotClass(status: string) {
  const dotClasses: Record<string, string> = {
    failed: "bg-red-500",
    succeeded: "bg-green-500",
    pending: "bg-yellow-500",
    processing: "bg-blue-500",
    cancelled: "bg-gray-500",
    requires_customer_action: "bg-orange-500",
  };
  return dotClasses[status] || "bg-gray-500";
}

function getPlanDisplayName(planId: string) {
  const planNames: Record<string, string> = {
    pro_1_month: "Pro Monthly",
    pro_3_months: "Pro Quarterly",
    pro_6_months: "Pro Bi-Annual",
    pro_1_year: "Pro Annual",
  };
  return planNames[planId] || planId.replace("_", " ").toUpperCase();
}

function getMessageBoxClass(status: string) {
  const boxClasses: Record<string, string> = {
    failed: "bg-red-50 border-red-200",
    requires_customer_action: "bg-orange-50 border-orange-200",
    processing: "bg-blue-50 border-blue-200",
    cancelled: "bg-gray-50 border-gray-200",
  };
  return boxClasses[status] || "bg-yellow-50 border-yellow-200";
}

function getMessageIconClass(status: string) {
  const iconClasses: Record<string, string> = {
    failed: "text-red-400",
    requires_customer_action: "text-orange-400",
    processing: "text-blue-400",
    cancelled: "text-gray-400",
  };
  return iconClasses[status] || "text-yellow-400";
}

function getMessageTitleClass(status: string) {
  const titleClasses: Record<string, string> = {
    failed: "text-red-800",
    requires_customer_action: "text-orange-800",
    processing: "text-blue-800",
    cancelled: "text-gray-800",
  };
  return titleClasses[status] || "text-yellow-800";
}

function getMessageTextClass(status: string) {
  const textClasses: Record<string, string> = {
    failed: "text-red-700",
    requires_customer_action: "text-orange-700",
    processing: "text-blue-700",
    cancelled: "text-gray-700",
  };
  return textClasses[status] || "text-yellow-700";
}

function getMessageTitle(status: string) {
  const titles: Record<string, string> = {
    failed: "Payment Failed",
    requires_customer_action: "Action Required",
    processing: "Processing",
    cancelled: "Payment Cancelled",
  };
  return titles[status] || "Payment Issue";
}

onMounted(async () => {
  await getPaymentHistory();
});

async function getPaymentHistory() {
  try {
    isLoading.value = true;
    paymentHistory.value = await UserApi.getPaymentHistory();
  } catch (error) {
    console.error("Failed to load payment history:", error);
    paymentHistory.value = [];
  } finally {
    isLoading.value = false;
  }
}
</script>
