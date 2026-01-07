<!-- PricingCard.vue -->
<template>
    <div class="pricing-card relative" :class="{ 'is-popular': isPopular }" :style="{ backgroundColor: plan.color }">
        <div v-if="isPopular" class="popular-badge">Most Value for buck ✨</div>

        <div class="pricing-card__header" style="margin: 0px; margin-top: 30px">
            <!-- PERCENTAGE OFF BADGE  -->
            <div v-if="plan.discountedPrice"
                class="flex items-center justify-center -translate-y-5 absolute top-6 -left-6 scale-75 rounded overflow-hidden -rotat10">
                <div class="text-sm bg-violet-500 text-white font-semibold px-2 py-1 rounded-full flex items-center justify-center gap-1"
                    :class="{ 'py-2 px-4': plan.isPopular }">
                    <p class="font-semibold scale-120 mx-1" :class="{ 'scale-160 mx-3 font-bold': plan.isPopular }">
                        {{ getDiscountPercentage() }}%
                    </p>
                </div>
            </div>

            <div class="flex items-center justify-center gap-1">
                <div class="pricing-card__price flex items-center justify-center -ml-2">
                    <span class="currency">$</span>
                    <span class="text-5xl">{{
                        plan.discountedPrice ? plan.discountedPrice : plan.price
                    }}</span>
                </div>

                <div v-if="plan.discountedPrice" class="flex flex-col items-center gap-1 -mt-2">
                    <div class="text-lg flex justify-center items-center diagonal-strike text-gray-500 relative">
                        <p class="currency mt-1 text-sm font-bold">$</p>
                        <p class="text-xl font-semibold">{{ plan.price }}</p>
                    </div>
                </div>
            </div>

            <div class="mb-8 -mt-3 flex justify-center">
                <h3 class="max-w-[150px] font-bold text-lg text-center -ml-1">
                    {{ plan.name }}
                </h3>
            </div>
        </div>

        <div class="pricing-card__features">
            <ul>
                <li v-for="feature in plan.features" :key="feature">
                    <div class="w-5 h-5 rounded-full flex items-center justify-center p-2 bg-violet-500/10">
                        <span class="text-violet-500 font-bold scale-80">✓</span>
                    </div>
                    <span class="text-[15px]">
                        {{ feature }}
                    </span>
                </li>
            </ul>
        </div>

        <div class="pricing-card__action">
            <button class="rounded-full pricing-card__button font-semibold " :class="{
                'opacity-50 cursor-not-allowed pointer-events-none': isDisabled,
            }" @click="handleGetStarted">
                {{ plan.name === "Free" ? "Get Started" : `${plan.actionBtn}` }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "vue-router";
import { setAttemptingPayment } from "@/helper/payment.helper";

const userStore = useUserStore();
const router = useRouter();

interface PricingPlan {
    name: string;
    description: string;
    price: number;
    discountedPrice?: number;
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
    if (userStore.user) emit("select-plan", props.plan);
    else {
        setAttemptingPayment(props.plan.id);
        router.push("/login");
    }
};

const getDiscountPercentage = () => {
    if (props.plan.discountedPercentage) {
        return props.plan.discountedPercentage;
    }

    return (
        ((props.plan.price - props.plan.discountedPrice) / props.plan.price) *
        100
    ).toFixed(0);
};
</script>

<style lang="scss" src="./PricingCard.scss" scoped />
