<!-- PricingPage.vue -->
<template>
  <div class="pricing-page">
    <div class="pricing-page__header">
      <h1>
        Screw the ATS ,
        <span class="squiggly-underlin bg-highlight font-bold text-black">
          Get the Job
        </span>
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

    <div
      v-if="isLoading"
      class="loading-container"
      style="
        display: flex;
        justify-content: center;
        height: 200px;
        margin-bottom: 200px;
      "
    >
      <Spinner borderWidth="3px" style="margin: auto 0px" />
    </div>
    <div v-else class="pricing-page__grid">
      <PricingCard
        v-for="plan in pricedPlans"
        :key="plan.name"
        :plan="plan"
        :is-popular="plan.isPopular"
        @select-plan="handlePlanSelection"
      />
    </div>

    <div class="pricing-page__comparison">
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
import { ref } from "vue";
import PricingCard from "./PricingCard.vue";
import { plans, comparisonFeatures, pricedPlans } from "./pricing";
import { useRouter } from "vue-router";
import Spinner from "@/common/components/Spinner.vue";
import PaymentApi from "@/api-factory/payment";

const router = useRouter();
const isLoading = ref(false);

const getPlanValue = (feature: any, plan: any) => {
  // Map plan names to the keys used in comparison features
  const planKeyMap: { [key: string]: string } = {
    Free: "free",
    "Pro Weekly": "pro_weekly",
    "Pro Monthly": "pro_monthly",
    "Pro Quarterly": "pro_quarterly",
  };

  const planKey =
    planKeyMap[plan.name] || plan.name.toLowerCase().replace(" ", "_");
  return feature.values[planKey];
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
    const response = await PaymentApi.getPaymentLink(plan.id);
    if (response && response.paymentLink) {
      window.location.href = response.paymentLink;
    } else {
      console.error("Invalid payment link received");
      isLoading.value = false;
    }
  } catch (error) {
    console.error("Error generating payment link:", error);
    isLoading.value = false;
  }
}
</script>

<style lang="scss" src="./PricingPage.scss" scoped />
