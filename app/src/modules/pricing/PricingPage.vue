<!-- PricingPage.vue -->
<template>
  <div class="pricing-page pb-0">
    <div
      class="pricing-page__header"
      v-if="!route.meta.restrictPlan && !homeView"
    >
      <h1>
        Screw the ATS ,
        <p class="squiggly-underlin bg-highlight font-bold text-black">
          Get the Job
        </p>
      </h1>

      <p class="">Its one time payment - No recurring fees, no hidden costs.</p>
      <p class="">
        Make your resume screw the ATS and
        <span class="squiggly-underline font-semibold text-black"
          >land on the desk,</span
        >
        without breaking the bank.
      </p>
    </div>
    <div v-else-if="!homeView">
      <p class="text-center text-5xl font-bold mb-28 mt-10">
        <span class="bg-highlight font-bold text-black">Upgrade</span> to unlock
        more power
      </p>
    </div>

    <!-- Countdown Timer for Launch Offer -->
    <div class="countdown-section mb-10 -mt-10" v-if="homeView">
      <CountdownTimer class="w-[400px] mx-auto" end-date="2025-10-08" />
    </div>

    <div
      v-if="isLoading"
      class="loading-container"
      style="display: flex; justify-content: center; height: 200px"
    >
      <Spinner borderWidth="3px" style="margin: auto 0px" />
    </div>
    <div v-else class="pricing-page__grid flex justify-center flex-wrap gap-14">
      <PricingCard
        v-for="plan in pricedPlans"
        :key="plan.name"
        :plan="plan"
        :is-popular="plan.isPopular"
        @select-plan="handlePlanSelection"
        :isDisabled="disablePlan(plan)"
      />
    </div>

    <!-- Free Plan Info Card -->
    <div class="free-plan-info mb-16 mt-16" v-if="homeView">
      <div class="mx-auto">
        <div class="bg-gray-50 border border-gray-400 rounded p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                Free Plan Available
              </h3>
              <p class="text-sm text-gray-600">Perfect for getting started</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-gray-900">$0</div>
              <div class="text-xs text-gray-500">Forever</div>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
            <div
              v-for="feature in freePlanFeatures"
              :key="feature"
              class="flex items-center font-medium text-sm text-gray-800"
            >
              <span
                class="w-5 h-5 bg-violet-200/70 rounded-full flex items-center justify-center text-black font-semibold text-xs mr-2"
                >✓</span
              >
              {{ feature }}
            </div>
          </div>
        </div>

        <p class="text-center text-gray-800 mt-4">
          No credit card required • Upgrade anytime for more features
        </p>
      </div>
    </div>

    <div class="pricing-page__comparison mt-30 pb-0">
      <h2 class="text-center text-4xl font-bold text-gray-800 mb-10">
        Compare Plans
      </h2>
      <div class="comparison-table">
        <div class="comparison-row header-row">
          <div class="feature-column">Features</div>
          <div class="plan-column" v-for="plan in plans" :key="plan.name">
            {{ plan.name }}
          </div>
        </div>

        <div
          class="comparison-row"
          v-for="(feature, index) in comparisonFeatures"
          :key="index"
        >
          <div class="feature-column">
            <div class="feature-name">{{ feature.name }}</div>
            <div class="feature-info" v-if="feature.info">ⓘ</div>
          </div>
          <div class="plan-column" v-for="plan in plans" :key="plan.name">
            <div v-if="typeof getPlanValue(feature, plan) === 'boolean'">
              <span v-if="getPlanValue(feature, plan)" class="check">✓</span>
              <span v-else class="dash">—</span>
            </div>
            <div v-else>
              {{ getPlanValue(feature, plan) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import PricingCard from "./PricingCard.vue";
import CountdownTimer from "./CountdownTimer.vue";
import { plans, comparisonFeatures, pricedPlans, freePlan } from "./pricing";
import { useRoute, useRouter } from "vue-router";
import Spinner from "@/common/components/Spinner.vue";
import PaymentApi from "@/api-factory/payment";
import { toast } from "vue3-toastify";
import { useUserStore } from "@/stores/useUserStore";

const props = defineProps({
  homeView: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const isLoading = ref(false);
const route = useRoute();

const userStore = useUserStore();

// Free plan details based on planConfig.ts
const freePlanDetails = computed(() => ({
  numberOfResumes: 2,
  count: 10,
  countPeriod: "month",
  carryForward: false,
}));

// Free plan features for display
const freePlanFeatures = computed(() => [
  `${freePlanDetails.value.numberOfResumes} resumes`,
  `${freePlanDetails.value.count} AI tweaks/${freePlanDetails.value.countPeriod}`,
  "Templates Access",
  "Chrome extension",
]);
const getPlanValue = (feature: any, plan: any) => {
  return feature.values[plan.id];
};

const disablePlan = (plan: any) => {
  return (
    route.meta.restrictPlan &&
    !userStore.user.plan.upgradeAvailablePlans.includes(plan.id)
  );
};

const handlePlanSelection = async (plan: any) => {
  if (plan.id === "free") {
    router.push("/home");
    return;
  }

  await handlePayment(plan);
};

async function handlePayment(plan: any) {
  try {
    isLoading.value = true;
    if (!userStore.user) {
      //   toast.error("Please login to continue");
      isLoading.value = false;
      router.push("/login");
      return;
    }
    const response = await PaymentApi.getPaymentLink(
      plan.id,
      route.meta.restrictPlan
    );
    if (response && response) {
      window.location.href = response;
    } else {
      console.error("Invalid payment link received");
      isLoading.value = false;
    }
  } catch (error: any) {
    console.error("Error generating payment link:", error);
    isLoading.value = false;

    // Handle specific error cases
    if (error.response?.data?.message === "User already has a plan") {
      toast.warning(
        "You already have an active plan. If you are trying to upgrade, please check in your profile settings."
      );
    } else {
      toast.error("Failed to generate payment link. Please try again later.");
    }
  }
}
</script>

<style lang="scss" src="./PricingPage.scss" scoped />
