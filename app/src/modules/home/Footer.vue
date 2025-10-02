<template>
  <footer class="py-8 sm:py-12 bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center space-x-2">
          <span class="text-2l sm:text-4xl font-semibold opacity-20"
            >GoGoResume</span
          >
        </div>

        <!-- Navigation Links -->
        <div
          class="flex flex-wrap justify-center md:justify-end gap-4 text-xs sm:text-sm"
        >
          <router-link
            to="/privacy-policy"
            class="transition-all duration-200 hover:opacity-70"
            style="color: white"
          >
            Privacy Policy
          </router-link>
          <router-link
            to="/support"
            class="transition-all duration-200 hover:opacity-70"
            style="color: white"
          >
            Support
          </router-link>
          <a
            href="mailto:support@gogoresume.com"
            class="transition-all duration-200 hover:opacity-70"
            style="color: white"
          >
            Contact
          </a>
        </div>

        <div class="text-gray-400 text-xs sm:text-sm text-center md:text-right">
          © 2025 GoGoResume. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>
