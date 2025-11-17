import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export const useAppStore = defineStore("app", () => {
  // State
  const isAppLoading = ref(false);
  const activeTab = ref("home");
  const sidebarCollapsed = ref(false);
  const showOnboarding = ref(false);
  const isExtensionMode = ref(false);

  // Router instance
  const router = useRouter();

  // Getters (computed)
  const currentRoute = computed(() => activeTab.value);

  // Actions
  const setActiveTab = (tabId: string) => {
    activeTab.value = tabId;

    // Navigate to the route
    if (tabId === "home") {
      router.push("/home");
    } else {
      router.push(`/${tabId}`);
    }
  };

  const initializeFromRoute = (routePath: string) => {
    const path = routePath.replace("/", "") || "home";
    activeTab.value = path;
  };

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  };

  const setSidebarCollapsed = (collapsed: boolean) => {
    sidebarCollapsed.value = collapsed;
  };

  // Reset store state
  const reset = () => {
    activeTab.value = "home";
    sidebarCollapsed.value = false;
  };

  return {
    // State
    isAppLoading,
    activeTab,
    sidebarCollapsed,
    showOnboarding,
    isExtensionMode,
    // Getters
    currentRoute,

    // Actions
    setActiveTab,
    initializeFromRoute,
    toggleSidebar,
    setSidebarCollapsed,
    reset,
  };
});
