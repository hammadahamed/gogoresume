<template>
  <footer class="py-8 sm:py-12 bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center space-x-2">
          <span class="text-2l sm:text-4xl font-semibold opacity-20"
            >GoGoResume</span
          >
        </div>

        <div>
          <div class="mx-auto w-fit flex items-center gap-4 scale-80">
            <a href="https://dang.ai/" target="_blank"
              ><img
                src="https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png"
                alt="Dang.ai"
                style="width: 150px; height: 54px"
                width="150"
                height="54"
            /></a>
            <a href="https://twelve.tools" target="_blank"
              ><img
                src="https://twelve.tools/badge0-white.svg"
                alt="Featured on Twelve Tools"
                width="200"
                height="54"
            /></a>
          </div>

          <br />

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
        </div>

        <div class="text-gray-400 text-xs sm:text-sm text-center md:text-right">
          © 2025 GoGoResume. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
</template>
