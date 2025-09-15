<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-black backdrop-blur-xs flex items-center justify-center z-50 p-4"
    style="background-color: rgba(0, 0, 0, 0.8)"
  >
    <div
      class="onb-modal bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100"
      :class="{ 'scale-95': isClosing }"
    >
      <!-- Submitting Overlay -->
      <div
        v-if="submitting"
        class="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center z-10 rounded-lg"
      >
        <div class="flex flex-col items-center gap-3">
          <Spinner />
          <p class="text-sm font-medium text-gray-700">
            Setting up your profile...
          </p>
        </div>
      </div>

      <!-- Header -->
      <div class="border-b border-gray-200 p-6 relative">
        <div class="text-center">
          <div
            class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <span class="text-2xl">👋</span>
          </div>
          <h2 class="text-xl font-semibold text-gray-900 mb-1">
            Welcome to <span class="squiggly-underlin">GoGo Resume</span>
          </h2>
          <p class="text-sm text-gray-600">
            Let's set up your profile in under a minute
          </p>
        </div>
      </div>

      <!-- Single Form Content -->
      <form
        @submit.prevent="submitForm"
        class="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-350px)] pb-30"
      >
        <!-- Personal Information -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 mb-3">
            <div
              class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <span class="text-xs font-semibold">1</span>
            </div>
            <h3 class="font-medium text-black">Personal Information</h3>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                First Name <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.firstName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                placeholder="John"
                :class="{ 'border-red-500': errors.firstName }"
              />
              <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">
                {{ errors.firstName }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span class="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                v-model="formData.lastName"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                placeholder="Doe"
                :class="{ 'border-red-500': errors.lastName }"
              />
              <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">
                {{ errors.lastName }}
              </p>
            </div>
          </div>
        </div>

        <!-- Experience Level -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 mb-3">
            <div
              class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <span class="text-xs font-semibold">2</span>
            </div>
            <h3 class="font-medium text-black">Experience Level</h3>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="level in EXPERIENCE_LEVELS"
              :key="level.value"
              @click="selectExperienceLevel(level.value)"
              class="flex items-center p-1.5 px-3 border rounded-md cursor-pointer transition-all duration-150 hover:border-gray-400"
              :class="{
                'border-gray-900 bg-gray-50':
                  formData.experienceLevel === level.value,
                'border-gray-300': formData.experienceLevel !== level.value,
              }"
            >
              <span class="text-lg mr-2">{{ level.icon }}</span>
              <span class="text-sm font-medium text-gray-800 leading-tight">{{
                level.label
              }}</span>
              <div class="ml-auto">
                <div
                  class="w-4 h-4 rounded-full border flex items-center justify-center"
                  :class="{
                    'border-gray-900 bg-gray-900':
                      formData.experienceLevel === level.value,
                    'border-gray-300': formData.experienceLevel !== level.value,
                  }"
                >
                  <div
                    v-if="formData.experienceLevel === level.value"
                    class="w-1.5 h-1.5 bg-white rounded-full"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <p v-if="errors.experienceLevel" class="text-red-500 text-xs">
            {{ errors.experienceLevel }}
          </p>
        </div>

        <!-- Designation -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 mb-3">
            <div
              class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <span class="text-sm">3</span>
            </div>
            <h3 class="font-medium text-gray-900">Your Role</h3>
          </div>

          <!-- Suggested Designations -->
          <div v-if="suggestedDesignations.length > 0" class="mb-3">
            <label class="block text-xs text-gray-600 mb-2"
              >Popular for your level:</label
            >
            <div class="flex flex-wrap gap-2">
              <button
                v-for="suggestion in suggestedDesignations.slice(0, 6)"
                :key="suggestion"
                type="button"
                @click="formData.designation = suggestion"
                class="px-2 py-1 text-xs border border-gray-300 rounded-full hover:border-gray-400 transition-colors"
                :class="{
                  'border-gray-900 bg-gray-50':
                    formData.designation === suggestion,
                }"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Designation <span class="text-red-500">*</span>
            </label>
            <input
              v-model="formData.designation"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
              placeholder="e.g., Software Engineer, Marketing Manager"
              :class="{ 'border-red-500': errors.designation }"
            />
            <p v-if="errors.designation" class="text-red-500 text-xs mt-1">
              {{ errors.designation }}
            </p>
          </div>
        </div>

        <!-- Industry -->
        <div class="space-y-4">
          <div class="flex items-center gap-2 mb-3">
            <div
              class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <span class="text-sm">4</span>
            </div>
            <h3 class="font-medium text-gray-900">Industry</h3>
          </div>

          <!-- Industry Dropdown -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Select Industry <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                v-model="industrySearch"
                type="text"
                class="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                placeholder="Search or select industry..."
                :class="{ 'border-red-500': errors.industry }"
                @focus="showIndustryDropdown = true"
                @blur="hideIndustryDropdown"
              />
              <svg
                class="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <!-- Dropdown -->
            <div
              v-if="showIndustryDropdown"
              class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto"
            >
              <div
                v-for="industry in filteredIndustries"
                :key="industry.value"
                @mousedown="selectIndustry(industry)"
                class="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                :class="{
                  'bg-gray-50': formData.industry === industry.value,
                }"
              >
                <span class="text-base mr-2">{{ industry.icon }}</span>
                <span class="text-gray-800">{{ industry.label }}</span>
              </div>
            </div>
          </div>
          <p v-if="errors.industry" class="text-red-500 text-xs">
            {{ errors.industry }}
          </p>
        </div>
      </form>

      <!-- Footer -->
      <div class="border-t border-gray-100 p-6">
        <div class="flex justify-between items-center">
          <!--    <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Skip for now
          </button> -->

          <button
            @click="submitForm"
            :disabled="!isFormValid || submitting"
            class="ml-auto px-6 py-2 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="submitting" class="flex items-center gap-2">
              <div
                class="animate-spin rounded-full h-3 w-3 border-2 border-gray-300 border-t-white"
              ></div>
              Setting up...
            </span>
            <span v-else>Complete Setup</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  EXPERIENCE_LEVELS,
  INDUSTRIES,
  DESIGNATIONS_BY_EXPERIENCE,
  VALIDATION_RULES,
  type OnboardingFormData,
} from "@/constants/onboarding.constants";
import { toast } from "vue3-toastify";
import AuthApi from "@/api-factory/auth";
import { parseErrorMessage } from "@/api-factory/api-util";
import useAuthComposable from "@/composables/useAuth";
import Spinner from "@/common/components/Spinner.vue";

// Props
interface Props {
  showModal: boolean;
}

const props = defineProps<Props>();
const { bootstrap } = useAuthComposable();

const submitting = ref(false);

// Emits
const emit = defineEmits<{
  "update:showModal": [value: boolean];
  submit: [data: OnboardingFormData];
}>();

// Reactive state
const isVisible = computed({
  get: () => props.showModal,
  set: (value) => emit("update:showModal", value),
});

const isClosing = ref(false);
const industrySearch = ref("");
const showIndustryDropdown = ref(false);

// Form data
const formData = ref<OnboardingFormData>({
  firstName: "",
  lastName: "",
  experienceLevel: "",
  designation: "",
  industry: "",
});

// Errors
const errors = ref<Partial<Record<keyof OnboardingFormData, string>>>({});

// Computed properties
const suggestedDesignations = computed(() => {
  if (!formData.value.experienceLevel) return [];
  return (
    DESIGNATIONS_BY_EXPERIENCE[
      formData.value.experienceLevel as keyof typeof DESIGNATIONS_BY_EXPERIENCE
    ] || []
  );
});

const filteredIndustries = computed(() => {
  if (!industrySearch.value) return INDUSTRIES;
  return INDUSTRIES.filter((industry) =>
    industry.label.toLowerCase().includes(industrySearch.value.toLowerCase())
  );
});

const isFormValid = computed(() => {
  return (
    formData.value.firstName.trim().length >=
      VALIDATION_RULES.firstName.minLength &&
    !!formData.value.experienceLevel &&
    formData.value.designation.trim().length >=
      VALIDATION_RULES.designation.minLength &&
    !!formData.value.industry
  );
});

// Methods
const validateForm = (): boolean => {
  errors.value = {};
  let isValid = true;

  if (!formData.value.firstName.trim()) {
    errors.value.firstName = "First name is required";
    isValid = false;
  } else if (
    formData.value.firstName.trim().length <
    VALIDATION_RULES.firstName.minLength
  ) {
    errors.value.firstName = `First name must be at least ${VALIDATION_RULES.firstName.minLength} characters`;
    isValid = false;
  }

  if (
    formData.value.lastName &&
    formData.value.lastName.length > VALIDATION_RULES.lastName.maxLength!
  ) {
    errors.value.lastName = `Last name must be less than ${VALIDATION_RULES.lastName.maxLength} characters`;
    isValid = false;
  }

  if (!formData.value.experienceLevel) {
    errors.value.experienceLevel = "Please select your experience level";
    isValid = false;
  }

  if (!formData.value.designation.trim()) {
    errors.value.designation = "Designation is required";
    isValid = false;
  } else if (
    formData.value.designation.trim().length <
    VALIDATION_RULES.designation.minLength
  ) {
    errors.value.designation = `Designation must be at least ${VALIDATION_RULES.designation.minLength} characters`;
    isValid = false;
  }

  if (!formData.value.industry) {
    errors.value.industry = "Please select an industry";
    isValid = false;
  }

  return isValid;
};

const selectExperienceLevel = (level: string) => {
  formData.value.experienceLevel = level;
  // Clear designation when experience level changes
  formData.value.designation = "";
};

const selectIndustry = (industry: any) => {
  formData.value.industry = industry.value;
  industrySearch.value = industry.label;
  showIndustryDropdown.value = false;
};

const hideIndustryDropdown = () => {
  setTimeout(() => {
    showIndustryDropdown.value = false;
  }, 150);
};

const submitForm = async () => {
  if (validateForm()) {
    emit("submit", formData.value);
    try {
      submitting.value = true;
      const response = await AuthApi.saveOnboardingData(formData.value);
      await bootstrap(true);
      toast.success("Welcome aboard! 🎉");
      closeModal();
    } catch (error) {
      console.error("saveOnboardingData ERROR", error);
      toast.error(parseErrorMessage(error) ?? "Oops. Failed to save the data");
    } finally {
      submitting.value = false;
    }
  }
};

const closeModal = () => {
  isClosing.value = true;
  isVisible.value = false;
  isClosing.value = false;
  // Reset form
  formData.value = {
    firstName: "",
    lastName: "",
    experienceLevel: "",
    designation: "",
    industry: "",
  };
  errors.value = {};
  industrySearch.value = "";
  showIndustryDropdown.value = false;
};

// Watch for industry search changes
watch(industrySearch, (newValue) => {
  // If user is typing, show dropdown
  if (newValue && !showIndustryDropdown.value) {
    showIndustryDropdown.value = true;
  }

  // Clear industry selection if search doesn't match
  const matchingIndustry = INDUSTRIES.find(
    (i) => i.label.toLowerCase() === newValue.toLowerCase()
  );

  if (!matchingIndustry) {
    formData.value.industry = "";
  }
});
</script>

<style scoped lang="scss">
.onb-modal {
  animation: fadeIn 0.3s ease-in-out;
}

input {
  &:focus {
    outline: none;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Custom scrollbar for industry list */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>
