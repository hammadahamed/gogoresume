import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import "./styleOverrides.scss";
import App from "./App.vue";
import router from "./router";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import "./App.scss";
import { setupMessageHandler } from "./utils/messageHandler";
import { GoogleAuth } from "./helper/google-auth.helper";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-right",
  theme: "dark",
} as ToastContainerOptions);

GoogleAuth.initializeGoogleApp(app);

app.mount("#app");

// Set up message handler for suggestions
setupMessageHandler();
