<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isVisible" class="mobile-warning-overlay">
        <div class="mobile-warning-card">
          <!-- Desktop Icon -->
          <div class="icon-container">
            <svg
              class="desktop-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>

          <!-- Heading -->
          <h2 class="heading">Best on Desktop</h2>

          <!-- Message -->
          <p class="message">
            GoGoResume is optimized for desktop browsers. Some features like
            <strong>PDF preview</strong> and <strong>resume editing</strong>
            may not work properly on mobile devices.
          </p>

          <p class="sub-message">
            For the best experience, please visit us on a computer.
          </p>

          <!-- Dismiss Button -->
          <button @click="dismiss" class="dismiss-btn">Continue Anyway</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const MOBILE_BREAKPOINT = 1000;
const SESSION_KEY = "mobile-warning-dismissed";

const isVisible = ref(false);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < MOBILE_BREAKPOINT;
  updateVisibility();
};

const updateVisibility = () => {
  const wasDismissed = sessionStorage.getItem(SESSION_KEY) === "true";
  isVisible.value = isMobile.value && !wasDismissed;
};

const dismiss = () => {
  sessionStorage.setItem(SESSION_KEY, "true");
  isVisible.value = false;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>

<style scoped>
.mobile-warning-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  padding: 1.5rem;
}

.mobile-warning-card {
  background-color: white;
  border-radius: 1rem;
  padding: 2.5rem 2rem;
  max-width: 360px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.desktop-icon {
  width: 64px;
  height: 64px;
  color: #374151;
}

.heading {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 1rem 0;
}

.message {
  font-size: 0.95rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0 0 0.75rem 0;
}

.message strong {
  color: #111827;
}

.sub-message {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0 0 1.75rem 0;
}

.dismiss-btn {
  width: 100%;
  padding: 0.875rem 1.5rem;
  background-color: #111827;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.dismiss-btn:hover {
  background-color: #374151;
}

.dismiss-btn:active {
  background-color: #1f2937;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

