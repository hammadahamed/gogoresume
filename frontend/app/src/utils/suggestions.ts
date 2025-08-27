import { useUserStore } from "../stores/useUserStore";
import type { UserInfo } from "../types/resume.types";

export interface FieldInfo {
  type: string;
  name: string;
  id: string;
  value: string;
  placeholder: string;
}

interface SuggestionsResult {
  personalInfo: string[];
  workExperiences: string[];
  education: string[];
  skills: string[];
  projects: string[];
  links: string[];
}

function getStructuredValuesFromUserInfo(
  userInfo: UserInfo | null
): SuggestionsResult {
  const result: SuggestionsResult = {
    personalInfo: [],
    workExperiences: [],
    education: [],
    skills: [],
    projects: [],
    links: [],
  };

  if (!userInfo) return result;

  // Personal Info
  if (userInfo.personalInfo) {
    const {
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      location = "",
      address = "",
      linkedin = "",
      portfolio = "",
      professionalLinks = [],
    } = userInfo.personalInfo;

    // Basic personal info
    result.personalInfo = [
      firstName,
      lastName,
      email,
      phone,
      location,
      address,
    ].filter(Boolean) as string[];

    // Professional links
    result.links = [
      // Add LinkedIn and portfolio if they exist
      linkedin && `${linkedin}`,
      portfolio && `${portfolio}`,
      // Add additional professional links
      ...professionalLinks.map((link) => `${link.url}`),
    ].filter(Boolean) as string[];
  }

  // Experiences
  userInfo.workExperiences.forEach((exp) => {
    console.log("🚀 ~ userInfo.workExperiences.forEach ~ exp:", exp);
    const {
      company,
      position,
      location,
      description,
      startDate,
      endDate,
      achievements,
    } = exp;

    result.workExperiences.push(
      ...[company, position, location, description, startDate, endDate].filter(
        Boolean
      ),
      ...achievements.filter(Boolean)
    );
  });

  // Education
  userInfo.education.forEach((edu) => {
    const { school, degree, fieldOfStudy, gpa } = edu;
    result.education.push(
      ...[school, degree, fieldOfStudy, gpa].filter((val): val is string =>
        Boolean(val)
      ),
      ...(edu.honors || []).filter(Boolean)
    );
  });

  // Skills
  result.skills = userInfo.skills.filter(Boolean);

  // Projects
  userInfo.projects.forEach((project) => {
    const { name, description, outcome, projectLink, sourceCode } = project;
    result.projects.push(
      ...[name, description, outcome, projectLink, sourceCode].filter(Boolean),
      ...project.technologies.filter(Boolean)
    );
  });

  return result;
}

export function getSuggestions(fieldInfo: FieldInfo): SuggestionsResult {
  console.log("Getting suggestions for field:", fieldInfo);
  const userStore = useUserStore();

  const structuredValues = getStructuredValuesFromUserInfo(userStore.userInfo);
  console.log("Structured suggestions:", structuredValues);

  return structuredValues;
}
