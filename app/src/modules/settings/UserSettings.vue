<template>
  <div class="min-h-screen py-8 pb-32">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-3xl font-bold text-gray-900 mb-8">Settings</p>

      <!-- Personal Info Section -->
      <div class="bg-white mb-6 pb-5 border-b border-gray-300">
        <div class="py-5">
          <h2 class="text-lg font-medium text-black mb-4">
            Personal Information
          </h2>
          <div class="space-y-3">
            <div>
              <label class="text-sm font-medium text-gray-500">Name</label>
              <p class="mt-1 text-sm text-gray-900">
                {{ user.firstName }} {{ user.lastName }}
              </p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-500">Email</label>
              <p class="mt-1 text-sm text-gray-900">{{ user.email }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Usage Section -->
      <div class="bg-white mb-6 pb-9 border-b border-gray-300">
        <div class="py-5">
          <h2 class="text-lg font-medium text-black mb-4">Tweak Usage</h2>
          <TweakUsage
            :user-plan="user.plan?.internalPlanId || 'free'"
            :is-free-plan="isFreePlan"
          />
        </div>
      </div>

      <!-- Billing Section -->
      <div class="bg-white mb-6">
        <div class="py-2">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-lg font-medium text-black">
              Billing & Subscription
            </h2>
            <button
              @click="handleUpgrade"
              :class="`inline-flex items-center px-4 py-2 text-base font-medium text-navy-800 rounded-full  hover:bg-amber-400 focus:outline-none transition-all duration-150 gap-2 ${upgradeButtonColor}`"
            >
              <CrownIcon :class="`w-4 h-4 ${crownIconColor}`" />
              <p class="text-sm font-semibold">
                {{ upgradeButtonText }}
              </p>
            </button>
          </div>

          <!-- Active Plan Info -->
          <div
            class="bg-gray-50 border border-gray-300 rounded-xl py-2 pb-4 px-6 mb-4"
          >
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-500"
                  >Current Plan</label
                >
                <p class="mt-1 text-sm font-medium text-gray-900">
                  {{
                    isFreePlan ? "Free" : getPlanName(user.plan.internalPlanId)
                  }}
                </p>
              </div>

              <div v-if="hasPreviousPlan">
                <label class="text-sm font-medium text-gray-500"
                  >Previous Plan</label
                >
                <p class="mt-1 text-sm font-medium text-gray-900">
                  {{ getPlanName(user.plan.internalPlanId) }}
                </p>
              </div>

              <div v-if="!isFreePlan || hasPreviousPlan">
                <label class="text-sm font-medium text-gray-500">Status</label>
                <p class="mt-1">
                  <span
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      isExpired
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800',
                    ]"
                  >
                    {{ isExpired ? "Expired" : "Active" }}
                  </span>
                </p>
              </div>
              <div v-if="!isFreePlan">
                <label class="text-sm font-medium text-gray-500"
                  >Expires In</label
                >
                <p class="mt-1 text-sm text-gray-900">{{ daysLeft }} days</p>
              </div>
              <div v-if="!isFreePlan || hasPreviousPlan">
                <label class="text-sm font-medium text-gray-500"
                  >{{ hasPreviousPlan ? "Previous" : "" }} Expiry Date</label
                >
                <p class="mt-1 text-sm text-gray-900">
                  {{ formatDate(user.plan.planEnd) }}
                </p>
              </div>
            </div>

            <!-- Payment Details -->
            <div class="mt-4 pt-4 border-t border-gray-200" v-if="!isFreePlan">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-500"
                    >Payment Date</label
                  >
                  <p class="mt-1 text-sm text-gray-900">
                    {{ formatDate(user.plan.planStart) }}
                  </p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500"
                    >Payment ID</label
                  >
                  <p class="mt-1 text-sm font-mono text-gray-900">
                    {{ user.plan.providerPaymentId }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="payment-history -mt-2">
          <p
            @click="viewPaymentHistory"
            class="text-sm font-medium text-violet-600 mb-4 hover:text-violet-800 transition-all duration-150 cursor-pointer hover:underline"
          >
            View Payments History →
          </p>
        </div>
      </div>

      <!-- Support Section -->
      <div class="bg-white mb-6 pb-5 border-b border-gray-300">
        <div class="py-5">
          <h2 class="text-lg font-medium text-black mb-4">Support</h2>
          <div class="space-y-3">
            <div>
              <label class="text-sm font-medium text-gray-500"
                >Contact Support</label
              >
              <div class="mt-2 flex items-center space-x-3">
                <p
                  class="text-sm font-mono text-gray-900 bg-gray-50 px-3 py-2 rounded border"
                >
                  support@gogoresume.com
                </p>
                <button
                  @click="copyEmail"
                  class="inline-flex items-center px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {{ copyButtonText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Other Options -->
      <div class="bg-white rounded-lg">
        <div class="">
          <h2 class="text-lg font-medium text-black mb-4">Other Options</h2>
          <button
            @click="handleLogout"
            class="inline-flex items-center px-4 py-2 border-2 border-red-300 text-sm font-medium rounded-lg text-red-700 bg-white hover:bg-red-50 focus:outline-none transition-all duration-150"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import useAuthComposable from "@/composables/useAuth";
import { toast } from "vue3-toastify";
import CrownIcon from "@/assets/svg/crown.svg";
import { useUserStore } from "@/stores/useUserStore";
import { plans } from "../pricing/pricing";
import TweakUsage from "./TweakUsage.vue";

const router = useRouter();
const userStore = useUserStore();
const { logout } = useAuthComposable();
const user = ref<any>(userStore.user);
const copyButtonText = ref("Copy");

// Computed properties
const isExpired = computed(() => {
  if (!user.value?.plan?.planEnd) return true;
  return new Date(user.value.plan.planEnd) < new Date();
});

const isFreePlan = computed(() => {
  return (
    user.value?.plan?.internalPlanId === "free" || !user.value?.plan?.isActive
  );
});

const hasPreviousPlan = computed(() => {
  return (
    user.value?.plan?.internalPlanId !== "free" && !user.value?.plan?.isActive
  );
});

const upgradeButtonText = computed(() => {
  if (isFreePlan.value) return "Upgrade to Pro";
  if (user.value?.plan?.upgradeAvailablePlans?.length) return "Upgrade Plan";
  return getPlanName(user.value?.plan?.internalPlanId);
});

const crownIconColor = ref("");

const upgradeButtonColor = computed(() => {
  if (isFreePlan.value) return "bg-amber-300 hover:bg-amber-400";
  if (user.value?.plan?.upgradeAvailablePlans?.length) {
    crownIconColor.value = "fill-white";
    return "bg-violet-500 hover:bg-violet-600 text-white";
  }

  crownIconColor.value = "fill-violet-500";
  return "bg-transparent hover:bg-transparent pointer-events-none text-violet-500";
});

const daysLeft = computed(() => {
  if (!user.value?.plan?.planEnd) return 0;
  const end = new Date(user.value.plan.planEnd);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// Methods
function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getPlanName(planId: string) {
  return plans.find((plan) => plan.id === planId)?.name || planId;
}

async function handleLogout() {
  try {
    await logout();
    router.push("/");
    toast.success("Logged out successfully");
  } catch (error) {
    toast.error("Failed to logout. Please try again.");
  }
}

function handleUpgrade() {
  router.push("/pricing");
}

function viewPaymentHistory() {
  router.push("/payment-history");
}

async function copyEmail() {
  try {
    await navigator.clipboard.writeText("support@gogoresume.com");
    copyButtonText.value = "Copied!";
    toast.success("Email copied to clipboard!");

    // Reset button text after 2 seconds
    setTimeout(() => {
      copyButtonText.value = "Copy";
    }, 2000);
  } catch (error) {
    toast.error("Failed to copy email. Please try again.");
  }
}

// Fetch user data on mount
onMounted(async () => {
  try {
    // TODO: Replace with actual API call
    return;
    user.value = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      plan: {
        internalPlanId: "pro_7_days",
        planStart: "2024-03-01T00:00:00Z",
        planEnd: "2024-03-08T00:00:00Z",
        providerPaymentId: "pay_abc123",
        upgradeAvailable: true,
        upgradeAvailablePlans: ["pro_1_month", "pro_3_months"],
      },
    };
  } catch (error) {
    toast.error("Failed to load user data");
  }
});
</script>
