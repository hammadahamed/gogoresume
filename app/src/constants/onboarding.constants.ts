export interface OnboardingOption {
  value: string;
  label: string;
  icon?: string;
}

// Experience Level Options
export const EXPERIENCE_LEVELS: OnboardingOption[] = [
  { value: "student", label: "Student", icon: "🎓" },
  { value: "fresher", label: "Fresh Graduate", icon: "🌱" },
  { value: "2-4", label: "2-4 Years Experience", icon: "💼" },
  { value: "5-10", label: "5-10 Years Experience", icon: "🚀" },
  { value: "10-15", label: "10-15 Years Experience", icon: "⭐" },
  { value: "15-20", label: "15-20 Years Experience", icon: "👑" },
  { value: "20+", label: "20+ Years Experience", icon: "🏆" },
];

// Industry Options
export const INDUSTRIES: OnboardingOption[] = [
  { value: "technology", label: "Technology & Software", icon: "💻" },
  { value: "finance", label: "Finance & Banking", icon: "💰" },
  { value: "healthcare", label: "Healthcare & Medical", icon: "🏥" },
  { value: "education", label: "Education & Training", icon: "📚" },
  { value: "marketing", label: "Marketing & Advertising", icon: "📈" },
  { value: "sales", label: "Sales & Business Development", icon: "🤝" },
  { value: "consulting", label: "Consulting", icon: "💡" },
  { value: "manufacturing", label: "Manufacturing & Engineering", icon: "⚙️" },
  { value: "retail", label: "Retail & E-commerce", icon: "🛒" },
  { value: "media", label: "Media & Entertainment", icon: "🎬" },
  { value: "real-estate", label: "Real Estate", icon: "🏢" },
  { value: "hospitality", label: "Hospitality & Tourism", icon: "🏨" },
  { value: "transportation", label: "Transportation & Logistics", icon: "🚛" },
  { value: "energy", label: "Energy & Utilities", icon: "⚡" },
  { value: "government", label: "Government & Public Sector", icon: "🏛️" },
  { value: "nonprofit", label: "Non-Profit & NGO", icon: "🤲" },
  { value: "legal", label: "Legal Services", icon: "⚖️" },
  { value: "agriculture", label: "Agriculture & Food", icon: "🌾" },
  { value: "construction", label: "Construction & Architecture", icon: "🏗️" },
  { value: "automotive", label: "Automotive", icon: "🚗" },
  { value: "telecommunications", label: "Telecommunications", icon: "📡" },
  { value: "aerospace", label: "Aerospace & Defense", icon: "✈️" },
  { value: "pharmaceuticals", label: "Pharmaceuticals & Biotech", icon: "💊" },
  { value: "fashion", label: "Fashion & Apparel", icon: "👗" },
  { value: "sports", label: "Sports & Recreation", icon: "⚽" },
  { value: "other", label: "Other", icon: "📋" },
];

// Common Designations by Experience Level
export const DESIGNATIONS_BY_EXPERIENCE = {
  student: [
    "Student",
    "Intern",
    "Research Assistant",
    "Teaching Assistant",
    "Part-time Associate",
  ],
  fresher: [
    "Associate",
    "Junior Developer",
    "Trainee",
    "Entry Level Analyst",
    "Assistant",
    "Graduate Trainee",
  ],
  "2-4": [
    "Software Developer",
    "Analyst",
    "Associate Consultant",
    "Marketing Executive",
    "Sales Representative",
    "Project Coordinator",
    "Business Analyst",
  ],
  "5-10": [
    "Senior Developer",
    "Team Lead",
    "Senior Analyst",
    "Project Manager",
    "Senior Consultant",
    "Product Manager",
    "Marketing Manager",
    "Operations Manager",
  ],
  "10-15": [
    "Principal Engineer",
    "Senior Manager",
    "Director",
    "Practice Lead",
    "Head of Department",
    "VP",
    "General Manager",
  ],
  "15-20": [
    "Senior Director",
    "Vice President",
    "Chief Technology Officer",
    "Chief Marketing Officer",
    "Chief Operations Officer",
    "Partner",
  ],
  "20+": [
    "Chief Executive Officer",
    "Chief Financial Officer",
    "President",
    "Founder",
    "Chairman",
    "Board Member",
  ],
};

// Form validation rules
export const VALIDATION_RULES = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  lastName: {
    required: false,
    maxLength: 50,
  },
  experienceLevel: {
    required: true,
  },
  designation: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  industry: {
    required: true,
  },
};

// Onboarding form interface
export interface OnboardingFormData {
  firstName: string;
  lastName: string;
  experienceLevel: string;
  designation: string;
  industry: string;
}
