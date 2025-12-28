<template>
  <header class="mobile-header">
    <!-- Hamburger Menu Button -->
    <button
      class="hamburger-btn"
      @click="$emit('toggle-menu')"
      aria-label="Open menu"
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
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- App Logo (Center) -->
    <div class="flex-1 flex justify-center">
      <AppLogo size="sm" container-class="" @click="router.push('/')" />
    </div>

    <!-- User Avatar (Right) -->
    <div
      class="user-avatar"
      v-if="currentUser"
      @click="router.push('/settings')"
    >
      <div
        v-if="!currentUser.profilePicture"
        class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
      >
        <span class="text-white font-medium text-xs">
          {{ userInitials }}
        </span>
      </div>
      <img
        v-else
        :src="currentUser.profilePicture"
        :alt="currentUser.firstName"
        class="w-8 h-8 rounded-full object-cover"
      />
    </div>
    <div v-else class="w-8"></div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";
import AppLogo from "./AppLogo.vue";

const router = useRouter();
const userStore = useUserStore();

const emit = defineEmits<{
  (e: "toggle-menu"): void;
}>();

const currentUser = computed(() => userStore.user);

const userInitials = computed(() => {
  if (!currentUser.value) return "";
  return (
    currentUser.value.firstName[0] + (currentUser.value?.lastName[0] ?? "")
  );
});
</script>

<style scoped>
.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 30;
}

.hamburger-btn {
  padding: 0.5rem;
  color: #374151;
  border-radius: 0.5rem;
  transition: all 0.15s;
}

.hamburger-btn:hover {
  background-color: #f3f4f6;
}

.user-avatar {
  cursor: pointer;
}

/* Hide on desktop (>= 1000px) */
@media (min-width: 1000px) {
  .mobile-header {
    display: none;
  }
}
</style>
