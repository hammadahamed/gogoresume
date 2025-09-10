import { toRef } from "vue";
import type { UserInfo } from "../../types/resume.types";

const sampleUserData: UserInfo = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    title: "Senior Software Engineer, 5+ Years of Experience",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    professionalLinks: [
      { label: "GitHub", url: "https://github.com/johndoe" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/johndoe/" },
      { label: "Portfolio", url: "https://johndoe.dev" },
    ],
  },
  professionalSummary:
    "Experienced software engineer with expertise in full-stack development, cloud architecture, and agile methodologies. Proven track record of delivering scalable solutions and leading cross-functional teams to achieve business objectives.",
  workExperiences: [
    {
      position: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      current: true,
      description: [
        "Led development of microservices architecture serving 2M+ users, improving system performance by 40%.",
        "Architected and implemented CI/CD pipelines, reducing deployment time from hours to minutes.",
        "Mentored junior developers and established best practices for code quality and testing.",
        "Collaborated with product managers to define technical requirements and roadmap prioritization.",
        "Built responsive web applications using React, Node.js, and PostgreSQL.",
        "Implemented security best practices and conducted code reviews for multiple projects.",
      ],
    },
    {
      position: "Software Development Engineer",
      company: "Innovation Labs",
      location: "Seattle, WA",
      startDate: "Jun 2020",
      endDate: "Dec 2021",
      current: false,
      description: [
        "Developed and maintained RESTful APIs handling 100K+ daily requests with 99.9% uptime.",
        "Optimized database queries and implemented caching strategies, improving response times by 60%.",
        "Built automated testing suites achieving 90+ code coverage across all projects.",
        "Integrated third-party services and APIs for payment processing and user authentication.",
        "Participated in agile development processes and sprint planning sessions.",
        "Created technical documentation and contributed to knowledge sharing initiatives.",
      ],
    },
    {
      position: "Junior Software Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      startDate: "Aug 2019",
      endDate: "May 2020",
      current: false,
      description: [
        "Built and maintained web applications using JavaScript, HTML, and CSS frameworks.",
        "Collaborated with design team to implement responsive user interfaces.",
        "Participated in code reviews and contributed to improving development workflows.",
        "Fixed bugs and implemented feature enhancements based on user feedback.",
        "Assisted with database maintenance and performed data migration tasks.",
        "Contributed to testing efforts and helped identify and resolve performance bottlenecks.",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      startDate: "2015",
      endDate: "2019",
      gpa: "3.7",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Express.js",
    "Django",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "AWS",
    "Docker",
    "Kubernetes",
    "Git",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "GraphQL",
    "REST APIs",
  ],
  projects: [
    {
      name: "TaskManager Pro",
      description:
        "A comprehensive project management application with real-time collaboration features and advanced analytics dashboard.",
      projectLink: "https://taskmanager-pro.example.com",
      sourceCode: "https://github.com/johndoe/taskmanager-pro",
    },
    {
      name: "EcoTracker",
      description:
        "Environmental impact tracking mobile app helping users monitor their carbon footprint with gamification elements. This is a very long description to test the layout of the resume.",
      projectLink: "https://ecotracker.example.com",
      sourceCode: "https://github.com/johndoe/ecotracker",
    },
    {
      name: "CodeSnippet Hub",
      description:
        "Developer-focused platform for sharing and discovering code snippets with syntax highlighting and search functionality. This is a very long description to test the layout of the resume.",
      projectLink: "https://codesnippet-hub.example.com",
      sourceCode: "https://github.com/johndoe/codesnippet-hub",
    },
    {
      name: "Budget Buddy",
      description:
        "Personal finance management tool with automated expense categorization and financial goal tracking. This is a very long description to test the layout of the resume.",
      projectLink: "https://budget-buddy.example.com",
      sourceCode: "https://github.com/budget-buddy",
    },
    // {
    //   name: "Weather Dashboard",
    //   description:
    //     "Real-time weather monitoring application with interactive maps and personalized weather alerts.",
    //   projectLink: "https://weather-dashboard.example.com",
    //   sourceCode: "https://github.com/johndoe/weather-dashboard",
    // },
  ],
};

export const useSampleUserData = () => {
  return { sampleUserData: toRef(sampleUserData) };
};
