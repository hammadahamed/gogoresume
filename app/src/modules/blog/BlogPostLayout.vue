<template>
  <div class="blog-post-layout">
    <div class="max-w-3xl mx-auto px-4 py-12">
      <router-link to="/blog" class="text-blue-600 hover:text-blue-800 mb-8 inline-block">
        &larr; Back to Blog
      </router-link>
      
      <article class="prose lg:prose-xl">
        <h1 class="text-3xl font-bold mb-4">{{ title }}</h1>
        <div class="text-gray-500 mb-8">{{ date }} · {{ readTime }} read</div>
        
        <div class="blog-content">
          <slot></slot>
        </div>
        
        <div class="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <h3 class="text-xl font-bold mb-2">Optimize Your Resume for ATS</h3>
          <p class="mb-4">Don't let formatting errors get you rejected. Scan your resume with GoGoResume's AI checker.</p>
          <router-link to="/resume-tweaker" class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Scan My Resume Free
          </router-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  date: string;
  readTime: string;
}>();
</script>

<style scoped>
.prose h2 {
  @apply text-2xl font-bold mt-8 mb-4;
}
.prose h3 {
  @apply text-xl font-bold mt-6 mb-3;
}
.prose p {
  @apply mb-4 leading-relaxed text-gray-700;
}
.prose ul {
  @apply list-disc list-inside mb-4 ml-4;
}
.prose li {
  @apply mb-2;
}
</style>
