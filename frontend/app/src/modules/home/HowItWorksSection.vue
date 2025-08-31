<template>
  <section class="py-12 sm:py-16 lg:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Build, optimize and
          <span class="bg-highlight text-black px-1 sm:px-2">that's it</span>
        </h2>
        <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
          With GoGoResume, you can easily create and optimize your resume for any job application.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <!-- Step 1: Create your resume -->
        <div class="process-card">
          <div class="process-visual mb-6">
            <div class="bg-gray-100 rounded-lg p-6 h-48 flex flex-col justify-center items-center">
              <div class="w-full max-w-xs bg-white rounded-lg p-4 shadow-sm mb-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="w-20 h-2 bg-gray-300 rounded"></div>
                  <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5a1 1 0 011 1v1h1a1 1 0 110 2H9v1a1 1 0 11-2 0V9H6a1 1 0 110-2h1V6a1 1 0 011-1z" />
                    </svg>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="w-full h-3 bg-gray-200 rounded"></div>
                  <div class="w-3/4 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
                <span>Template Library</span>
              </div>
            </div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Create your resume</h3>
          <p class="text-gray-600 mb-6">
            Choose from our professional templates and start building your resume with our intuitive builder.
          </p>
          <button class="process-btn">
            More info
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <!-- Step 2: Optimize with AI -->
        <div class="process-card">
          <div class="process-visual mb-6">
            <div class="bg-gray-100 rounded-lg p-6 h-48 flex flex-col justify-center items-center">
              <div class="w-full max-w-xs bg-white rounded-lg p-4 shadow-sm">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="font-medium text-gray-900">Your Resume</span>
                  </div>
                  <div class="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Optimize with AI</span>
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Copy optimized version</span>
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Download PDF</span>
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Optimize with AI</h3>
          <p class="text-gray-600 mb-6">
            Paste any job description and let our AI optimize your resume to pass ATS systems.
          </p>
          <button class="process-btn">
            More info
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <!-- Step 3: Share and apply -->
        <div class="process-card">
          <div class="process-visual mb-6">
            <div class="bg-gray-100 rounded-lg p-6 h-48 flex flex-col justify-center items-center relative">
              <div
                class="absolute top-4 left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
              >
                100k
              </div>
              <div class="absolute top-4 right-4 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path
                    fill-rule="evenodd"
                    d="M4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <div class="absolute bottom-4 left-4 w-6 h-6 bg-gray-400 rounded-full"></div>
              <div class="w-20 h-20 bg-white rounded-lg p-2 shadow-sm">
                <div class="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                  <svg class="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="absolute bottom-4 right-4 w-6 h-6 bg-gray-400 rounded-full"></div>
              <div
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
              >
                👍
              </div>
            </div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Share and apply</h3>
          <p class="text-gray-600 mb-6">Download your optimized resume and start applying to jobs with confidence.</p>
          <button class="process-btn">
            More info
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.process-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #f3f4f6;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
}

.process-visual {
  .bg-gray-100 {
    background: #f9fafb;
  }
}

.process-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  color: #374151;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
    transform: translateY(-1px);
  }
}

// Responsive adjustments
@media (max-width: 1024px) {
  .process-card {
    padding: 1.75rem;
  }
}

@media (max-width: 768px) {
  .process-card {
    padding: 1.5rem;
    
    .process-visual {
      margin-bottom: 1rem;
      
      .bg-gray-100 {
        height: 180px;
        padding: 1rem;
      }
    }
    
    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.75rem;
    }
    
    p {
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .process-card {
    padding: 1.25rem;
    
    .process-visual {
      margin-bottom: 1rem;
      
      .bg-gray-100 {
        height: 160px;
        padding: 0.75rem;
      }
    }
    
    h3 {
      font-size: 1.125rem;
    }
    
    p {
      font-size: 0.8rem;
    }
  }
}
</style>
