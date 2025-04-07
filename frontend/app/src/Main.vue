<template>
  <div class="flex flex-col min-h-screen bg-white w-screen overflow-hidden">
    <!-- Navbar -->
    <NavBar :activeTab="activeTab" :setActiveTab="setActiveTab" />

    <!-- Main content -->
    <main class="flex-1 max-w-xl">
      hi
      <component :is="getActiveComponent()" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import NavBar from "./components/NavBar.vue";
// import ResumeHelper from "./modules/resume-helper/ResumeHelper.vue";
// import ResumeBuilder from "./modules/resume-builder/ResumeBuilder.vue";
import UserInfo from "./modules/user-info/UserInfo.vue";

// State for active tab
const activeTab = ref("user-info");

// Function to set active tab
function setActiveTab(tab: string) {
  activeTab.value = tab;
}
function getActiveComponent() {
  switch (activeTab.value) {
    case "user-info":
      return UserInfo;
    case "resume-builder":
      return ResumeBuilder;
    case "resume-helper":
      return ResumeHelper;
    default:
      return UserInfo;
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
