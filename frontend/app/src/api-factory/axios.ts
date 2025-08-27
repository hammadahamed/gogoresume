import axios, { AxiosRequestConfig, AxiosError } from "axios";
import {
  accessTokenKey,
  refreshTokenKey,
  AuthErrorCode,
  CRITICAL_AUTH_ERRORS,
} from "./constants";
import ApiUtils from "./api-util";
import { toast } from "vue3-toastify";

const baseURL = ApiUtils.getBaseURL();

// Helper function for handling auth failures
const handleAuthFailure = (restricted: boolean = false) => {
  localStorage.removeItem(accessTokenKey);
  localStorage.removeItem(refreshTokenKey);
  localStorage.setItem(
    "lastVisitedUrl",
    window.location.pathname + window.location.search
  );
  window.location.href = restricted ? "/auth?restricted=true" : "/";
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 120000,
});

// Helper function to refresh the token
export const refreshAuthToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem(refreshTokenKey);
  if (!refreshToken) return null;

  try {
    const response = await axios.post(`${baseURL}/auth/refresh`, {
      refreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Update tokens in localStorage
    if (accessToken) localStorage.setItem(accessTokenKey, accessToken);
    if (newRefreshToken) localStorage.setItem(refreshTokenKey, newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    return null;
  }
};

// Add authorization token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(accessTokenKey);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Handle 401 errors and refresh tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Handle network errors (server down)
    if (!error.response) {
      console.error("Network error in axios interceptor");
      toast.error(
        "Network error. Check your internet connection. Or may be the server is down."
      );
      localStorage.setItem(
        "lastVisitedUrl",
        window.location.pathname + window.location.search
      );
      //   window.location.href = "/network-error";
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      const originalRequest: any = error.config;
      const errorData = error.response?.data as {
        message?: string;
        code?: string;
      };
      const errorCode: string = errorData?.code || "";

      // Case 1: Access token expired - try to refresh
      if (errorCode === AuthErrorCode.TOKEN_EXPIRED) {
        try {
          const newAccessToken = await refreshAuthToken();
          if (newAccessToken) {
            // Retry the original request with the new token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return axiosInstance(originalRequest);
          } else {
            // If refresh token failed (likely expired), handle auth failure
            handleAuthFailure();
            return Promise.reject(error);
          }
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          handleAuthFailure();
          return Promise.reject(error);
        }
      }

      // Case 2: Critical errors that require logout
      if (
        errorCode &&
        CRITICAL_AUTH_ERRORS.includes(errorCode as AuthErrorCode)
      ) {
        console.log(">>> errorCode", errorCode);
        // Special handling for restricted users
        handleAuthFailure(errorCode === AuthErrorCode.USER_RESTRICTED);
      } else {
        // Case 3: Other auth errors - just log them, don't logout
        console.error(
          "Authentication error:",
          errorData?.message || "Unknown error"
        );
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
