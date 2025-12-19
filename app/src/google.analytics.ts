// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics, logEvent } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3jzTeZ_cRrtgqCywqaqzZnOtoIOcAMwE",
  authDomain: "gogo-resume.firebaseapp.com",
  projectId: "gogo-resume",
  storageBucket: "gogo-resume.firebasestorage.app",
  messagingSenderId: "603157251227",
  appId: "1:603157251227:web:5a6c735b1d529d2ce2b23e",
  measurementId: "G-0YT42WHJTQ",
};

let analytics: Analytics | null = null;

export const initializeGoogleAnalytics = () => {
  // Only initialize in browser environment and production
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") {
    console.log("Google Analytics: Skipping initialization in development");
    return;
  }

  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    console.log("Google Analytics initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Google Analytics:", error);
  }
};

// Helper function to track events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (!analytics) {
    if (process.env.NODE_ENV === "development") {
      console.log("GA Event:", eventName, eventParams);
    }
    return;
  }

  try {
    logEvent(analytics, eventName, eventParams);
  } catch (error) {
    console.error("Failed to track event:", error);
  }
};

// Helper function to track page views
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (!analytics) {
    if (process.env.NODE_ENV === "development") {
      console.log("GA Page View:", pagePath, pageTitle);
    }
    return;
  }

  try {
    logEvent(analytics, "page_view", {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  } catch (error) {
    console.error("Failed to track page view:", error);
  }
};

export { analytics };
