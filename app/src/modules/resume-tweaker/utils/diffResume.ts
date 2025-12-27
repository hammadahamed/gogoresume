import type { UserInfo, Experience, Project } from "@/types/resume.types";

/**
 * Represents the changes detected in a resume after tweaking
 */
export interface ResumeChanges {
  professionalSummary: boolean;
  skills: {
    added: string[];
    removed: string[];
    hasChanges: boolean;
  };
  workExperiences: WorkExperienceChanges[];
  projects: ProjectChanges[];
  hasAnyChanges: boolean;
}

export interface WorkExperienceChanges {
  index: number;
  company: string;
  position: string;
  changedBullets: number[]; // indices of changed description bullets
}

export interface ProjectChanges {
  index: number;
  name: string;
  descriptionChanged: boolean;
}

/**
 * Compare two strings and determine if they are different
 */
const stringsAreDifferent = (a: string, b: string): boolean => {
  return (a || "").trim() !== (b || "").trim();
};

/**
 * Compare two skill arrays and find added/removed items
 */
const diffSkills = (
  oldSkills: string[],
  newSkills: string[]
): { added: string[]; removed: string[]; hasChanges: boolean } => {
  const oldSet = new Set(oldSkills || []);
  const newSet = new Set(newSkills || []);

  const added = (newSkills || []).filter((skill) => !oldSet.has(skill));
  const removed = (oldSkills || []).filter((skill) => !newSet.has(skill));

  return {
    added,
    removed,
    hasChanges: added.length > 0 || removed.length > 0,
  };
};

/**
 * Compare work experiences and find changed bullets
 */
const diffWorkExperiences = (
  oldExperiences: Experience[],
  newExperiences: Experience[]
): WorkExperienceChanges[] => {
  const changes: WorkExperienceChanges[] = [];

  (newExperiences || []).forEach((newExp, index) => {
    const oldExp = (oldExperiences || [])[index];

    if (!oldExp) {
      // New experience added - mark all bullets as changed
      changes.push({
        index,
        company: newExp.company,
        position: newExp.position,
        changedBullets: (newExp.description || []).map((_, i) => i),
      });
      return;
    }

    const changedBullets: number[] = [];
    (newExp.description || []).forEach((newDesc, bulletIndex) => {
      const oldDesc = (oldExp.description || [])[bulletIndex];
      if (stringsAreDifferent(newDesc, oldDesc || "")) {
        changedBullets.push(bulletIndex);
      }
    });

    if (changedBullets.length > 0) {
      changes.push({
        index,
        company: newExp.company,
        position: newExp.position,
        changedBullets,
      });
    }
  });

  return changes;
};

/**
 * Compare projects and find changed descriptions
 */
const diffProjects = (
  oldProjects: Project[],
  newProjects: Project[]
): ProjectChanges[] => {
  const changes: ProjectChanges[] = [];

  (newProjects || []).forEach((newProj, index) => {
    const oldProj = (oldProjects || [])[index];

    if (!oldProj) {
      // New project added
      changes.push({
        index,
        name: newProj.name,
        descriptionChanged: true,
      });
      return;
    }

    if (stringsAreDifferent(newProj.description, oldProj.description)) {
      changes.push({
        index,
        name: newProj.name,
        descriptionChanged: true,
      });
    }
  });

  return changes;
};

/**
 * Compare two resume objects and return the changes
 */
export const diffResume = (
  oldResume: Partial<UserInfo>,
  newResume: Partial<UserInfo>
): ResumeChanges => {
  const professionalSummaryChanged = stringsAreDifferent(
    oldResume.professionalSummary || "",
    newResume.professionalSummary || ""
  );

  const skillsChanges = diffSkills(
    oldResume.skills || [],
    newResume.skills || []
  );

  const workExperienceChanges = diffWorkExperiences(
    oldResume.workExperiences || [],
    newResume.workExperiences || []
  );

  const projectChanges = diffProjects(
    oldResume.projects || [],
    newResume.projects || []
  );

  const hasAnyChanges =
    professionalSummaryChanged ||
    skillsChanges.hasChanges ||
    workExperienceChanges.length > 0 ||
    projectChanges.length > 0;

  return {
    professionalSummary: professionalSummaryChanged,
    skills: skillsChanges,
    workExperiences: workExperienceChanges,
    projects: projectChanges,
    hasAnyChanges,
  };
};

/**
 * Helper to check if a specific work experience bullet is changed
 */
export const isBulletChanged = (
  changes: ResumeChanges,
  experienceIndex: number,
  bulletIndex: number
): boolean => {
  const expChange = changes.workExperiences.find(
    (exp) => exp.index === experienceIndex
  );
  return expChange?.changedBullets.includes(bulletIndex) || false;
};

/**
 * Helper to check if a specific project description is changed
 */
export const isProjectChanged = (
  changes: ResumeChanges,
  projectIndex: number
): boolean => {
  return changes.projects.some(
    (proj) => proj.index === projectIndex && proj.descriptionChanged
  );
};

/**
 * Helper to check if a skill was added (new in this tweak)
 */
export const isSkillAdded = (
  changes: ResumeChanges,
  skill: string
): boolean => {
  return changes.skills.added.includes(skill);
};
