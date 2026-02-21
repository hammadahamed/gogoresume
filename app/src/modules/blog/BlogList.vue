<template>
  <div class="blog-list-page max-w-5xl mx-auto px-4 py-12">
    <div class="mb-12 text-center">
      <router-link to="/" class="text-gray-500 hover:text-gray-800 mb-4 inline-block">&larr; Back to Home</router-link>
      <h1 class="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Resume Advice & Career Hacks
      </h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Expert tips to optimize your resume for ATS, beat the bots, and land more interviews.
      </p>
    </div>
    
    <div class="grid md:grid-cols-2 gap-8">
      <router-link to="/blog/ats-formatting-rules" class="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100 h-full flex flex-col">
        <div class="text-sm font-semibold text-blue-600 mb-3 bg-blue-50 w-fit px-3 py-1 rounded-full">ATS Systems</div>
        <h2 class="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">The 7 ATS Formatting Rules Nobody Tells You</h2>
        <p class="text-gray-600 mb-6 line-clamp-3 flex-grow">
          75% of resumes are rejected by ATS bots before a human sees them. Learn the critical formatting rules to ensure your resume survives the scan.
        </p>
        <div class="flex items-center text-sm text-gray-500 border-t pt-4 mt-auto">
          <span>5 min read</span>
          <span class="mx-2">·</span>
          <span>Feb 21, 2026</span>
          <span class="ml-auto text-blue-600 font-medium group-hover:translate-x-1 transition-transform">Read Article &rarr;</span>
        </div>
      </router-link>

      <router-link to="/blog/tailor-resume-faang" class="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100 h-full flex flex-col">
        <div class="text-sm font-semibold text-green-600 mb-3 bg-green-50 w-fit px-3 py-1 rounded-full">Job Search Strategy</div>
        <h2 class="text-2xl font-bold mb-3 group-hover:text-green-600 transition-colors">How to Tailor Your Resume for FAANG Jobs (Using AI)</h2>
        <p class="text-gray-600 mb-6 line-clamp-3 flex-grow">
          Getting into Google, Amazon, or Meta requires beating thousands of applicants. Learn how to use AI to match your resume to FAANG job descriptions perfectly.
        </p>
        <div class="flex items-center text-sm text-gray-500 border-t pt-4 mt-auto">
          <span>6 min read</span>
          <span class="mx-2">·</span>
          <span>Feb 20, 2026</span>
          <span class="ml-auto text-green-600 font-medium group-hover:translate-x-1 transition-transform">Read Article &rarr;</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { applySEO } from '@/composables/useSEO';

onMounted(() => {
  applySEO({
    title: "Career & Resume Advice Blog | GoGoResume",
    description: "Expert advice on resume writing, ATS optimization, and job search strategies to help you land your dream job.",
    keywords: "resume tips, career advice, ATS optimization, job search blog",
    canonical: "https://gogoresume.com/blog"
  });
});
</script>
