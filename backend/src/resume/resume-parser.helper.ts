/**
 * Get the prompt for parsing a resume into structured JSON format
 */
export function getParsePrompt(resumeText: string): string {
  return `You are a resume parser. Extract information from the following resume text and return it as a JSON object matching this exact TypeScript interface:

interface PersonalInfo {
  firstName: string;        // First name of the person
  lastName: string;         // Last name of the person
  email: string;            // Email address
  phone: string;            // Phone number
  location: string;         // City, State or full address
  linkedin: string;         // LinkedIn URL (empty string if not found)
  portfolio: string;        // Portfolio/personal website URL (empty string if not found)
  professionalLinks: Array<{ label: string; url: string }>; // Other professional links (GitHub, etc.)
  professionalSummary: string; // Professional summary or objective statement
}

interface Experience {
  company: string;          // Company name
  position: string;         // Job title/position
  location: string;         // Job location
  startDate: string;        // Start date in "MMM YYYY" format (e.g., "Jan 2020")
  endDate: string;          // End date in "MMM YYYY" format, or "Present" if current
  current: boolean;         // true if this is current job
  description: string[];    // Array of bullet points describing responsibilities/achievements
}

interface Education {
  school: string;           // School/University name
  degree: string;           // Degree and major (e.g., "Bachelor of Science in Computer Science")
  gpa?: string;             // GPA if mentioned (optional)
  startDate: string;        // Start date in "MMM YYYY" format
  endDate: string;          // End date in "MMM YYYY" format or expected graduation
  honors?: string[];        // Dean's list, honors, etc. (optional)
}

interface Project {
  name: string;             // Project name
  description: string;      // Project description (can be multi-line)
  projectLink?: string;     // Live project URL (optional)
  sourceCode?: string;      // Source code URL like GitHub (optional)
}

interface UserInfo {
  personalInfo: PersonalInfo;
  workExperiences: Experience[];
  education: Education[];
  skills: string[];         // Array of skill names
  projects: Project[];
}

RULES:
1. Return ONLY valid JSON, no markdown code blocks, no explanations
2. Use empty strings "" for missing text fields, empty arrays [] for missing array fields
3. For dates, use "MMM YYYY" format (e.g., "Jan 2020", "Dec 2023")
4. For current positions, set endDate to "Present" and current to true
5. Split skills by commas, semicolons, or bullet points into individual array items
6. Each work experience bullet point should be a separate string in the description array
7. If no professional summary is found, generate a brief one based on the resume content
8. Extract all URLs found (LinkedIn, GitHub, portfolio, etc.) to appropriate fields

RESUME TEXT:
${resumeText}

Return the parsed UserInfo JSON:`;
}
