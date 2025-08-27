import axios, { refreshAuthToken } from "./axios";
import { accessTokenKey, refreshTokenKey } from "./constants";

class AuthApi {
  static async googleSignIn(data: any) {
    const token = localStorage.getItem(accessTokenKey);
    if (token) return;

    const response = await axios.post("/auth/google/signin", data);
    const { accessToken, refreshToken } = response.data?.tokens;
    if (accessToken && refreshToken) {
      localStorage.setItem(accessTokenKey, accessToken);
      localStorage.setItem(refreshTokenKey, refreshToken);
    }
    return response.data;
  }

  static async emailOnlyGenerateOTP(data: any) {
    const response = await axios.post("/auth/email-only/generate-otp", data);
    return response.data;
  }

  static async emailOnlyVerifyOTP(data: any) {
    const token = localStorage.getItem(accessTokenKey);
    if (token) return;

    const response = await axios.post("/auth/email-only/validate-otp", data);
    const { accessToken, refreshToken } = response.data?.tokens;
    if (accessToken && refreshToken) {
      localStorage.setItem(accessTokenKey, accessToken);
      localStorage.setItem(refreshTokenKey, refreshToken);
    }
    return response.data;
  }

  static async saveOnboardingData(data: any) {
    const response = await axios.post("/auth/save-onboarding", data);
    return response.data;
  }

  static async bootstrap() {
    const response = await axios.get("/auth/bootstrap");
    return response.data;
  }

  static async joinWaitlist(data: {
    name: string;
    email: string;
    profession: string;
  }) {
    const response = await axios.post("/waitlist/join", data);
    return response.data;
  }

  static async refreshToken() {
    return await refreshAuthToken();
  }
}

export default AuthApi;
