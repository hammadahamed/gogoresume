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

    <div class="pricing-page__comparison pt-20 pb-0">
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
import { ref, onMounted } from "vue";
import PricingCard from "./PricingCard.vue";
import { plans, comparisonFeatures, pricedPlans } from "./pricing";
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
