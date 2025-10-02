import PaymentApi from "@/api-factory/payment";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "vue3-toastify";

export const setAttemptingPayment = (attempting: boolean) => {
  localStorage.setItem("attemptingPayment", attempting.toString());
};

export const clearAttemptingPayment = () => {
  localStorage.removeItem("attemptingPayment");
};

export const getAttemptingPayment = () => {
  return localStorage.getItem("attemptingPayment") === "true";
};

export const resumePaymentAfterLogin = async (router: any) => {
  const planId = localStorage.getItem("attemptingPayment");
  if (!planId) return false;

  const userStore = useUserStore();
  const userAlreadyHasPlan =
    (userStore.user?.plan &&
      userStore.user.plan.isActive &&
      userStore.user.plan.internalPlanId !== "free") ??
    null;

  if (userAlreadyHasPlan) {
    router.push("/pricing");
    return true;
  }

  clearAttemptingPayment();

  try {
    const response = await PaymentApi.getPaymentLink(planId, false);
    if (response && response) {
      window.location.href = response;
      return true;
    } else {
      console.error("Invalid payment link received");
      throw new Error("Invalid payment link received");
    }
  } catch (error) {
    toast.error(
      "Oops we couldn't get your payment link. Please try again later."
    );
    return false;
  }
};
