<template>
  <div class="h-full overflow-y-auto">
    <div class="user-info-container px-10 lg:px-0">
      <form @submit.prevent class="user-info-form">
        <PersonalInfoForm
          v-if="currentResume.personalInfo"
          :personalInfo="currentResume.personalInfo"
          :professionalSummary="currentResume.professionalSummary"
          :onChange="handlePersonalInfoChange"
        />

        <Section title="Work Experience">
          <ExperienceForm
            v-for="(experience, index) in workExperiences"
            :key="index"
            :index="index"
            :experience="experience"
            :totalCount="workExperiences.length"
            @onChange="(updated) => handleExperienceChange(index, updated)"
            @onDelete="() => handleDeleteExperience(index)"
            @onMoveUp="() => handleMoveExperienceUp(index)"
            @onMoveDown="() => handleMoveExperienceDown(index)"
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
            v-for="(educationItem, index) in education"
            :key="index"
            :index="index"
            :education="educationItem"
            :totalCount="education.length"
            @onChange="(updated) => handleEducationChange(index, updated)"
            @onDelete="() => handleDeleteEducation(index)"
            @onMoveUp="() => handleMoveEducationUp(index)"
            @onMoveDown="() => handleMoveEducationDown(index)"
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
            :totalCount="projects.length"
            @onChange="(updated) => handleProjectChange(index, updated)"
            @onDelete="() => handleDeleteProject(index)"
            @onMoveUp="() => handleMoveProjectUp(index)"
            @onMoveDown="() => handleMoveProjectDown(index)"
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
import { useDataManager } from "../../composables/useDataManager";
import {
  emptyExperience,
  emptyEducation,
  emptyProject,
} from "@/constants/app.constants.ts";

const { getUserProfile, currentResume } = useDataManager();

// Computed properties with default values
const workExperiences = computed(
  () => currentResume.value.workExperiences || []
);
const education = computed(() => currentResume.value.education || []);
const skills = computed(() => currentResume.value.skills || []);
const projects = computed(() => currentResume.value.projects || []);

function handlePersonalInfoChange(updatedInfo) {
  currentResume.value.personalInfo = updatedInfo.personalInfo;
  currentResume.value.personalInfo.professionalLinks =
    updatedInfo.professionalLinks;
  currentResume.value.professionalSummary = updatedInfo.professionalSummary;
}

function handleAddExperience() {
  currentResume.value.workExperiences.push({ ...emptyExperience });
}

function handleExperienceChange(index, updatedExperience) {
  currentResume.value.workExperiences[index] = updatedExperience;
  if (updatedExperience.current) {
    currentResume.value.workExperiences.forEach((exp, i) => {
      if (i !== index) exp.current = false;
    });
  }
}

function handleDeleteExperience(index) {
  currentResume.value.workExperiences.splice(index, 1);
}

function handleMoveExperienceUp(index) {
  if (index > 0) {
    const experiences = currentResume.value.workExperiences;
    [experiences[index - 1], experiences[index]] = [
      experiences[index],
      experiences[index - 1],
    ];
  }
}

function handleMoveExperienceDown(index) {
  const experiences = currentResume.value.workExperiences;
  if (index < experiences.length - 1) {
    [experiences[index], experiences[index + 1]] = [
      experiences[index + 1],
      experiences[index],
    ];
  }
}

function handleAddEducation() {
  currentResume.value.education.push({ ...emptyEducation });
}

function handleEducationChange(index, updatedEducation) {
  currentResume.value.education[index] = updatedEducation;
}

function handleDeleteEducation(index) {
  currentResume.value.education.splice(index, 1);
}

function handleMoveEducationUp(index) {
  if (index > 0) {
    const educations = currentResume.value.education;
    [educations[index - 1], educations[index]] = [
      educations[index],
      educations[index - 1],
    ];
  }
}

function handleMoveEducationDown(index) {
  const educations = currentResume.value.education;
  if (index < educations.length - 1) {
    [educations[index], educations[index + 1]] = [
      educations[index + 1],
      educations[index],
    ];
  }
}

function handleSkillsChange(updatedSkills) {
  currentResume.value.skills = updatedSkills;
}

function handleAddProject() {
  currentResume.value.projects.push({ ...emptyProject });
}

function handleProjectChange(index, updatedProject) {
  currentResume.value.projects[index] = updatedProject;
}

function handleDeleteProject(index) {
  currentResume.value.projects.splice(index, 1);
}

function handleMoveProjectUp(index) {
  if (index > 0) {
    const projects = currentResume.value.projects;
    [projects[index - 1], projects[index]] = [
      projects[index],
      projects[index - 1],
    ];
  }
}

function handleMoveProjectDown(index) {
  const projects = currentResume.value.projects;
  if (index < projects.length - 1) {
    [projects[index], projects[index + 1]] = [
      projects[index + 1],
      projects[index],
    ];
  }
}

const hasCurrentExperience = computed(() => {
  return currentResume.value.workExperiences.some((exp) => exp.current);
});
</script>

<style scoped>
.user-info-container {
  display: flex;
  justify-content: center;
  padding-top: 2.5rem;
  margin-left: 2.5rem;
  margin-right: 2.5rem;
}

.user-info-form {
  width: 550px;
  max-width: 100%;
  padding-bottom: 8rem;
}

/* Mobile styles (< 1000px) */
@media (max-width: 999px) {
  .user-info-container {
    padding-top: 1.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .user-info-form {
    width: 100%;
    padding-bottom: 6rem;
  }
}
</style>
