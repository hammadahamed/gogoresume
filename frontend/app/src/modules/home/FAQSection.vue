<template>
  <section class="py-12 sm:py-16 lg:py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-12 sm:mb-16">
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
          Frequently Asked
          <span class="bg-highlight text-black px-1 sm:px-2">Questions</span>
        </h2>
        <p class="text-lg sm:text-xl text-gray-600 px-4 sm:px-0">Everything you need to know about GoGoResume</p>
      </div>

      <div class="space-y-4 sm:space-y-6">
        <!-- FAQ Item 1 -->
        <div class="faq-item">
          <button @click="toggleFaq(0)" class="faq-question">
            <span>How does the AI optimization work?</span>
            <svg
              class="faq-icon"
              :class="{ 'rotate-180': openFaqs[0] }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="faq-answer" :class="{ open: openFaqs[0] }">
            <p>
              Our AI analyzes job descriptions and optimizes your resume content to include relevant keywords and
              phrases that ATS systems look for. It also improves the overall structure and impact of your resume to
              better showcase your qualifications.
            </p>
          </div>
        </div>

        <!-- FAQ Item 2 -->
        <div class="faq-item">
          <button @click="toggleFaq(1)" class="faq-question">
            <span>What file formats can I download my resume in?</span>
            <svg
              class="faq-icon"
              :class="{ 'rotate-180': openFaqs[1] }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="faq-answer" :class="{ open: openFaqs[1] }">
            <p>
              You can download your resume in multiple formats including PDF, DOCX, and plain text. PDF is recommended
              for most applications as it maintains formatting across different devices and systems.
            </p>
          </div>
        </div>

        <!-- FAQ Item 3 -->
        <div class="faq-item">
          <button @click="toggleFaq(2)" class="faq-question">
            <span>Can I create multiple resumes for different jobs?</span>
            <svg
              class="faq-icon"
              :class="{ 'rotate-180': openFaqs[2] }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="faq-answer" :class="{ open: openFaqs[2] }">
            <p>
              Yes! You can create unlimited resumes with different templates and content optimized for specific job
              positions. Each resume can be tailored to match the requirements of different job descriptions.
            </p>
          </div>
        </div>

        <!-- FAQ Item 4 -->
        <div class="faq-item">
          <button @click="toggleFaq(3)" class="faq-question">
            <span>How do I know if my resume is ATS-friendly?</span>
            <svg
              class="faq-icon"
              :class="{ 'rotate-180': openFaqs[3] }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="faq-answer" :class="{ open: openFaqs[3] }">
            <p>
              All our templates are designed to be ATS-friendly with proper formatting, clear sections, and standard
              fonts. Our AI optimization also ensures your content includes relevant keywords that ATS systems
              recognize.
            </p>
          </div>
        </div>

        <!-- FAQ Item 5 -->
        <div class="faq-item">
          <button @click="toggleFaq(4)" class="faq-question">
            <span>Is there a free trial available?</span>
            <svg
              class="faq-icon"
              :class="{ 'rotate-180': openFaqs[4] }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <div class="faq-answer" :class="{ open: openFaqs[4] }">
            <p>
              Yes! You can try our basic features for free. Create your first resume and see how our platform works.
              For full AI optimization and premium templates, you'll need to upgrade to our paid plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

// FAQ functionality
const openFaqs = ref<boolean[]>([false, false, false, false, false]);

const toggleFaq = (index: number) => {
  openFaqs.value[index] = !openFaqs.value[index];
};
</script>

<style scoped lang="scss">
// FAQ Section Styles
.faq-item {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d1d5db;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  background: white;
  border: none;
  text-align: left;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
  }

  span {
    flex: 1;
    margin-right: 1rem;
  }
}

.faq-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #6b7280;
  transition: transform 0.3s ease;
  flex-shrink: 0;

  &.rotate-180 {
    transform: rotate(180deg);
  }
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  background: #f9fafb;

  &.open {
    max-height: 200px;
    padding: 1.5rem;
  }

  p {
    margin: 0;
    color: #6b7280;
    line-height: 1.6;
  }
}

// Responsive adjustments for FAQ
@media (max-width: 768px) {
  .faq-question {
    padding: 1.25rem 1rem;
    font-size: 1rem;
    
    span {
      margin-right: 0.75rem;
    }
  }

  .faq-answer.open {
    padding: 1.25rem 1rem;
  }

  .faq-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

@media (max-width: 480px) {
  .faq-question {
    padding: 1rem 0.75rem;
    font-size: 0.925rem;
    
    span {
      margin-right: 0.5rem;
    }
  }

  .faq-answer.open {
    padding: 1rem 0.75rem;
  }

  .faq-icon {
    width: 1.125rem;
    height: 1.125rem;
  }
}
</style>
