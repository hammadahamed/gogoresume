import { createRouter, createWebHistory } from "vue-router";
import Main from "../Main.vue";
import CeLogin from "../modules/home/CeLogin.vue";

// Import all the page components
import Home from "../modules/home/Home.vue";
import ProfileInfo from "../modules/user-info/ProfileInfo.vue";
import ResumeBuilder from "../modules/resume-builder/ResumeBuilder.vue";
import SavedResumes from "../modules/saved-resumes/SavedResumes.vue";
import ResumeTweaker from "../modules/resume-tweaker/ResumeTweaker.vue";
import Templates from "../modules/templates/Templates.vue";
import LandingPageVue from "../modules/home/LandingPage.vue";
import PaymentSuccess from "../modules/payment/PaymentSuccess.vue";
import UserSettings from "../modules/settings/UserSettings.vue";
import NotFoundPage from "../NotFoundPage.vue";
import useAuthComposable from "../composables/useAuth";
import { accessTokenKey } from "@/api-factory/constants";
import { useUserStore } from "@/stores/useUserStore";
import Pricing from "../modules/pricing/PricingPage.vue";

const protectedRoutes = [
  {
    path: "/home",
    component: Main,
    children: [{ path: "", component: Home }],
    meta: { requiresAuth: true },
  },
  {
    path: "/pricing",
    component: Main,
    children: [{ path: "", component: Pricing }],
    meta: { requiresAuth: true, restrictPlan: true },
  },

  {
    path: "/profile-data",
    component: Main,
    children: [{ path: "", component: ProfileInfo }],
    meta: { requiresAuth: true },
  },
  {
    path: "/my-resumes",
    component: Main,
    children: [{ path: "", component: SavedResumes }],
    meta: { requiresAuth: true },
  },
  {
    path: "/resume-tweaker",
    component: Main,
    children: [{ path: "", component: ResumeTweaker }],
    meta: { requiresAuth: true },
  },
  {
    path: "/templates",
    component: Main,
    children: [{ path: "", component: Templates }],
    meta: { requiresAuth: true },
  },
  {
    path: "/resume-builder",
    component: Main,
    children: [{ path: "", component: ResumeBuilder }],
    meta: { requiresAuth: true },
  },
  {
    path: "/settings",
    component: Main,
    children: [{ path: "", component: UserSettings }],
    meta: { requiresAuth: true },
  },
];

protectedRoutes.forEach((route) => {
  route.meta = { ...route.meta, requiresAuth: true };
});

const routes = [
  {
    path: "/",
    component: LandingPageVue, // Landing page without sidebar
  },
  ...protectedRoutes,
  {
    path: "/login",
    component: CeLogin,
    meta: { requiresAuth: false },
  },
  {
    path: "/payment-success",
    component: PaymentSuccess,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const { bootstrap } = useAuthComposable(true);
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthRoute = to.matched.some((record) => record.meta.isAuthRoute);
  const hasToken = !!localStorage.getItem(accessTokenKey);

  // If route requires auth and user is not authenticated
  if (requiresAuth) {
    if (!hasToken) {
      // No token, redirect to login
      if (to.query.extension) {
        next({ path: "/login" });
      } else {
        next({ path: "/" });
      }
      return;
    }

    // Has token but no user data, try to load it
    if (!userStore.user) {
      try {
        await bootstrap();
      } catch (error) {
        return;
      }
    }
  }

  // If going to auth route but already authenticated
  if (isAuthRoute && hasToken) {
    next({ path: "/home" });
    return;
  }

  // Otherwise proceed normally
  next();
});

export default router;
