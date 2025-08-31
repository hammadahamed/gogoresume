import Template1 from "./template1.jsx";
import Template2 from "./template2.jsx";
import Template3 from "./template3.jsx";

export const templatesList = {
  classic: {
    id: "classic",
    name: "Classic Professional",
    description: "Traditional layout ideal for professional positions",
    component: Template1,
    category: "classic",
    isPremium: false,
    tags: ["Professional", "Traditional", "ATS-Friendly"],
  },
  //   modern: {
  //     id: "modern",
  //     name: "Modern Sidebar",
  //     description: "Contemporary design with sidebar layout for tech roles",
  //     component: Template2,
  //     category: "modern",
  //     isPremium: false,
  //     tags: ["Modern", "Tech", "Sidebar"],
  //   },
  hybrid: {
    id: "hybrid",
    name: "Modern Minimal",
    description:
      "Professional hybrid design combining modern and classic elements",
    component: Template3,
    category: "hybrid",
    isPremium: false,
    tags: ["Hybrid", "Executive", "Structured"],
  },
};

export const getTemplate = (templateId = "classic") => {
  return templatesList[templateId] || templatesList.classic;
};

export const getAllTemplates = () => {
  return Object.values(templatesList);
};

export default templatesList;
