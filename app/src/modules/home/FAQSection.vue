<template>
  <section id="faq" class="py-16 mb-24 sm:py-20 lg:py-24 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <div class="text-center mb-16 sm:mb-20">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-6"
        >
          <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span class="text-sm font-medium text-gray-600">FAQ</span>
        </div>
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Frequently Asked Questions
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about
          <span class="bg-highlight font-medium">GoGoResume</span>
        </p>
      </div>

      <div class="space-y-2">
        <!-- FAQ Items -->
        <div
          v-for="(faq, index) in faqItems"
          :key="index"
          class="faq-item group"
          :class="{ active: openFaqs[index] }"
        >
          <button @click="toggleFaq(index)" class="faq-question">
            <span class="faq-text">{{ faq.question }}</span>
            <svg
              class="faq-icon"
              :class="{ 'rotate-180': openFaqs[index] }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div class="faq-answer" :class="{ open: openFaqs[index] }">
            <div class="faq-answer-content">
              <p class="text-xs text-gray-700 whitespace-pre-line">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

// FAQ data
const faqItems = [
  {
    question: "Why do i need this app?",
    answer:
      "If you are a job-hunter, and constantly tweak the ATS to get your resume past the ATS, then this app is for you. \nCreate base version of your resume and pick and tweak it on the go with AI.",
  },
  {
    question: "What is an ATS?",
    answer:
      "ATS is an Applicant Tracking System. It is a software that helps companies manage their job applications. It is used to parse resumes and extract the relevant information. \nIf your resume is not optimized for ATS systems, it will be REJECTED.",
  },

  {
    question: "How does the AI optimization work?",
    answer:
      "Our AI analyzes job descriptions and optimizes your resume content to match the relevant keywords and phrases that ATS systems look for. It also improves the overall structure and impact of your resume to better showcase your qualifications.",
  },
  {
    question: "What file formats can I download my resume in?",
    answer:
      "We only support PDF format. PDF is recommended for most applications as it maintains formatting across different devices and systems.",
  },
  {
    question: "Can I create multiple resumes for different jobs?",
    answer:
      "Yes! You can create unlimited resumes with different templates and content optimized for specific job positions. Each resume can be tailored to match the requirements of different job descriptions.",
  },
  {
    question: "How do I know if my resume is ATS-friendly?",
    answer:
      "When it comes to ATS-friendliness, the main player is the formatting and layout which makes the parsing easy for ATS systems. We carefully handpicked 2 best templates that are ATS-friendly and have a good layout.",
  },
  {
    question: "Can i create custom layouts?",
    answer:
      "No, we don't support custom layouts. We've provided you with the 2 best templates in the industry. We are adding more templates in the future.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "We don't have a free trial. But you get 10 AI-powered tweaks/month with the free plan. You can use them to optimize your resume. And the chrome extension is FOREVER FREE.",
  },
];

// FAQ functionality
const openFaqs = ref<boolean[]>(new Array(faqItems.length).fill(false));

const toggleFaq = (index: number) => {
  openFaqs.value[index] = !openFaqs.value[index];
};
</script>

<style scoped lang="scss">
// Minimal Cool FAQ Section Styles
.faq-item {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;

  &:hover {
    transform: translateY(-1px);
    border-color: #d1d5db;
    box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.1);
  }

  &.active {
    border-color: #9ca3af;
    box-shadow: 0 2px 8px -2px rgba(0, 0, 0, 0.1);
  }
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.75rem;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;

  .faq-text {
    flex: 1;
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
    line-height: 1.5;
    transition: color 0.3s ease;
    margin-right: 1rem;
  }

  &:hover .faq-text {
    color: #111827;
  }

  .faq-item.active & .faq-text {
    color: #111827;
  }
}

.faq-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;

  &.rotate-180 {
    transform: rotate(180deg);
  }

  .faq-question:hover & {
    color: #6b7280;
  }

  .faq-item.active & {
    color: #374151;
  }
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: #fafafa;
  border-top: 1px solid #f3f4f6;

  &.open {
    max-height: 300px;
  }

  .faq-answer-content {
    padding: 1.5rem 1.75rem;
    transform: translateY(-10px);
    transition: all 0.3s ease 0.1s;

    .faq-answer.open & {
      opacity: 1;
      transform: translateY(0);
    }
  }

  p {
    margin: 0;
    line-height: 1.7;
    font-size: 1.1rem;
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .faq-question {
    padding: 1.25rem 1.5rem;

    .faq-text {
      font-size: 1rem;
    }
  }

  .faq-icon {
    width: 1.125rem;
    height: 1.125rem;
  }

  .faq-answer-content {
    padding: 1.25rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .faq-question {
    padding: 1rem 1.25rem;

    .faq-text {
      font-size: 0.95rem;
    }
  }

  .faq-answer-content {
    padding: 1rem 1.25rem;

    p {
      font-size: 0.9rem;
    }
  }
}

// Smooth animations
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.faq-item {
  animation: fadeInUp 0.6s ease forwards;

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }
}
</style>
