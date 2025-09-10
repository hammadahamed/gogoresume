<template>
  <div v-if="accessToken">
    <div
      class="ml-auto w-max text-xs sm:text-sm text-black font-semibold gap-2 sm:gap-3 px-3 sm:px-6 py-2 bg-gray-100 border border-gray-400 hover:ring hover:ring-black transition-all duration-200 rounded-full cursor-pointer"
      @click="router.push('/home')"
    >
      <span class="hidden sm:inline">Go To Dashboard</span>
      <span class="sm:hidden">Dashboard</span>
    </div>
  </div>

  <div v-else class="google-login-wrapper">
    <!-- Loading State -->
    <div
      v-if="isSigningIn"
      class="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 bg-gray-900 border border-gray-700 rounded-lg"
    >
      <div
        class="animate-spin rounded-full h-3 sm:h-4 w-3 sm:w-4 border-2 border-gray-300 border-t-white"
      ></div>
      <span class="text-white text-xs sm:text-sm font-medium">
        <span class="hidden sm:inline">Signing in...</span>
        <span class="sm:hidden">Signing in...</span>
      </span>
    </div>

    <!-- Google Login Button -->
    <GoogleLogin
      v-else
      :callback="googleSignin"
      :auto-login="true"
      :prompt="true"
      :idConfiguration="idConfiguration"
    >
      <button
        class="group relative w-full flex items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 bg-gray-900 hover:bg-gray-800 active:bg-gray-950 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        <!-- Google Icon -->
        <div class="flex-shrink-0">
          <GOOGLE_ICON class="w-4 h-4" />
        </div>

        <!-- Button Text -->
        <span class="text-white font-medium text-xs sm:text-sm">
          <span class="hidden sm:inline">Continue with Google</span>
          <span class="sm:hidden">Sign In</span>
        </span>

        <!-- Subtle hover effect overlay -->
        <div
          class="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-200 rounded-lg"
        ></div>
      </button>
    </GoogleLogin>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GoogleLogin, decodeCredential } from "vue3-google-login";
import GOOGLE_ICON from "@/assets/svg/google.svg";
import AuthApi from "@/api-factory/auth";
import { toast } from "vue3-toastify";
import useAuthComposable from "@/composables/useAuth";
import { useRouter } from "vue-router";

// Props
interface Props {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

const props = defineProps<Props>();

const { accessToken, user, bootstrap } = useAuthComposable();
const router = useRouter();

// Emits
const emit = defineEmits<{
  success: [response: any];
  error: [error: any];
}>();

const idConfiguration = {
  client_id: process.env.GOOGLE_CLIENT_ID, // Add your Google OAuth client ID
  ux_mode: "popup",
  use_fedcm_for_prompt: false, // Disable FedCM prompt to avoid browser settings issues
  cancel_on_tap_outside: true, // Allow users to cancel by clicking outside
};
console.log("🚀 ~ idConfiguration:", idConfiguration);

// State
const isSigningIn = ref(false);

// Methods
const googleSignin = async (response: any) => {
  try {
    isSigningIn.value = true;
    const params = {} as any;

    if (response.credential) {
      params.token = response.credential;
      const decoded = decodeCredential(response.credential);
      console.log("Decoded Google User Info:", decoded);
    }

    if (response.code) params.code = response.code;
    console.log("🚀 ~ googleSignin ~ params :", params);

    // If neither credential nor code is available, FedCM might have failed
    if (!response.credential && !response.code) {
      console.warn(
        "No credential or code from Google auth response. Possible FedCM issue.",
        response
      );
      toast.warning(
        "Google sign-in is experiencing issues. Please try again.",
        {
          closable: true,
        }
      );
      isSigningIn.value = false;
      return;
    }

    const result = await AuthApi.googleSignIn(params);
    console.log("🚀 ~ googleSignin ~ result:", result);
    if (result.user.email) {
      console.log("🚀 ~ googleSignin ~ result.user.email:", result.user.email);
      toast.success(`Logged in Successfully`);
      accessToken.value = result.tokens.accessToken;
      await bootstrap();
      router.replace("/home");
    } else {
      toast.error("Oops. Something Went wrong", {
        closable: true,
      });
    }
  } catch (error) {
    console.error("googleSignin ERROR", error);
    // Check for specific FedCM errors
    if (error instanceof Error && error.message.includes("FedCM")) {
      toast.error(
        "Google sign-in settings may need adjustment in your browser",
        {
          closable: true,
          duration: 5000,
        }
      );
    } else {
      toast.error("Oops. Google sign in failed", { closable: true });
    }
  } finally {
    setTimeout(() => {
      isSigningIn.value = false;
    }, 1000);
  }
};
</script>

<style scoped>
/* Ensure the GoogleLogin component takes full width */
.google-login-wrapper :deep(.g-signin2) {
  @apply w-full;
}

.google-login-wrapper :deep(.g-signin2 > div) {
  @apply w-full;
}

/* Override any default Google button styles */
.google-login-wrapper :deep(.g-signin2 .abcRioButton) {
  @apply w-full;
}
</style>
