<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
  >
    <div class="max-w-8xl mx-auto px-4 sm:px-6 py-2">
      <div class="flex items-center justify-between">
        <!-- Logo Section -->
        <AppLogo size="md" @click="scroll('top')" />

        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <button
            v-for="item in navigationItems"
            :key="item.section"
            @click="scroll(item.section)"
            class="text-sm font-medium transition-colors duration-200 text-gray-600 hover:text-gray-900"
          >
            {{ item.name }}
          </button>
        </div>

        <!-- Mobile Menu Button & Login -->
        <div class="flex items-center space-x-2">
          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div class="flex-shrink-0">
            <GoogleLogin />
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden mt-4 pb-4 border-t border-gray-100"
      >
        <div class="flex flex-col space-y-3 pt-4">
          <button
            v-for="item in navigationItems"
            :key="item.section"
            @click="scroll(item.section)"
            class="text-left px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            {{ item.name }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import GoogleLogin from "@/common/functional-components/GoogleLogin.vue";
import { scrollToSection } from "@/helper/ui.helper";
import AppLogo from "@/common/components/AppLogo.vue";

// Router setup
const router = useRouter();

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Navigation items list for landing page sections
const navigationItems = [
  { name: "How It Works", section: "how-it-works" },
  { name: "Pricing", section: "pricing" },
  { name: "FAQ", section: "faq" },
];

// Navigation methods
const navigateTo = (path: string) => {
  router.push(path);
};

const scroll = (sectionId: string) => {
  scrollToSection(sectionId);
  isMobileMenuOpen.value = false; // Close mobile menu after scrolling
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>
