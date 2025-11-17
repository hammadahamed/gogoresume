import { computed, ref } from "vue";
import { accessTokenKey, refreshTokenKey } from "@/api-factory/constants";
import AuthApi from "@/api-factory/auth";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useAppStore } from "@/stores/useAppStore";
import { useUserStore } from "@/stores/useUserStore";

export default function useAuthComposable(raw = false) {
  const appStore = useAppStore();
  const userStore = useUserStore();
  const isSendingOTP = ref(false);
  const isVerifyingOTP = ref(false);
  const msg = raw
    ? {
        success: () => {},
        error: () => {},
      }
    : toast;
  const router = useRouter();
  const accessToken = ref(localStorage.getItem(accessTokenKey) || null);
  const user = computed(() => userStore.user);

  function isValidEmail(email: any) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const sendOTP = async (email: string) => {
    try {
      isSendingOTP.value = true;
      const response = await AuthApi.emailOnlyGenerateOTP({
        email: email,
      });
      router.push({
        path: "/auth/otp",
        query: {
          email: email,
        },
      });
      msg.success(`we've sent the login OTP to ${email}`);
    } catch (error: any) {
      console.error(" sendOTP ERROR:", error);
      msg.error(error.response.data.message ?? "Oops. Failed to send OTP");
    } finally {
      isSendingOTP.value = false;
    }
  };

  const submitOTP = async (email: string, otp: string) => {
    try {
      isVerifyingOTP.value = true;
      const response = await AuthApi.emailOnlyVerifyOTP({
        email: email,
        otp,
      });
      if (response.tokens) {
        msg.success(`Logged in Successfully`);
        router.push("/workspace");
      } else {
        msg.error("Oops. Something Went wrong");
      }
    } catch (error: any) {
      console.error(" sendOTP ERROR:", error);
      msg.error(error.response.data.message ?? "Oops. Failed to send OTP");
    } finally {
      isVerifyingOTP.value = false;
    }
  };

  const logout = () => {
    localStorage.removeItem(accessTokenKey);
    localStorage.removeItem(refreshTokenKey);
    accessToken.value = null;
    userStore.user = null;
  };

  const bootstrap = async (force = false) => {
    if (!force && (appStore.isAppLoading || userStore.user)) return;
    try {
      appStore.isAppLoading = true;
      if (!force && (userStore.user || !localStorage.getItem(accessTokenKey)))
        return;
      const response = await AuthApi.bootstrap();
      userStore.user = response;
      appStore.showOnboarding =
        !isOnboardingDone() && !appStore.isExtensionMode;
      return response;
    } catch (error: any) {
      console.error("Bootstrap error:", error);

      // Only logout if the user is explicitly not found
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data?.code === "USER_NOT_FOUND"
      ) {
        msg.error("User account no longer exists");
        // Clear tokens and user data
        logout();
        userStore.user = null;
      }

      throw error;
    } finally {
      appStore.isAppLoading = false;
    }
  };

  const isOnboardingDone = () => {
    return (userStore?.user?.firstName && userStore?.user?.meta) || false;
  };

  return {
    appStore,
    userStore,
    user,
    accessToken,
    userData: userStore.user,
    isSendingOTP,
    isVerifyingOTP,
    isValidEmail,
    sendOTP,
    submitOTP,
    logout,
    bootstrap,
    isOnboardingDone,
  };
}
