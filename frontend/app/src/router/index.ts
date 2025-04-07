import { createRouter, createWebHistory } from "vue-router";
import Main from "../Main.vue";
import CeApp from "../CeApp.vue";

const routes = [
  { path: "/", component: Main },
  { path: "/ce", component: CeApp },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
