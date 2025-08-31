<template>
  <section class="py-12 sm:py-16 lg:py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          How does GoGoResume
          <span class="bg-highlight text-black px-1 sm:px-2">compare</span>?
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
        <!-- Competitors Column -->
        <div class="comparison-card competitors">
          <div class="comparison-header mb-8">
            <div class="comparison-image mb-4">
              <div
                class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto relative overflow-hidden"
              >
                <!-- Bored person illustration -->
                <div class="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                  <div class="text-center">
                    <div class="w-12 h-12 bg-gray-400 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fill-rule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <div class="w-8 h-4 bg-gray-400 rounded-full mx-auto"></div>
                  </div>
                </div>
                <!-- Phone icon -->
                <div
                  class="absolute -bottom-2 -right-2 w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center"
                >
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 text-center">Competitors</h3>
          </div>

          <div class="comparison-features space-y-4">
            <div class="feature-item">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p class="text-gray-700">Can't optimize for specific job descriptions</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p class="text-gray-700">Resumes look boring & get rejected by ATS</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p class="text-gray-700">Outdated templates from 2020</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p class="text-gray-700">Closed source, zero transparency</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p class="text-gray-700">Generic output that tries to work for everyone</p>
              </div>
            </div>
          </div>
        </div>

        <!-- GoGoResume Column -->
        <div class="comparison-card gogoresume">
          <div class="comparison-header mb-8">
            <div class="comparison-image mb-4">
              <div
                class="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto relative overflow-hidden"
              >
                <!-- Happy people illustration -->
                <div
                  class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <div class="text-center">
                    <div class="flex items-center justify-center space-x-1 mb-1">
                      <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <div class="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fill-rule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div class="w-12 h-2 bg-white rounded-full mx-auto"></div>
                  </div>
                </div>
                <!-- Success icon -->
                <div
                  class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center"
                >
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 text-center">GoGoResume</h3>
          </div>

          <div class="comparison-features space-y-4">
            <div class="feature-item">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p class="text-gray-700">All resumes & job applications in one place</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p class="text-gray-700">Create beautiful resume visuals without design skills</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p class="text-gray-700">The most modern AI models available</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p class="text-gray-700">100% transparent & auditable AI optimization</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <p class="text-gray-700">Designed for job seekers & career changers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.comparison-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #f3f4f6;

  @media (min-width: 640px) {
    padding: 2rem;
  }

  @media (min-width: 1024px) {
    padding: 2.5rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  &.competitors {
    border-left: 4px solid #ef4444;
  }

  &.gogoresume {
    border-left: 4px solid #10b981;
  }
}

.comparison-header {
  text-align: center;
}

.comparison-image {
  .w-24.h-24 {
    transition: transform 0.3s ease;
  }
}

.comparison-card:hover .comparison-image .w-24.h-24 {
  transform: scale(1.05);
}

.comparison-features {
  .feature-item {
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s ease;

    @media (min-width: 640px) {
      padding: 0.75rem;
    }

    &:hover {
      background-color: #f9fafb;
    }

    p {
      font-size: 0.875rem;

      @media (min-width: 640px) {
        font-size: 1rem;
      }
    }
  }
}

// Additional responsive adjustments
@media (max-width: 640px) {
  .comparison-header {
    margin-bottom: 1.5rem;

    h3 {
      font-size: 1.5rem;
    }
  }

  .comparison-image {
    margin-bottom: 0.75rem;

    .w-24.h-24 {
      width: 5rem;
      height: 5rem;
    }
  }
}
</style>
