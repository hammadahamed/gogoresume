import { createRouter, createWebHistory } from "vue-router";
import useAuthComposable from "../composables/useAuth";
import { accessTokenKey } from "@/api-factory/constants";
import { useUserStore } from "@/stores/useUserStore";
import { storeIntendedRoute } from "@/utils/routeUtils";

// Lazy-loaded components using dynamic imports
const Main = () => import("../Main.vue");
const CeLogin = () => import("../modules/home/CeLogin.vue");
const Home = () => import("../modules/home/Home.vue");
const ProfileInfo = () => import("../modules/user-info/ProfileInfo.vue");
const ResumeBuilder = () =>
  import("../modules/resume-builder/ResumeBuilder.vue");
const SavedResumes = () => import("../modules/saved-resumes/SavedResumes.vue");
const ResumeTweaker = () =>
  import("../modules/resume-tweaker/ResumeTweaker.vue");
const Templates = () => import("../modules/templates/Templates.vue");
const LandingPageVue = () => import("../modules/home/LandingPage.vue");
const PaymentStatus = () => import("../modules/payment/PaymentStatus.vue");
const UserSettings = () => import("../modules/settings/UserSettings.vue");
const NotFoundPage = () => import("../NotFoundPage.vue");
const Pricing = () => import("../modules/pricing/PricingPage.vue");
const ExtensionSettings = () =>
  import("../modules/extension/ExtensionSettings.vue");

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
    path: "/master-profile",
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

  {
    path: "/chrome-extension",
    component: Main,
    children: [{ path: "", component: ExtensionSettings }],
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
    path: "/payment-status",
    component: PaymentStatus,
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

  // Check if we need to preserve extension parameter
  const isExtensionMode =
    to.query.extension === "true" || from.query.extension === "true";
  const preserveExtension = isExtensionMode && !to.query.extension;

  // If route requires auth and user is not authenticated
  if (requiresAuth) {
    if (!hasToken) {
      // Store the intended route before redirecting
      storeIntendedRoute({
        path: to.path,
        query: to.query,
        hash: to.hash,
      });

      // No token, redirect to login
      if (isExtensionMode) {
        next({ path: "/login", query: { extension: "true" } });
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
    if (isExtensionMode) {
      next({ path: "/home", query: { extension: "true" } });
    } else {
      next({ path: "/home" });
    }
    return;
  }

  // Preserve extension parameter if needed
  if (preserveExtension) {
    next({
      path: to.path,
      query: { ...to.query, extension: "true" },
      hash: to.hash,
    });
    return;
  }

  // Otherwise proceed normally
  next();
});

export default router;
