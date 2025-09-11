import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import "./styleOverrides.scss";
import App from "./App.vue";
import router from "./router";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "./App.scss";
import "./styles/animated-border.scss";
import "./styles/primevue-custom.scss";
import { setupMessageHandler } from "./utils/messageHandler";
import { GoogleAuth } from "./helper/google-auth.helper";

// PrimeVue
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import DatePicker from "primevue/datepicker";
import { definePreset } from "@primevue/themes";

// Custom theme with black primary color
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

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PrimeVue, {
  theme: {
    preset: CustomPreset,
    options: {
      darkModeSelector: "false",
      cssLayer: false,
    },
  },
});
app.component("DatePicker", DatePicker);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-right",
  theme: "dark",
} as ToastContainerOptions);

GoogleAuth.initializeGoogleApp(app);

app.mount("#app");

// Set up message handler for suggestions
setupMessageHandler();
