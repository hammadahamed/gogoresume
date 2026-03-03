<template>
  <div class="ats-scanner-page">
    <Navigation />
    
    <main class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Free ATS Resume Scanner
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Check if your resume is readable by Applicant Tracking Systems (ATS) and get instant feedback on keywords and formatting.
        </p>
        
        <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-12">
          <div class="flex flex-col items-center justify-center space-y-4">
            <p class="text-lg font-medium text-gray-800">
              Upload your resume to check its ATS compatibility score.
            </p>
            <router-link 
              to="/resume-tweaker" 
              class="px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Scan My Resume for Free
            </router-link>
            <p class="text-sm text-gray-500 mt-2">
              No credit card required • Instant analysis
            </p>
          </div>
        </div>

        <!-- SEO Content Section -->
        <div class="text-left prose prose-lg mx-auto">
          <h2>What is an ATS Resume Scanner?</h2>
          <p>
            An Applicant Tracking System (ATS) is software used by recruiters to filter resumes before a human ever sees them. Our <strong>ATS resume scanner</strong> mimics these systems to show you exactly what recruiters see.
          </p>
          
          <h3>Why use a Resume Scanner?</h3>
          <ul>
            <li><strong>Keyword Matching:</strong> See if your resume matches the job description keywords.</li>
            <li><strong>Formatting Check:</strong> Ensure your layout, fonts, and headers are ATS-friendly.</li>
            <li><strong>Parseability:</strong> Verify that your contact info and experience are read correctly.</li>
          </ul>

          <h3>How to improve your ATS Score</h3>
          <p>
            To beat the ATS, you need to tailor your resume for every single job application. GoGoResume makes this easy by automatically inserting the right keywords from the job description into your resume, boosting your match score instantly.
          </p>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navigation from '../home/Navigation.vue';
import Footer from '../home/Footer.vue';
</script>

<style scoped>
.ats-scanner-page {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>
