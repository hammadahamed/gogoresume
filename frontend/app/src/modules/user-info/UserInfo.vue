<template>
  <div class="w-screen flex h-screen overflow-hidden">
    <!-- Left pane - Copy -->
    <div class="w-[40%] pl-20 flex flex-col">
      <div class="flex mt-20">
        <img
          src="@/assets/write-doodle.svg"
          alt="Writing doodle"
          class="w-48 h-48 object-contain opacity-90 mb-10"
        />
      </div>
      <div>
        <h1 class="text-3xl font-bold mb-6 text-gray-900">
          It's a One-time Process 😉
        </h1>
        <p class="text-gray-600 text-lg leading-relaxed">
          This is a one-time process where you'll create your comprehensive
          professional profile.
          <br />
          <br />
          Once completed, you can generate different customized resumes tailored
          to specific job descriptions, making your job applications more
          effective and targeted.
        </p>
      </div>
    </div>

    <!-- Right pane - Form -->
    <div class="w-[70%] overflow-y-auto">
      <div class="flex justify-center">
        <form
          @submit.prevent="handleSubmit"
          class="pt-10 pb-32"
          style="width: 550px"
        >
          <PersonalInfoForm
            v-if="userInfo.personalInfo"
            :personalInfo="userInfo.personalInfo"
            :onChange="handlePersonalInfoChange"
          />

          <Section title="Work Experience">
            <ExperienceForm
              v-for="(experience, index) in experiences"
              :key="index"
              :index="index"
              :experience="experience"
              @onChange="(updated) => handleExperienceChange(index, updated)"
              @onDelete="() => handleDeleteExperience(index)"
              :disableCurrentOption="
                hasCurrentExperience && !experience.current
              "
            />
            <p
              v-if="experiences.length === 0"
              class="text-gray-500 text-left py-4 text-sm"
            >
              No work experience added yet. Click the button below to add your
              work experience.
            </p>
            <div class="mt-6">
              <button
                type="button"
                @click="handleAddExperience"
                class="w-full text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-200"
              >
                Add Experience
              </button>
            </div>
          </Section>

          <Section title="Education">
            <EducationForm
              v-for="(education, index) in education"
              :key="index"
              :index="index"
              :education="education"
              @onChange="(updated) => handleEducationChange(index, updated)"
              @onDelete="() => handleDeleteEducation(index)"
            />
            <p
              v-if="education.length === 0"
              class="text-gray-500 text-left py-4 text-sm"
            >
              No education added yet. Click the button below to add your
              education.
            </p>
            <div class="mt-6">
              <button
                type="button"
                @click="handleAddEducation"
                class="w-full text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-200"
              >
                Add Education
              </button>
            </div>
          </Section>

          <Section title="Skills">
            <SkillsForm :skills="skills" @update:skills="handleSkillsChange" />
          </Section>

          <Section title="Projects">
            <ProjectForm
              v-for="(project, index) in projects"
              :key="index"
              :index="index"
              :project="project"
              @onChange="(updated) => handleProjectChange(index, updated)"
              @onDelete="() => handleDeleteProject(index)"
            />
            <p
              v-if="projects.length === 0"
              class="text-gray-500 text-left py-4 text-sm"
            >
              No projects added yet. Click the button below to add your
              projects.
            </p>
            <div class="mt-6">
              <button
                type="button"
                @click="handleAddProject"
                class="w-full text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium border border-gray-200"
              >
                Add Project
              </button>
            </div>
          </Section>

          <div class="mt-8 flex justify-end mt-20 mb-20">
            <button
              type="submit"
              :disabled="isSaving"
              class="bg-slate-700 text-white px-4 py-2 pb-2.5 rounded-lg hover:bg-gray-800 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span
                v-if="isSaving"
                class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></span>
              {{ isSaving ? "Saving..." : "Save Information" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import PersonalInfoForm from "./components/PersonalInfoForm.vue";
import ExperienceForm from "./components/ExperienceForm.vue";
import EducationForm from "./components/EducationForm.vue";
import ProjectForm from "./components/ProjectForm.vue";
import SkillsForm from "./components/SkillsForm.vue";
import Section from "./components/Section.vue";
import { useUserInfoManager } from "../../composables/useUserInfoManager";
import {
  emptyPersonalInfo,
  emptyExperience,
  emptyEducation,
  emptyProject,
} from "@/constants/app.constants.ts";
import { toast } from "vue3-toastify";
import {
  initializeWindowEvents,
  cleanupWindowEvents,
} from "../../utils/windowEvents";

const { userInfo, saveUserProfile, getUserProfile } = useUserInfoManager();

// Initialize window events for suggestions
onMounted(() => {
  initializeWindowEvents();
  // Load user profile
  getUserProfile();

  // Cleanup on unmount
  return () => {
    cleanupWindowEvents();
  };
});

// Computed properties with default values
const experiences = computed(() => userInfo.value.experiences);
const education = computed(() => userInfo.value.education);
const skills = computed(() => userInfo.value.skills);
const projects = computed(() => userInfo.value.projects);

const isSaving = ref(false);

function handlePersonalInfoChange(updatedInfo) {
  userInfo.value.personalInfo = updatedInfo;
}

function handleAddExperience() {
  userInfo.value.experiences.push({ ...emptyExperience });
}

function handleExperienceChange(index, updatedExperience) {
  userInfo.value.experiences[index] = updatedExperience;
  if (updatedExperience.current) {
    userInfo.value.experiences.forEach((exp, i) => {
      if (i !== index) exp.current = false;
    });
  }
}

function handleDeleteExperience(index) {
  userInfo.value.experiences.splice(index, 1);
}

function handleAddEducation() {
  userInfo.value.education.push({ ...emptyEducation });
}

function handleEducationChange(index, updatedEducation) {
  userInfo.value.education[index] = updatedEducation;
}

function handleDeleteEducation(index) {
  userInfo.value.education.splice(index, 1);
}

function handleSkillsChange(updatedSkills) {
  userInfo.value.skills = updatedSkills;
}

function handleAddProject() {
  userInfo.value.projects.push({ ...emptyProject });
}

function handleProjectChange(index, updatedProject) {
  userInfo.value.projects[index] = updatedProject;
}

function handleDeleteProject(index) {
  userInfo.value.projects.splice(index, 1);
}

async function handleSubmit() {
  if (isSaving.value) return;

  isSaving.value = true;
  try {
    await saveUserProfile(userInfo.value);
    toast.success("Profile saved successfully!");
  } catch (error) {
    toast.error("Failed to save profile. Please try again.");
    console.error("Failed to save profile:", error);
  } finally {
    isSaving.value = false;
  }
}

const hasCurrentExperience = computed(() => {
  return userInfo.value.experiences.some((exp) => exp.current);
});
</script>

<style scoped>
/* Add your styles here if needed */
</style>
