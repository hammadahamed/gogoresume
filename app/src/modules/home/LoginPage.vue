<template>
  <div
    class="min-h-screen bg-white flex flex-col items-center justify-center -mt-20"
  >
    <!-- Header with Logo -->
    <Navigation :noLoginButton="true" />

    <!-- Main Content -->
    <div class="flex items-center justify-center px-6 py-16">
      <div class="w-full">
        <div class="text-center mb-3">
          <h3 class="text-5xl font-extrabold text-gray-900 mb-3">
            Let's Get Started
          </h3>
          <p class="text-gray-600">
            Sign in to continue building your perfect resume
          </p>
        </div>

        <!-- Google Login Button -->
        <div class="mb-12 mt-10 mx-auto w-min">
          <GoogleLogin
            special
            :onSuccess="handleLoginSuccess"
            :onError="handleLoginError"
          />
        </div>

        <!-- Value Props - Simplified -->
        <div
          class="flex flex-wrap gap-x-6 gap-y-2 items-center justify-center mb-4"
        >
          <div
            v-for="prop in valueProps"
            :key="prop"
            class="flex items-start space-x-3 text-sm text-gray-600"
          >
            <div
              class="w-5 h-5 bg-violet-200 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <svg
                class="w-2.5 h-2.5 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <span class="whitespace-nowrap">{{ prop }}</span>
          </div>
        </div>

        <!-- Trust Indicators -->
        <div class="text-center space-y-4">
          <p class="text-sm text-gray-500">
            By signing in, you agree to our

            <a
              href="/privacy-policy"
              class="font-bold text-violet-600 hover:text-violet-700"
              >Privacy Policy</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import Navigation from "./Navigation.vue";
import GoogleLogin from "@/common/functional-components/GoogleLogin.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isExtensionMode = inject("isExtensionMode");

// Value props for display
const valueProps = [
  "AI-powered resume \noptimization",
  "Smart Suggestions",
  "Chrome extension",
];

const handleLoginSuccess = (response: any) => {
  console.log("Login successful:", response);
  // The GoogleLogin component handles the redirect automatically
};

const handleLoginError = (error: any) => {
  console.error("Login error:", error);
};
</script>
