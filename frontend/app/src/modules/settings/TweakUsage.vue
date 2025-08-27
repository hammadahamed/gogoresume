<template>
  <div class="space-y-6">
    <!-- Loading Shimmer -->
    <div v-if="isLoading" class="space-y-6">
      <!-- Daily Usage Shimmer -->
      <div v-if="!isFreePlan" class="animate-pulse">
        <div class="flex justify-between items-center mb-2">
          <div class="h-4 bg-gray-300 rounded w-24"></div>
          <div class="h-4 bg-gray-300 rounded w-20"></div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-1.5">
          <div class="bg-gray-300 h-1.5 rounded-full w-1/3"></div>
        </div>
        <div class="h-3 bg-gray-300 rounded w-32 mt-1"></div>
      </div>

      <!-- Total Available Shimmer -->
      <div class="animate-pulse">
        <div class="flex justify-between items-center mb-2">
          <div class="h-4 bg-gray-300 rounded w-28"></div>
          <div class="h-4 bg-gray-300 rounded w-24"></div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-1.5">
          <div class="bg-gray-300 h-1.5 rounded-full w-2/3"></div>
        </div>
        <div class="flex justify-between mt-1">
          <div class="h-3 bg-gray-300 rounded w-28"></div>
          <div class="h-3 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>

    <!-- Actual Content -->
    <div v-else class="space-y-6">
      <!-- Daily Usage Progress -->
      <div v-if="!isFreePlan">
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-sm font-medium text-gray-700">Today's Usage</h3>
          <span class="text-sm text-gray-500">
            {{ tweaksUsage.dailyTweaksUsed }} /
            {{ tweaksUsage.planDailyTweaks }} tweaks
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-1.5">
          <div
            class="bg-blue-500 h-1.5 rounded-full transition-all duration-300 shadow-sm"
            :style="{ width: `${dailyUsagePercentage}%` }"
          ></div>
        </div>
        <p class="text-xs text-gray-500 mt-1">
          {{ tweaksUsage.planDailyTweaks - tweaksUsage.dailyTweaksUsed }} tweaks
          remaining today
        </p>
      </div>

      <!-- Total Available Tweaks (with carry-forward) -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h3 class="text-sm font-medium text-gray-700">Total Available</h3>
          <span class="text-sm text-gray-500">
            {{ tweaksUsage.totalTweaksUsed }} /
            {{ tweaksUsage.totalTweaks }} tweaks
          </span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-1.5">
          <div
            class="bg-emerald-500 h-1.5 rounded-full transition-all duration-300 shadow-sm"
            :style="{ width: `${totalUsagePercentage}%` }"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-500 mt-1">
          <span
            >{{ tweaksUsage.totalTweaks - tweaksUsage.totalTweaksUsed }} tweaks
            remaining</span
          >
          <span v-if="tweaksUsage.carryForward > 0">
            ({{ tweaksUsage.carryForward }} carried forward)
          </span>
        </div>
      </div>

      <!-- Free Plan Note -->
      <div v-if="isFreePlan" class="text-center p-3 bg-gray-50 rounded-lg">
        <p class="text-sm text-gray-600">
          Free plan includes <span class="font-semibold">10 total tweaks</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import userApi from "@/api-factory/user";
import { useUserStore } from "@/stores/useUserStore";
import { Plans } from "@/modules/pricing/pricing";

// Props
interface Props {
  userPlan: string;
  isFreePlan: boolean;
}

const userStore = useUserStore();
const isFreePlan = computed(
  () => userStore.user.plan.internalPlanId === Plans.FREE
);

const props = defineProps<Props>();
const tweaksUsage = ref({});
const isLoading = ref(true);

const dailyUsagePercentage = computed(() =>
  Math.min(
    (tweaksUsage.value.dailyTweaksUsed / tweaksUsage.value.planDailyTweaks) *
      100,
    100
  )
);

const totalUsagePercentage = computed(() =>
  Math.min(
    (tweaksUsage.value.totalTweaksUsed / tweaksUsage.value.totalTweaks) * 100,
    100
  )
);

onMounted(async () => {
  try {
    tweaksUsage.value = await userApi.getTweaksUsage();
    console.log(tweaksUsage.value);
  } catch (error) {
    console.error("Error loading tweaks usage:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
