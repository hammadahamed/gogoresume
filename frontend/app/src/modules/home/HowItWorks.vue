<template>
  <section id="how-it-works" class="working-process-section">
    <div class="container mx-auto px-4 py-12 sm:py-16">
      <!-- Process Steps -->
      <div class="-mt-10">
        <Home :homeView="true" />
      </div>
      <!-- Decorative Elements -->
      <div class="decorative-triangle"></div>
      <div class="decorative-star"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BusinessPlanningIcon from "@/assets/svg/landing/business-planning.svg";
import DesignStrategyIcon from "@/assets/svg/landing/design-strategy.svg";
import GrowBusinessIcon from "@/assets/svg/landing/grow-business.svg";
import ArrowIcon from "@/assets/svg/landing/arrow.svg";
import Illus1 from "./Illus1.vue";
import Illus2 from "./Illus2.vue";
import Illus3 from "./Illus3.vue";
import Home from "./Home.vue";
</script>

<style lang="scss" scoped>
.working-process-section {
  position: relative;
  background: white;
  overflow: hidden;

  .container {
    position: relative;
    z-index: 2;
  }

  .process-step {
    flex: 0 0 auto;
    text-align: center;
    max-width: 280px;
    margin: 0 auto;

    .step-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 16px;
      line-height: 1.3;
    }

    .step-description {
      font-size: 0.875rem;
      color: #6b7280;
      line-height: 1.6;
      max-width: 240px;
      margin: 0 auto;
    }
  }

  .arrow-container {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .decorative-triangle {
    position: absolute;
    top: 120px;
    left: 80px;
    width: 50px;
    height: 50px;
    border: 2px solid rgba(139, 92, 246, 0.15);
    border-radius: 6px;
    transform: rotate(45deg);
    z-index: 1;
  }

  .decorative-star {
    position: absolute;
    top: 80px;
    right: 120px;
    width: 32px;
    height: 32px;
    background: #ffd700;
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
    z-index: 1;
    animation: sparkle 3s ease-in-out infinite;
  }

  @keyframes sparkle {
    0%,
    100% {
      transform: scale(1) rotate(0deg);
      opacity: 1;
    }
    50% {
      transform: scale(1.1) rotate(180deg);
      opacity: 0.8;
    }
  }

  // Responsive adjustments
  @media (max-width: 1024px) {
    .process-step {
      margin-bottom: 3rem;

      .icon-container {
        width: 80px;
        height: 80px;
      }
    }

    .decorative-triangle {
      top: 100px;
      left: 60px;
      width: 40px;
      height: 40px;
    }

    .decorative-star {
      top: 60px;
      right: 80px;
      width: 28px;
      height: 28px;
    }
  }

  @media (max-width: 768px) {
    .container {
      padding: 3rem 1.5rem;
    }

    .process-step {
      max-width: 100%;
      margin-bottom: 2.5rem;

      .icon-container {
        width: 76px;
        height: 76px;
        margin-bottom: 18px;
      }

      .step-title {
        font-size: 1.2rem;
        margin-bottom: 14px;
      }

      .step-description {
        font-size: 0.875rem;
        max-width: 280px;
      }
    }

    .arrow-container {
      display: none;
    }

    .decorative-triangle,
    .decorative-star {
      display: none;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 2rem 1rem;
    }

    .process-step {
      margin-bottom: 2rem;

      .icon-container {
        width: 70px;
        height: 70px;
        margin-bottom: 16px;
      }

      .step-title {
        font-size: 1.1rem;
        margin-bottom: 12px;
      }

      .step-description {
        font-size: 0.8rem;
        line-height: 1.5;
        max-width: 250px;
      }
    }
  }
}
</style>
