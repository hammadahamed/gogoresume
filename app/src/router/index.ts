import { createRouter, createWebHistory } from "vue-router";
import useAuthComposable from "../composables/useAuth";
import { accessTokenKey } from "@/api-factory/constants";
import { useUserStore } from "@/stores/useUserStore";
import { storeIntendedRoute } from "@/utils/routeUtils";
import { trackPageView } from "@/google.analytics";
import PaymentHistory from "@/modules/settings/PaymentHistory.vue";
import { applySEO } from "@/composables/useSEO";

// Lazy-loaded components using dynamic imports
// Define components using dynamic imports (to keep chunks separate for SEO)
const Main = () => import("../Main.vue");
const Login = () => import("../modules/home/Login.vue");
const Home = () => import("../modules/home/Home.vue");
const ProfileInfo = () => import("../modules/user-info/ProfileInfo.vue");
const ResumeBuilder = () => import("../modules/resume-builder/ResumeBuilder.vue");
const SavedResumes = () => import("../modules/saved-resumes/SavedResumes.vue");
const ResumeTweaker = () => import("../modules/resume-tweaker/ResumeTweaker.vue");
const Templates = () => import("../modules/templates/Templates.vue");
const LandingPageVue = () => import("../modules/home/LandingPage.vue");
const PaymentStatus = () => import("../modules/payment/PaymentStatus.vue");
const UserSettings = () => import("../modules/settings/UserSettings.vue");
const Pricing = () => import("../modules/pricing/PricingPage.vue");
const ExtensionSettings = () => import("../modules/extension/ExtensionSettings.vue");
const PrivacyPolicy = () => import("../modules/legal/PrivacyPolicy.vue");
const SupportPage = () => import("../modules/support/SupportPage.vue");

// If the user is logged in, eagerly trigger all imports in the background.
// This pre-fills the browser's module cache so 'lazy' navigation becomes instant.
const hasToken = typeof window !== 'undefined' && !!localStorage.getItem(accessTokenKey);

if (hasToken) {
  // Fire all imports in parallel (non-blocking)
  [Main, Login, Home, ProfileInfo, ResumeBuilder, SavedResumes, ResumeTweaker, 
   Templates, LandingPageVue, PaymentStatus, UserSettings, Pricing, 
   ExtensionSettings, PrivacyPolicy, SupportPage].forEach(fn => fn());
} else {
  console.log('[PERF] Using dynamic imports');
}

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
    path: "/payment-history",
    component: Main,
    children: [{ path: "", component: PaymentHistory }],
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
    meta: {
      title:
        "GoGoResume – AI Resume Tailor + Autofill Assistant | ATS Optimized Resume Builder",
      description:
        "Tailor your resume to any job instantly + autofill job applications in one click. AI-powered ATS resume optimizer that matches your resume to job descriptions automatically.",
      keywords:
        "ATS resume checker, resume keyword optimizer, how to match resume to job description, autofill job applications, chrome extension autofill resume, resume writer ai, ATS resume scanner, resume tailored for job",
    },
  },
  ...protectedRoutes,
  {
    path: "/login",
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: "/payment-status",
    component: PaymentStatus,
    meta: { requiresAuth: true },
  },
  {
    path: "/privacy-policy",
    component: PrivacyPolicy,
    meta: { requiresAuth: false },
  },
  {
    path: "/support",
    component: SupportPage,
    meta: { requiresAuth: false },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Skip bootstrap on landing page for faster load
  if (to.path === "/") {
    next();
    return;
  }

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

// Track page views for SPAs - Firebase Analytics only auto-tracks initial page load,
// not route changes in Single Page Applications
router.afterEach((to) => {
  trackPageView(to.fullPath, to.meta?.title as string | undefined);

  // Apply SEO meta tags for each route
  if (to.meta?.title || to.meta?.description) {
    applySEO({
      title: to.meta.title as string,
      description: to.meta.description as string,
      keywords: to.meta.keywords as string,
      canonical: `https://gogoresume.com${to.path}`,
    });
  }
});

export default router;
