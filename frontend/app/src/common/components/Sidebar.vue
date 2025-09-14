<template>
  <div class="flex flex-col h-full w-64 border-r border-gray-200">
    <!-- Logo/Header -->
    <AppLogo container-class="p-6" @click="router.push('/')" />
    <!-- Navigation Items -->
    <nav class="flex-1 py-6 ml-2">
      <ul class="space-y-4 px-3">
        <li v-for="item in sidebarItems" :key="item.id">
          <button
            @click="!item.disabled && appStore.setActiveTab(item.id)"
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

    <!-- User Profile Section -->
    <div
      class="p-4 border-t border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
      v-if="currentUser"
      @click="router.push('/settings')"
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

const appStore = useAppStore();
const router = useRouter();

const props = defineProps<{
  items?: SidebarItem[];
  title?: string;
  logo?: string;
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
</script>

<style scoped>
/* Custom styles for sidebar */
</style>
