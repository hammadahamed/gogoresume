<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="handleClose"
        ></div>

        <!-- Modal Content -->
        <div
          class="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden mx-4 animate-modal-in"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between px-6 py-4 border-gray-200 bg--50"
          >
            <h2 class="text-lg font-semibold text-gray-900">
              Edit {{ sectionTitle }}
            </h2>
            <button
              @click="handleClose"
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-4 pb-16 overflow-y-auto max-h-[60vh]">
            <!-- Professional Summary -->
            <div v-if="sectionType === 'professionalSummary'">
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Professional Summary
              </label>
              <textarea
                v-model="localSummary"
                rows="6"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)]/30 focus:border-[var(--primary-color)] resize-none text-sm"
                placeholder="Write a compelling professional summary..."
              ></textarea>
              <p class="mt-2 text-xs text-gray-500">
                {{ localSummary?.length || 0 }} characters
              </p>
            </div>

            <!-- Skills -->
            <div v-else-if="sectionType === 'skills'">
              <SkillsForm
                :skills="localSkills"
                @update:skills="localSkills = $event"
              />
            </div>

            <!-- Work Experience -->
            <div v-else-if="sectionType === 'workExperiences'">
              <div
                v-if="localExperiences.length === 0"
                class="text-center py-8 text-gray-500"
              >
                No work experiences to edit.
              </div>
              <div v-else>
                <ExperienceForm
                  v-for="(experience, index) in localExperiences"
                  :key="index"
                  :index="index"
                  :experience="experience"
                  :totalCount="localExperiences.length"
                  :disableCurrentOption="hasCurrentExperience(index)"
                  @onChange="
                    (updated) => handleExperienceChange(index, updated)
                  "
                  @onDelete="() => handleDeleteExperience(index)"
                  @onMoveUp="() => handleMoveExperienceUp(index)"
                  @onMoveDown="() => handleMoveExperienceDown(index)"
                />
              </div>
            </div>

            <!-- Projects -->
            <div v-else-if="sectionType === 'projects'">
              <div
                v-if="localProjects.length === 0"
                class="text-center py-8 text-gray-500"
              >
                No projects to edit.
              </div>
              <div v-else>
                <ProjectForm
                  v-for="(project, index) in localProjects"
                  :key="index"
                  :index="index"
                  :project="project"
                  :totalCount="localProjects.length"
                  @onChange="(updated) => handleProjectChange(index, updated)"
                  @onDelete="() => handleDeleteProject(index)"
                  @onMoveUp="() => handleMoveProjectUp(index)"
                  @onMoveDown="() => handleMoveProjectDown(index)"
                />
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50"
          >
            <button
              @click="handleClose"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              @click="handleSave"
              class="px-4 py-2 text-sm font-medium text-white bg-[var(--primary-color)] rounded-lg hover:opacity-90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import SkillsForm from "@/modules/user-info/components/SkillsForm.vue";
import ExperienceForm from "@/modules/user-info/components/ExperienceForm.vue";
import ProjectForm from "@/modules/user-info/components/ProjectForm.vue";
import type { Experience, Project } from "@/types/resume.types";

type SectionType =
  | "professionalSummary"
  | "skills"
  | "workExperiences"
  | "projects";

interface Props {
  show: boolean;
  sectionType: SectionType;
  professionalSummary?: string;
  skills?: string[];
  workExperiences?: Experience[];
  projects?: Project[];
}

const props = withDefaults(defineProps<Props>(), {
  professionalSummary: "",
  skills: () => [],
  workExperiences: () => [],
  projects: () => [],
});

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", data: { sectionType: SectionType; value: any }): void;
}>();

// Local state for editing
const localSummary = ref("");
const localSkills = ref<string[]>([]);
const localExperiences = ref<Experience[]>([]);
const localProjects = ref<Project[]>([]);

// Section title mapping
const sectionTitle = computed(() => {
  const titles: Record<SectionType, string> = {
    professionalSummary: "Professional Summary",
    skills: "Skills",
    workExperiences: "Work Experience",
    projects: "Projects",
  };
  return titles[props.sectionType] || "Section";
});

// Initialize local state when modal opens
watch(
  () => props.show,
  (isOpen) => {
    if (isOpen) {
      localSummary.value = props.professionalSummary || "";
      localSkills.value = [...(props.skills || [])];
      localExperiences.value = JSON.parse(
        JSON.stringify(props.workExperiences || [])
      );
      localProjects.value = JSON.parse(JSON.stringify(props.projects || []));
    }
  },
  { immediate: true }
);

// Experience handlers
const hasCurrentExperience = (excludeIndex: number) => {
  return localExperiences.value.some(
    (exp, i) => i !== excludeIndex && exp.current
  );
};

const handleExperienceChange = (index: number, updated: Experience) => {
  localExperiences.value[index] = updated;
  if (updated.current) {
    localExperiences.value.forEach((exp, i) => {
      if (i !== index) exp.current = false;
    });
  }
};

const handleDeleteExperience = (index: number) => {
  localExperiences.value.splice(index, 1);
};

const handleMoveExperienceUp = (index: number) => {
  if (index > 0) {
    [localExperiences.value[index - 1], localExperiences.value[index]] = [
      localExperiences.value[index],
      localExperiences.value[index - 1],
    ];
  }
};

const handleMoveExperienceDown = (index: number) => {
  if (index < localExperiences.value.length - 1) {
    [localExperiences.value[index], localExperiences.value[index + 1]] = [
      localExperiences.value[index + 1],
      localExperiences.value[index],
    ];
  }
};

// Project handlers
const handleProjectChange = (index: number, updated: Project) => {
  localProjects.value[index] = updated;
};

const handleDeleteProject = (index: number) => {
  localProjects.value.splice(index, 1);
};

const handleMoveProjectUp = (index: number) => {
  if (index > 0) {
    [localProjects.value[index - 1], localProjects.value[index]] = [
      localProjects.value[index],
      localProjects.value[index - 1],
    ];
  }
};

const handleMoveProjectDown = (index: number) => {
  if (index < localProjects.value.length - 1) {
    [localProjects.value[index], localProjects.value[index + 1]] = [
      localProjects.value[index + 1],
      localProjects.value[index],
    ];
  }
};

// Modal actions
const handleClose = () => {
  emit("close");
};

const handleSave = () => {
  let value: any;
  switch (props.sectionType) {
    case "professionalSummary":
      value = localSummary.value;
      break;
    case "skills":
      value = localSkills.value;
      break;
    case "workExperiences":
      value = localExperiences.value;
      break;
    case "projects":
      value = localProjects.value;
      break;
  }
  emit("save", { sectionType: props.sectionType, value });
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modal-in {
  animation: modal-in 0.2s ease-out;
}
</style>
