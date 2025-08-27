<!-- PricingCard.vue -->
<template>
  <div
    class="pricing-card"
    :class="{ 'is-popular': isPopular }"
    :style="{ backgroundColor: plan.color }"
  >
    <div v-if="isPopular" class="popular-badge">Most Popular 🔥</div>

    <div class="pricing-card__header">
      <h3 class="pricing-card__title">{{ plan.name }} plan</h3>
      <p class="pricing-card__description">{{ plan.description }}</p>

      <div class="pricing-card__price flex items-center justify-center -ml-3">
        <span class="currency">$</span>
        <span class="amount">{{ plan.price }}</span>
        <!--<span v-if="plan.price > 0" class="period">/ {{ plan.period }}</span>-->
      </div>
    </div>

    <div class="pricing-card__features">
      <ul>
        <li v-for="feature in plan.features" :key="feature">
          <span class="check-icon">✓</span>
          {{ feature }}
        </li>
      </ul>
    </div>

    <div class="pricing-card__action">
      <button
        class="pricing-card__button font-semibold"
        :class="{
          'opacity-50 cursor-not-allowed pointer-events-none': isDisabled,
        }"
        @click="handleGetStarted"
      >
        {{ plan.name === "Free" ? "Get Started" : `Get ${plan.name}` }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PricingPlan {
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  color: string;
}

const props = defineProps<{
  plan: PricingPlan;
  isPopular?: boolean;
  isDisabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "select-plan", plan: PricingPlan): void;
}>();

const handleGetStarted = () => {
  emit("select-plan", props.plan);
};
</script>

<style lang="scss" src="./PricingCard.scss" scoped />
