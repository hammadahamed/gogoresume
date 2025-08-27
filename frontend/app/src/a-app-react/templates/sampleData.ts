import type { UserInfo } from "../../types/resume.types";

export const sampleUserData: UserInfo = {
  personalInfo: {
    firstName: "Hammad",
    lastName: "Ahamed",
    email: "hammadahamed.dev@gmail.com",
    phone: "(+91) 9080537172",
    location: "India",
    professionalLinks: [
      { label: "GitHub", url: "https://github.com/hammadahamed" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/hammad-dahamed/" },
      { label: "Portfolio", url: "https://hammadahamed.com" },
    ],
  },
  professionalSummary:
    "Proficient in designing scalable solutions across web and mobile platforms, with expertise in full-stack development, cybersecurity/application security, and team collaboration across multi-disciplinary teams.",
  workExperiences: [
    {
      position: "Senior Software Engineer",
      company: "HighLevel",
      location: "Remote",
      startDate: "Jun, 2024",
      endDate: "Present",
      current: true,
      description:
        "Architected & implemented a sophisticated Analytics module for Social Planner, delivering daily & weekly insights for 1 Million + connected social accounts.",
      achievements: [
        "Directed frontend standards and implementations across the organisation, doubling the development speed and significantly improving code quality.",
        "Designed and deployed scalable, Stable, Resilient, and Fault-tolerant backend systems, achieving 99% uptime with Back-off retries",
        "Built and maintained micro-services, GKE Kubernetes pods, REST API's and data processors with less than 1% of errors against the peer modules.",
        "Building Micro-frontends, Scalable infrastructure & solution-oriented new features.",
        "Created complex frontends involving charts with Micro Frontends systems.",
      ],
    },
    {
      position: "Software Development Engineer",
      company: "Pando Corp",
      location: "Bangalore, India",
      startDate: "Oct 2022",
      endDate: "May, 2024",
      current: false,
      description:
        "Team Lead for the mobile app development in procurement module.",
      achievements: [
        "Revamped the existing version, achieving over 80% performance boost against its predecessor by Efficient use of state management.",
        "Developed exceptional Flutter Widgets, providing fluid transitions that significantly enhanced the user experience.",
        "Established as primary source for security issues by swiftly identifying & proving false positives in a client vulnerability report on behalf of other teams.",
        "Built Strong and reusable components in Vue.js and React and resilient API's",
        "Swiftly built an optimised multi-layer Search feature in a tight deadline, with minimal code changes, which demanded total refactor otherwise, now widely used by the clients",
        "Built a custom Email builder module using ejs, AWS S3 and AWS SES.",
        "Wrote scalable and generic micro-services for push notification system using FCM & Bull Queue",
        "Identified and fixed failure points in micro-services in scaled environments, by isolating and encapsulating the tightly coupled executions.",
        "Optimised backend operations at appropriate points, which increased the API response speed by 60%.",
        "Implemented security upgrades for web application in both frontend & backend to prevent XSS, RCE & SQLi etc., privileges validations to prevent IDORs.",
      ],
    },
    {
      position: "Associate Software Engineer",
      company: "Applied Materials",
      location: "Bangalore, India",
      startDate: "Aug 2021",
      endDate: "Oct 2022",
      current: false,
      description:
        "Built complex visualization charts for data analysis of information from the organisation's proprietary factories using Angular, D3.js and High Charts.",
      achievements: [
        "Refactored parts of the codebase, eliminating redundant code from respective modules and replacing with optimised code.",
        "Acted as Scrum Master, grooming and planning the tickets",
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor of Electronics and Communications Engineering",
      fieldOfStudy: "Electronics and Communications Engineering",
      school: "Bannari Amman Institute of Technology",
      startDate: "2017",
      endDate: "2021",
      gpa: "8.2",
      honors: ["Dean's List", "Academic Excellence Award"],
    },
  ],
  skills: [
    "Javascript",
    "Typescript",
    "Python",
    "Dart",
    "Java",
    "Flutter",
    "Vue.js",
    "Vue3",
    "React",
    "Angular.js",
    "HTML",
    "CSS",
    "SCSS",
    "Tailwind",
    "Node.js",
    "Nest.js",
    "Express.js",
    "Fastify",
    "Spring Boot",
    "Mongo Db",
    "Postgres",
    "express.js",
    "Firebase",
    "AWS",
    "Docker",
    "Redis",
    "Google cloud",
    "Kubernetes",
  ],
  projects: [
    {
      name: "Scrumkits.com",
      description:
        "Realtime App to conduction Story Pointing and Retrospective sessions",
      technologies: ["Vue.js", "Redis"],
      url: "https://scrumkits.com",
    },
    {
      name: "Grootform.com",
      description:
        "A Low-Code No-code form builder similar to Typeform, using micro-frontend architecture & module federation",
      technologies: ["Vue.js", "WIP"],
      url: "https://grootform.com",
    },
    {
      name: "ChatGPT Pro",
      description:
        "ChatGPT AI Chrome Extension with Advanced features like Speech to Text, Pick Text, Saved Prompt, Prefix & Suffix prompts",
      technologies: ["React"],
      url: "",
    },
    {
      name: "JSON Visualizer",
      description:
        "A web app to visualize JSON data in a node base structural flow representation",
      technologies: ["React"],
      url: "",
    },
    {
      name: "Cash Flow",
      description:
        "A financial mobile app to track & settle debts, much like split-wise, Along with a module for Financial calculator with tabular visualization",
      technologies: ["Flutter"],
      url: "",
    },
  ],
};
