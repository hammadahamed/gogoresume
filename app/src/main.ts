import { createApp } from "vue";
import { createPinia } from "pinia";
// Critical CSS - load immediately (only what's needed for initial render)
import "./style.css";
import "./styleOverrides.scss";
import App from "./App.vue";
import router from "./router";

// Defer non-critical CSS and heavy dependencies
let Vue3Toastify: any;
let PrimeVue: any;
let DatePicker: any;
let GoogleAuth: any;

// Lazy load non-critical dependencies after initial render
const loadNonCriticalDeps = () => {
  return Promise.all([
    import("vue3-toastify").then((mod) => {
      Vue3Toastify = mod.default;
      import("vue3-toastify/dist/index.css");
    }),
    import("./App.scss"),
    import("./styles/animated-border.scss"),
    import("./styles/primevue-custom.scss"),
    import("./helper/google-auth.helper").then((mod) => {
      GoogleAuth = mod.GoogleAuth;
    }),
    // PrimeVue - only load if needed (not on landing page)
    import("primevue/config").then((mod) => {
      PrimeVue = mod.default;
      return import("primevue/datepicker").then((datePickerMod) => {
        DatePicker = datePickerMod.default;
      });
    }),
  ]);
};

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

// Mount app immediately for faster FCP
app.mount("#app");

// Load and initialize non-critical dependencies after mount
// Use requestIdleCallback or setTimeout to avoid blocking
const initNonCriticalDeps = () => {
  loadNonCriticalDeps().then(() => {
    // Initialize PrimeVue (needed for some routes, but not blocking initial render)
    if (PrimeVue) {
      import("@primevue/themes/aura").then((AuraMod) => {
        const Aura = AuraMod.default;
        import("@primevue/themes").then((themeMod) => {
          const { definePreset } = themeMod;
          const CustomPreset = definePreset(Aura, {
            semantic: {
              primary: {
                50: "#f6f6f6",
                100: "#e7e7e7",
                200: "#d1d1d1",
                300: "#b0b0b0",
                400: "#888888",
                500: "black",
                600: "#5d5d5d",
                700: "#4f4f4f",
                800: "#454545",
                900: "#3d3d3d",
                950: "#000000",
              },
            },
          });
          app.use(PrimeVue, {
            theme: {
              preset: CustomPreset,
              options: {
                darkModeSelector: "false",
                cssLayer: false,
              },
            },
          });
          if (DatePicker) {
            app.component("DatePicker", DatePicker);
          }
        });
      });
    }

    // Initialize toastify
    if (Vue3Toastify) {
      app.use(Vue3Toastify, {
        autoClose: 3000,
        position: "top-right",
        theme: "dark",
      });
    }

    // Initialize Google Auth
    if (GoogleAuth) {
      GoogleAuth.initializeGoogleApp(app);
    }
  });
};

// Defer initialization to avoid blocking initial render
if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(initNonCriticalDeps, { timeout: 3000 });
  } else {
    setTimeout(initNonCriticalDeps, 100);
  }
}

// Defer analytics initialization to reduce critical request chain
// Use requestIdleCallback for better performance, fallback to setTimeout
if (typeof window !== "undefined") {
  const initAnalytics = () => {
    import("./google.analytics").then((mod) => {
      mod.initializeGoogleAnalytics();
    });
    // import("./umami.analytics").then((mod) => {
    //   mod.initializeUmamiAnalytics();
    // });
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(initAnalytics);
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(initAnalytics, 2000);
  }
}
