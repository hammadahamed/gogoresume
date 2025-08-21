<template>
  <div class="h-full overflow-y-auto">
    <div class="flex justify-center pt-10 mx-10">
      <form @submit.prevent class="pb-32" style="width: 550px">
        <PersonalInfoForm
          v-if="userInfo.personalInfo"
          :personalInfo="userInfo.personalInfo"
          :ProfessionalSummary="userInfo.professionalSummary"
          :onChange="handlePersonalInfoChange"
        />

        <Section title="Work Experience">
          <ExperienceForm
            v-for="(experience, index) in workExperiences"
            :key="index"
            :index="index"
            :experience="experience"
            @onChange="(updated) => handleExperienceChange(index, updated)"
            @onDelete="() => handleDeleteExperience(index)"
            :disableCurrentOption="hasCurrentExperience && !experience.current"
          />
          <p
            v-if="workExperiences?.length === 0"
            class="text-gray-500 text-left py-4 text-sm"
          >
            No work experience added yet. Click the button below to add your
            work experience.
          </p>
          <div class="mt-3">
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
            v-if="education?.length === 0"
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

        <Section title="Skills" class="mt-6">
          <SkillsForm :skills="skills" @update:skills="handleSkillsChange" />
        </Section>

        <Section title="Projects" class="mt-6">
          <ProjectForm
            v-for="(project, index) in projects"
            :key="index"
            :index="index"
            :project="project"
            @onChange="(updated) => handleProjectChange(index, updated)"
            @onDelete="() => handleDeleteProject(index)"
          />
          <p
            v-if="projects?.length === 0"
            class="text-gray-500 text-left py-4 text-sm"
          >
            No projects added yet. Click the button below to add your projects.
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
      </form>
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
  emptyExperience,
  emptyEducation,
  emptyProject,
} from "@/constants/app.constants.ts";
import {
  initializeWindowEvents,
  cleanupWindowEvents,
} from "../../utils/windowEvents";

const { userInfo, getUserProfile } = useUserInfoManager();

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
const workExperiences = computed(() => userInfo.value.workExperiences);
const education = computed(() => userInfo.value.education);
const skills = computed(() => userInfo.value.skills);
const projects = computed(() => userInfo.value.projects);

function handlePersonalInfoChange(updatedInfo) {
  userInfo.value.personalInfo = updatedInfo.personalInfo;
  userInfo.value.personalInfo.professionalLinks = updatedInfo.professionalLinks;
  userInfo.value.professionalSummary = updatedInfo.professionalSummary;
}

function handleAddExperience() {
  userInfo.value.workExperiences.push({ ...emptyExperience });
}

function handleExperienceChange(index, updatedExperience) {
  userInfo.value.workExperiences[index] = updatedExperience;
  if (updatedExperience.current) {
    userInfo.value.workExperiences.forEach((exp, i) => {
      if (i !== index) exp.current = false;
    });
  }
}

function handleDeleteExperience(index) {
  userInfo.value.workExperiences.splice(index, 1);
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

const hasCurrentExperience = computed(() => {
  return userInfo.value.workExperiences.some((exp) => exp.current);
});
</script>

<style scoped>
/* Add your styles here if needed */
</style>
