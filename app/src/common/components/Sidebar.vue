<template>
  <!-- Backdrop for mobile -->
  <div v-if="isOpen" class="sidebar-backdrop" @click="$emit('close')"></div>

  <div class="sidebar" :class="{ open: isOpen }">
    <!-- Mobile Close Button -->
    <button
      class="mobile-close-btn"
      @click="$emit('close')"
      aria-label="Close menu"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Logo/Header -->
    <AppLogo size="sm" container-class="p-6 py-5" @click="handleLogoClick" />

    <!-- Navigation Items -->
    <nav class="flex-1 py-6 ml-2">
      <ul class="space-y-4 px-3">
        <li v-for="item in sidebarItems" :key="item.id">
          <button
            @click="handleNavClick(item)"
            :disabled="item.disabled"
            :class="[
              'w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors duration-150',
              item.disabled
                ? 'opacity-50 cursor-not-allowed'
                : appStore.activeTab === item.id
                ? ' text-black font-medium'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
            ]"
          >
            <div class="flex items-center space-x-3">
              <component
                :is="item.icon"
                class="w-5 h-5"
                :class="[
                  appStore.activeTab === item.id ? 'opacity-100' : 'opacity-50',
                ]"
              />
              <span
                class="text-sm"
                :class="{
                  'scale-101 transition-all duration-300':
                    appStore.activeTab === item.id,
                }"
                >{{ item.label }}</span
              >
            </div>
            <!-- Badge -->
            <span
              v-if="item.badge"
              class="ml-auto bg-indigo-100 text-indigo-600 text-xs font-medium px-2 py-1 rounded-full"
            >
              {{ item.badge }}
            </span>
          </button>
        </li>
      </ul>
    </nav>

    <!-- Feedback Button -->
    <div class="px-4 py-3">
      <a
        href="https://gogoresume.userjot.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:scale-101 transition-all duration-150 flex flex-col space-x-2 px-3 py-2 text-sm text-gray-800 hover:text-[var(--primary-color)] border border-gray-300 hover:border-[var(--primary-color)] bg-gray-50 rounded group"
      >
        <div class="flex items-center space-x-2">
          <FeedbackIcon
            class="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity"
          />
          <span class="font-medium">Got Feedback ?</span>
        </div>
      </a>
    </div>

    <!-- User Profile Section -->
    <div
      class="p-4 border-t border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
      v-if="currentUser"
      @click="handleProfileClick"
    >
      <div class="flex items-center space-x-3">
        <div
          v-if="!currentUser.profilePicture"
          class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0"
        >
          <span class="text-white font-medium text-sm">
            {{ userInitials }}
          </span>
        </div>
        <img
          v-else
          :src="currentUser.profilePicture"
          :alt="currentUser.firstName + currentUser.lastName"
          class="w-10 h-10 rounded-full flex-shrink-0 object-cover"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{ currentUser.firstName }} {{ currentUser.lastName }}
          </p>
          <p class="text-xs text-gray-500 truncate">
            {{ currentUser.email }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { SidebarItem, SidebarUser } from "../../types/sidebar";
import { DEFAULT_SIDEBAR_ITEMS } from "../../types/sidebar";
import { useAppStore } from "../../stores/useAppStore";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";
import { useDataManager } from "../../composables/useDataManager";
import AppLogo from "./AppLogo.vue";
import FeedbackIcon from "@/assets/svg/feedback.svg";

const appStore = useAppStore();
const router = useRouter();

const props = defineProps<{
  items?: SidebarItem[];
  title?: string;
  logo?: string;
  isOpen?: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const userStore = useUserStore();

// Use provided items or default ones
const sidebarItems = computed(() => props.items || DEFAULT_SIDEBAR_ITEMS);

const currentUser = computed(() => userStore.user);

const appTitle = computed(() => props.title || "GoGoResume");
const appLogo = computed(() => props.logo || "GR");

const userInitials = computed(() => {
  return (
    currentUser.value.firstName[0] + (currentUser.value?.lastName[0] ?? "")
  );
});

// Handle navigation click - close sidebar on mobile after navigation
const handleNavClick = (item: SidebarItem) => {
  if (!item.disabled) {
    appStore.setActiveTab(item.id);
    emit("close");
  }
};

const handleLogoClick = () => {
  router.push("/");
  emit("close");
};

const handleProfileClick = () => {
  router.push("/settings");
  emit("close");
};
</script>

<style scoped>
/* Desktop styles */
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 16rem; /* w-64 */
  border-right: 1px solid #e5e7eb;
  background-color: white;
}

.mobile-close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  color: #6b7280;
  border-radius: 0.5rem;
  transition: all 0.15s;
}

.mobile-close-btn:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
}

/* Mobile styles (< 1000px) */
@media (max-width: 999px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  .sidebar.open {
    transform: translateX(0);
  }
}

/* Desktop styles (>= 1000px) */
@media (min-width: 1000px) {
  .mobile-close-btn {
    display: none;
  }

  .sidebar-backdrop {
    display: none;
  }
}
</style>
