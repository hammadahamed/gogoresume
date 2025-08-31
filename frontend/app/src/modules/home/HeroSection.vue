<template>
  <section class="hero-section pt-20 sm:pt-24 pb-12 sm:pb-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center max-w-4xl mx-auto">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Screw the
          <span class="bg-highlight text-black px-1 sm:px-2">ATS</span>,
          <br />
          Get the
          <span class="bg-highlight text-black px-1 sm:px-2">Job</span>
        </h1>
        <p class="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
          AI-powered resume optimization that lands your resume on the hiring manager's desk, not in the ATS black
          hole.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
          <button
            @click="$emit('scrollToFeatures')"
            class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-primary hover:bg-primary-hover text-white text-sm sm:text-base font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Building Now
          </button>
          <button
            @click="$emit('scrollToPricing')"
            class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 hover:border-primary text-gray-700 hover:text-primary text-sm sm:text-base font-semibold rounded-lg transition-all duration-200"
          >
            View Pricing
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits<{
  scrollToFeatures: [];
  scrollToPricing: [];
}>();
</script>

<style scoped lang="scss">
.hero-section {
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23e5e7eb" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23e5e7eb" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="%23e5e7eb" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="%23e5e7eb" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="%23e5e7eb" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.5;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .hero-section {
    padding-top: 5rem;
    padding-bottom: 3rem;
    
    h1 {
      font-size: 2.25rem;
      line-height: 1.2;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
    }
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding-top: 4rem;
    padding-bottom: 2rem;
    
    h1 {
      font-size: 1.875rem;
      line-height: 1.3;
    }
    
    p {
      font-size: 1rem;
    }
  }
}
</style>
