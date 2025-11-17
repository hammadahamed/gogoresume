<template>
  <section
    class="hero-section mx-auto pt-20 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden"
  >
    <!-- Clean Geometric Background Elements -->
    <div class="absolute inset-0 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <div class="text-center max-w-4xl mx-auto mt-10">
        <div
          class="mb-10 text-black border-2 border-black w-min whitespace-nowrap mx-auto px-4 py-0.5 rounded-full text-[13px] font-semibold"
        >
          <p>The Jarvis for Job-Hunters 🔥</p>
        </div>
        <p
          class="hero-headline text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
        >
          Screw the
          <span class="bg-highlight text-black px-1 sm:px-2">ATS</span>, Get the
          <span class="squiggly-underline animated text-black px-1 sm:px-2"
            >Interview
          </span>
        </p>
        <p
          class="hero-subtitle text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0"
        >
          AI-powered resume optimization that lands your resume on the hiring
          manager's desk, not in the ATS black hole.
        </p>
        <div
          class="hero-buttons flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
        >
          <button
            @click="gotoLogin"
            class="hero-button-primary px-4 py-[13px] border-2 border-black hover:opacity-70 text-gray-700 hover:text-primary text-sm sm:text-base font-semibold rounded-full transition-all duration-200 cursor-pointer"
          >
            Get Started Now
          </button>
          <div class="hero-button-primary">
            <SpecialBtn
              @click="openExtensionPage"
              size="medium"
              variant="default"
              :primaryColor="'black'"
              :secondaryColor="'white'"
              :textColor="'white'"
              className="py-3"
            >
              <template #text>
                <span class="text-md font-semibold">Get Chrome Extension</span>
              </template>
            </SpecialBtn>
          </div>
        </div>
      </div>
      <div
        class="hero-demo h-min-[200px] w-[80%] mx-auto mt-24 bg-gray-200 rounded-xl overflow-hidden"
        style="aspect-ratio: 16/9"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SpecialBtn from "@/common/components/SpecialBtn.vue";
import { scrollToSection } from "@/helper/ui.helper";
import { openExtensionPage } from "@/helper/ui.helper";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";

defineEmits<{
  scrollToFeatures: [];
  scrollToPricing: [];
}>();

const userStore = useUserStore();
const router = useRouter();

const gotoLogin = () => {
  if (userStore.user) {
    router.push("/home");
  } else {
    router.push("/login");
  }
};
</script>

<style scoped lang="scss">
.hero-section {
  max-width: 1200px;

  position: relative;
}

// Hero entrance animations
@keyframes heroFadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroFadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes heroScale {
  0% {
    opacity: 0;
    transform: translateY(15px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes backgroundElementEntrance {
  0% {
    opacity: 0;
    transform: translateY(5px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

// Clean, gentle animations for geometric elements
@keyframes gentleFloat {
  0%,
  100% {
    transform: translateY(0px) rotate(45deg);
  }
  50% {
    transform: translateY(-8px) rotate(45deg);
  }
}

@keyframes gentleRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes gentlePulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

// Hero element animations
.hero-headline {
  opacity: 0;
  animation: heroFadeInUp 0.6s ease-out 0.1s forwards;
}

.hero-subtitle {
  opacity: 0;
  animation: heroFadeInUp 0.6s ease-out 0.1s forwards;
}

.hero-buttons {
  opacity: 0;
  animation: heroFadeInUp 0.6s ease-out 0.1s forwards;
}

.hero-button-primary {
  opacity: 0;
  animation: heroScale 0.6s ease-out 0.1s forwards;
}

.hero-button-secondary {
  opacity: 0;
  animation: heroFadeIn 0.6s ease-out 0.1s forwards;
}

.hero-demo {
  opacity: 0;
  animation: heroScale 0.7s ease-out 0.1s forwards;
}

// Clean Geometric Background Elements
.decorative-triangle-1 {
  position: absolute;
  top: 15%;
  left: 8%;
  width: 60px;
  height: 60px;
  border: 2px solid rgba(99, 102, 241, 0.12);
  border-radius: 8px;
  transform: rotate(45deg);
  opacity: 0;
  animation: gentleFloat 8s ease-in-out infinite,
    backgroundElementEntrance 0.4s ease-out 0.8s forwards;
}

.decorative-triangle-2 {
  position: absolute;
  top: 65%;
  right: 12%;
  width: 45px;
  height: 45px;
  border: 2px solid rgba(168, 85, 247, 0.1);
  border-radius: 6px;
  transform: rotate(30deg);
  opacity: 0;
  animation: gentleFloat 6s ease-in-out infinite reverse,
    backgroundElementEntrance 0.4s ease-out 1.2s forwards;
}

.decorative-square-1 {
  position: absolute;
  top: 40%;
  right: 18%;
  width: 35px;
  height: 35px;
  background: linear-gradient(
    45deg,
    rgba(59, 130, 246, 0.08),
    rgba(99, 102, 241, 0.06)
  );
  border-radius: 8px;
  opacity: 0;
  animation: gentleRotate 12s linear infinite,
    backgroundElementEntrance 0.4s ease-out 1s forwards;
}

.decorative-square-2 {
  position: absolute;
  top: 25%;
  left: 75%;
  width: 28px;
  height: 28px;
  background: linear-gradient(
    45deg,
    rgba(16, 185, 129, 0.08),
    rgba(52, 211, 153, 0.06)
  );
  border-radius: 6px;
  opacity: 0;
  animation: gentleRotate 10s linear infinite reverse,
    backgroundElementEntrance 0.4s ease-out 1.4s forwards;
}

.decorative-circle-1 {
  position: absolute;
  top: 55%;
  left: 12%;
  width: 50px;
  height: 50px;
  background: radial-gradient(
    circle,
    rgba(139, 92, 246, 0.08) 0%,
    rgba(139, 92, 246, 0.02) 70%
  );
  border-radius: 50%;
  opacity: 0;
  animation: gentlePulse 4s ease-in-out infinite,
    backgroundElementEntrance 0.4s ease-out 1.6s forwards;
}

.decorative-circle-2 {
  position: absolute;
  top: 20%;
  right: 8%;
  width: 40px;
  height: 40px;
  background: radial-gradient(
    circle,
    rgba(245, 101, 101, 0.08) 0%,
    rgba(245, 101, 101, 0.02) 70%
  );
  border-radius: 50%;
  opacity: 0;
  animation: gentlePulse 5s ease-in-out infinite reverse,
    backgroundElementEntrance 0.4s ease-out 1.8s forwards;
}

.decorative-line-1 {
  position: absolute;
  top: 35%;
  left: 5%;
  width: 80px;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(99, 102, 241, 0.15),
    rgba(99, 102, 241, 0.05)
  );
  border-radius: 1px;
  opacity: 0;
  animation: backgroundElementEntrance 0.4s ease-out 2s forwards;
}

.decorative-line-2 {
  position: absolute;
  top: 75%;
  right: 25%;
  width: 60px;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(168, 85, 247, 0.15),
    rgba(168, 85, 247, 0.05)
  );
  border-radius: 1px;
  transform: rotate(20deg);
  opacity: 0;
  animation: backgroundElementEntrance 0.4s ease-out 2.2s forwards;
}

.bg-gradient-blur-1 {
  position: absolute;
  top: -10%;
  right: -15%;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(99, 102, 241, 0.03) 0%,
    transparent 60%
  );
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0;
  animation: backgroundElementEntrance 0.4s ease-out 2.4s forwards;
}

.bg-gradient-blur-2 {
  position: absolute;
  bottom: -15%;
  left: -15%;
  width: 350px;
  height: 350px;
  background: radial-gradient(
    circle,
    rgba(168, 85, 247, 0.03) 0%,
    transparent 60%
  );
  border-radius: 50%;
  filter: blur(1px);
  opacity: 0;
  animation: backgroundElementEntrance 0.4s ease-out 2.6s forwards;
}

// Responsive adjustments for geometric elements
@media (max-width: 768px) {
  .decorative-triangle-1,
  .decorative-triangle-2 {
    width: 35px;
    height: 35px;
  }

  .decorative-square-1 {
    width: 25px;
    height: 25px;
  }

  .decorative-square-2 {
    width: 20px;
    height: 20px;
  }

  .decorative-circle-1 {
    width: 35px;
    height: 35px;
  }

  .decorative-circle-2 {
    width: 28px;
    height: 28px;
  }

  .decorative-line-1 {
    width: 50px;
  }

  .decorative-line-2 {
    width: 40px;
  }

  .bg-gradient-blur-1,
  .bg-gradient-blur-2 {
    width: 250px;
    height: 250px;
  }

  // Even faster animations on mobile - all main content at once
  .hero-headline {
    animation-duration: 0.5s;
    animation-delay: 0.05s;
  }

  .hero-subtitle {
    animation-duration: 0.5s;
    animation-delay: 0.05s;
  }

  .hero-buttons {
    animation-duration: 0.5s;
    animation-delay: 0.05s;
  }

  .hero-button-primary {
    animation-delay: 0.05s;
  }

  .hero-button-secondary {
    animation-delay: 0.05s;
  }

  .hero-demo {
    animation-delay: 0.05s;
  }
}

@media (max-width: 480px) {
  .bg-gradient-blur-1,
  .bg-gradient-blur-2 {
    display: none; // Hide large blur elements on very small screens
  }

  .decorative-triangle-1,
  .decorative-triangle-2 {
    width: 28px;
    height: 28px;
  }

  .decorative-square-1,
  .decorative-square-2 {
    width: 18px;
    height: 18px;
  }

  .decorative-circle-1,
  .decorative-circle-2 {
    width: 25px;
    height: 25px;
  }
}

// Accessibility: Respect user's motion preferences
@media (prefers-reduced-motion: reduce) {
  .hero-headline,
  .hero-subtitle,
  .hero-buttons,
  .hero-button-primary,
  .hero-button-secondary,
  .hero-demo {
    animation: none;
    opacity: 1;
    transform: none;
  }

  // Disable all geometric element animations for reduced motion
  .decorative-triangle-1,
  .decorative-triangle-2 {
    animation: none;
    opacity: 1;
    transform: rotate(45deg); // Keep basic rotation for triangles
  }

  .decorative-square-1,
  .decorative-square-2,
  .decorative-circle-1,
  .decorative-circle-2,
  .decorative-line-1,
  .decorative-line-2,
  .bg-gradient-blur-1,
  .bg-gradient-blur-2 {
    animation: none;
    opacity: 1;
    transform: none;
  }
}

// Subtle background animation
.hero-section {
  transform-origin: center;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}
</style>
