import axios from "./axios";

class PaymentApi {
  static async getPaymentLink(planId: string) {
    const response = await axios.get("/payment/get-payment-link", {
      params: { planId },
    });
    return response.data;
  }

  static async verifyPurchase(paymentId: string) {
    const response = await axios.post("/payment/purchase/verify", {
      paymentId,
    });
    return response.data;
  }

  static async checkPurchaseStatus(paymentId: string) {
    const response = await axios.get("/payment/purchase/status", {
      params: { paymentId },
    });
    return response.data;
  }

  static async getUserActivePurchase() {
    const response = await axios.get("/payment/purchase/active");
    return response.data;
  }

  static async checkPendingPurchases() {
    const response = await axios.post("/payment/purchase/check-pending");
    return response.data;
  }

  static async processPayment(paymentIntentId: string) {
    const response = await axios.post("/payment/process-payment", {
      paymentIntentId,
    });
    return response.data;
  }
}

export default PaymentApi;
