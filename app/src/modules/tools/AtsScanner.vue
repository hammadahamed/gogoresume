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
        
        <div class="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-12 max-w-2xl mx-auto">
          <!-- Upload Area -->
          <div
            class="upload-zone"
            :class="{
              'drag-over': isDragging,
              'has-file': selectedFile,
              uploading: isScanning,
            }"
            @dragover.prevent="handleDragOver"
            @dragleave.prevent="handleDragLeave"
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
          >
            <input
              ref="fileInput"
              type="file"
              accept=".pdf,.docx"
              class="hidden"
              @change="handleFileSelect"
            />

            <!-- Scanning State -->
            <div v-if="isScanning" class="flex flex-col items-center gap-4 py-8">
              <div class="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              <div>
                <p class="text-lg font-semibold text-gray-800">Scanning your resume...</p>
                <p class="text-sm text-gray-500">Checking ATS readability & keywords</p>
              </div>
            </div>

            <!-- Scan Complete State (Prompt to Signup) -->
            <div v-else-if="scanComplete" class="flex flex-col items-center gap-4 py-6">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Scan Complete!</h3>
                <p class="text-gray-600 mb-6">Your ATS report is ready to view.</p>
                <button 
                  @click.stop="goToResults"
                  class="px-8 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  View My Report & Score
                </button>
                <p class="text-xs text-gray-400 mt-4">Free signup required to access detailed report</p>
              </div>
            </div>

            <!-- Default State -->
            <div v-else-if="!selectedFile" class="flex flex-col items-center gap-4 py-8">
              <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p class="text-lg font-medium text-gray-700">
                  Drop your resume here or <span class="text-blue-600 font-bold">browse</span>
                </p>
                <p class="text-sm text-gray-500 mt-2">PDF or DOCX (Max 5MB)</p>
              </div>
            </div>

            <!-- File Selected State (Ready to Scan) -->
            <div v-else class="flex flex-col items-center gap-4 py-6">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <svg class="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="text-center">
                <p class="text-lg font-bold text-gray-800">{{ selectedFile.name }}</p>
                <p class="text-sm text-gray-500">{{ formatFileSize(selectedFile.size) }}</p>
              </div>
              
              <div class="flex gap-3 mt-2">
                <button 
                  @click.stop="startScan"
                  class="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Scan Now
                </button>
                <button 
                  @click.stop="clearFile"
                  class="px-6 py-2.5 text-gray-600 hover:text-red-600 font-medium transition-colors"
                >
                  Change File
                </button>
              </div>
            </div>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const isDragging = ref(false);
const isScanning = ref(false);
const scanComplete = ref(false);

const triggerFileInput = () => {
  if (!isScanning.value && !scanComplete.value) {
    fileInput.value?.click();
  }
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    selectedFile.value = files[0];
  }
};

const handleDragOver = () => (isDragging.value = true);
const handleDragLeave = () => (isDragging.value = false);
const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    selectedFile.value = files[0];
  }
};

const clearFile = () => {
  selectedFile.value = null;
  scanComplete.value = false;
  if (fileInput.value) fileInput.value.value = '';
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const startScan = () => {
  isScanning.value = true;
  // Simulate scanning delay
  setTimeout(() => {
    isScanning.value = false;
    scanComplete.value = true;
  }, 2500);
};

const goToResults = () => {
  // Redirect to login/signup page
  router.push('/login?intent=view_report');
};
</script>

<style scoped>
.ats-scanner-page {
  min-height: 100vh;
  background-color: #f9fafb;
}

.upload-zone {
  border-width: 2px;
  border-style: dashed;
  border-color: #e5e7eb;
  border-radius: 1rem;
  background-color: #ffffff;
  transition: all 0.2s;
  cursor: pointer;
}

.upload-zone:hover:not(.uploading) {
  border-color: #3b82f6;
  background-color: #eff6ff;
}

.upload-zone.drag-over {
  border-color: #3b82f6;
  background-color: #eff6ff;
  transform: scale(1.01);
}

.upload-zone.uploading {
  cursor: wait;
  border-style: solid;
  border-color: #e5e7eb;
  background-color: #f9fafb;
}
</style>
