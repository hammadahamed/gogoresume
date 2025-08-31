<template>
  <section class="working-process-section">
    <div class="container mx-auto px-4 py-12 sm:py-16">
      <!-- Header -->
      <div class="text-center mb-12 sm:mb-16">
        <p class="text-purple-600 text-sm font-semibold uppercase tracking-wide mb-2">PROCESS</p>
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Working Process</h2>
      </div>

      <!-- Process Steps -->
      <div class="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 max-w-5xl mx-auto">
        <!-- Step 1: Business Planning -->
        <div class="process-step">
          <div class="icon-container">
            <BusinessPlanningIcon class="w-7 h-7" />
          </div>
          <h3 class="step-title">Business Planning</h3>
          <p class="step-description">
            Lorem Ipsum Dolor Sit Amet<br />
            Consectetur. Sagittis Duis Pharetra<br />
            Fermentum Eget Netus
          </p>
        </div>

        <!-- Arrow 1 -->
        <div class="hidden lg:block arrow-container">
          <ArrowIcon class="w-12 h-4" />
        </div>

        <!-- Step 2: Design Strategy -->
        <div class="process-step">
          <div class="icon-container">
            <DesignStrategyIcon class="w-7 h-7" />
          </div>
          <h3 class="step-title">Design Strategy</h3>
          <p class="step-description">
            Lorem Ipsum Dolor Sit Amet<br />
            Consectetur. Sagittis Ac Adipiscing<br />
            Vulputate Sit Tellus
          </p>
        </div>

        <!-- Arrow 2 -->
        <div class="hidden lg:block arrow-container">
          <ArrowIcon class="w-12 h-4" />
        </div>

        <!-- Step 3: Grow Your Business -->
        <div class="process-step">
          <div class="icon-container">
            <GrowBusinessIcon class="w-7 h-7" />
          </div>
          <h3 class="step-title">Grow Your Business</h3>
          <p class="step-description">
            Lorem Ipsum Dolor Sit Amet<br />
            Consectetur. Pellentesque Dolor<br />
            Lacus Tempor Proin
          </p>
        </div>
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

    .icon-container {
      width: 88px;
      height: 88px;
      background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      position: relative;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.25);
    }

    .step-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1F2937;
      margin-bottom: 16px;
      line-height: 1.3;
    }

    .step-description {
      font-size: 0.875rem;
      color: #6B7280;
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
    background: #FFD700;
    clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    z-index: 1;
    animation: sparkle 3s ease-in-out infinite;
  }

  @keyframes sparkle {
    0%, 100% {
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
