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
  professionalSummary: string;
  title: string;
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
    title: "",
    personalInfo: [],
    professionalSummary: "",
    workExperiences: [],
    education: [],
    skills: [],
    projects: [],
    links: [],
  };

  if (!userInfo) return result;
  result.professionalSummary = userInfo.professionalSummary;
  result.title = userInfo.personalInfo.title;

  // Personal Info
  if (userInfo.personalInfo) {
    const {
      firstName = "",
      lastName = "",
      title = "",
      email = "",
      phone = "",
      location = "",
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
      title,
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
    const { company, position, location, description, startDate, endDate } =
      exp;

    result.workExperiences.push(
      ...[
        company,
        position,
        location,
        description.join(", "),
        startDate,
        endDate,
      ].filter(Boolean)
    );
  });

  // Education
  userInfo.education.forEach((edu) => {
    const { school, degree, gpa } = edu;
    result.education.push(
      ...[school, degree, gpa].filter((val): val is string => Boolean(val))
    );
  });

  // Skills
  result.skills = userInfo.skills.filter(Boolean);

  // Projects
  userInfo.projects.forEach((project) => {
    const { name, description, projectLink, sourceCode } = project;
    result.projects.push(
      ...[name, description, projectLink || "", sourceCode || ""].filter(
        Boolean
      )
    );
  });

  return result;
}

export function getSuggestions(fieldInfo?: FieldInfo): SuggestionsResult {
  const userStore = useUserStore();

  const structuredValues = getStructuredValuesFromUserInfo(userStore.userInfo);
  console.log("Structured suggestions:", structuredValues);

  return structuredValues;
}
