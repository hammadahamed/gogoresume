<template>
  <div class="onboarding-example p-8">
    <div class="max-w-md mx-auto text-center">
      <h1 class="text-2xl font-bold mb-4">Onboarding Modal Demo</h1>

      <button
        @click="showOnboarding = true"
        class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Open Onboarding Modal
      </button>

      <!-- Display submitted data -->
      <div
        v-if="submittedData"
        class="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-left"
      >
        <h3 class="text-lg font-semibold text-green-800 mb-3">
          Submitted Data:
        </h3>
        <div class="space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {{ submittedData.firstName }}
            {{ submittedData.lastName }}
          </p>
          <p>
            <strong>Experience:</strong>
            {{ getExperienceLabel(submittedData.experienceLevel) }}
          </p>
          <p><strong>Designation:</strong> {{ submittedData.designation }}</p>
          <p>
            <strong>Industry:</strong>
            {{ getIndustryLabel(submittedData.industry) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Onboarding Modal -->
    <Onboarding v-model="showOnboarding" @submit="handleOnboardingSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Onboarding from "@/common/functional-components/Onboarding.vue";
import {
  EXPERIENCE_LEVELS,
  INDUSTRIES,
  type OnboardingFormData,
} from "@/constants/onboarding.constants";

const showOnboarding = ref(false);
const submittedData = ref<OnboardingFormData | null>(null);

const handleOnboardingSubmit = (data: OnboardingFormData) => {
  submittedData.value = data;

  // Here you would typically send the data to your backend
  // Example: await AuthApi.saveOnboardingData(data);
};

const getExperienceLabel = (value: string) => {
  return (
    EXPERIENCE_LEVELS.find((level) => level.value === value)?.label || value
  );
};

const getIndustryLabel = (value: string) => {
  return (
    INDUSTRIES.find((industry) => industry.value === value)?.label || value
  );
};
</script>

<style scoped>
.onboarding-example {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
