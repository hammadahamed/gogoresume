import { watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  schema?: object;
}

const defaultSEO: SEOConfig = {
  title:
    "GoGoResume – AI Resume Tailor + Autofill Assistant | ATS Optimized Resume Builder",
  description:
    "Tailor your resume to any job instantly + autofill job applications in one click. AI-powered ATS resume optimizer that matches your resume to job descriptions automatically.",
  keywords:
    "ATS resume checker, resume keyword optimizer, how to match resume to job description, autofill job applications, chrome extension autofill resume, resume writer ai, ATS resume scanner, resume tailored for job",
  ogTitle: "GoGoResume – AI Resume Tailor + Autofill Assistant",
  ogDescription:
    "Tailor your resume to any job instantly + autofill job applications in one click. AI-powered ATS resume optimizer.",
  ogImage:
    "https://opengraph.b-cdn.net/production/images/e69a36dd-d378-4b0c-b352-f9a2452caad3.png?token=FH8tt5ZYuZ70xC8b9eMcY-5W_hNh2nbOY3oSbOOIy9I&height=365&width=1200&expires=33300155186",
  ogUrl: "https://gogoresume.com",
  twitterTitle: "GoGoResume – AI Resume Tailor + Autofill Assistant",
  twitterDescription:
    "Tailor your resume to any job instantly + autofill job applications in one click.",
  twitterImage:
    "https://opengraph.b-cdn.net/production/images/e69a36dd-d378-4b0c-b352-f9a2452caad3.png?token=FH8tt5ZYuZ70xC8b9eMcY-5W_hNh2nbOY3oSbOOIy9I&height=365&width=1200&expires=33300155186",
  canonical: "https://gogoresume.com",
  schema: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GoGoResume",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Chrome Extension",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "AI-powered resume optimization tool that tailors your resume to job descriptions and autofills job applications automatically.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "100",
    },
    featureList: [
      "ATS Resume Optimizer",
      "Resume Keyword Matching",
      "Job Application Autofill",
      "Chrome Extension",
      "Resume Templates",
    ],
  },
};

function updateMetaTag(name: string, content: string, attribute = "name") {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function updateTitle(title: string) {
  document.title = title;
}

function updateCanonical(url: string) {
  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
}

function updateSchema(schema: object) {
  let element = document.querySelector('script[type="application/ld+json"]');
  if (!element) {
    element = document.createElement("script");
    element.setAttribute("type", "application/ld+json");
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(schema);
}

// Export utility function that can be called directly (e.g., in router)
export function applySEO(config: Partial<SEOConfig> = {}) {
  const seoConfig = { ...defaultSEO, ...config };

  // Update title
  if (seoConfig.title) {
    updateTitle(seoConfig.title);
  }

  // Update meta description
  if (seoConfig.description) {
    updateMetaTag("description", seoConfig.description);
  }

  // Update keywords
  if (seoConfig.keywords) {
    updateMetaTag("keywords", seoConfig.keywords);
  }

  // Update Open Graph tags
  if (seoConfig.ogTitle) {
    updateMetaTag("og:title", seoConfig.ogTitle, "property");
  }
  if (seoConfig.ogDescription) {
    updateMetaTag("og:description", seoConfig.ogDescription, "property");
  }
  if (seoConfig.ogImage) {
    updateMetaTag("og:image", seoConfig.ogImage, "property");
  }
  if (seoConfig.ogUrl) {
    updateMetaTag("og:url", seoConfig.ogUrl, "property");
  }
  updateMetaTag("og:type", "website", "property");

  // Update Twitter tags
  if (seoConfig.twitterTitle) {
    updateMetaTag("twitter:title", seoConfig.twitterTitle);
  }
  if (seoConfig.twitterDescription) {
    updateMetaTag("twitter:description", seoConfig.twitterDescription);
  }
  if (seoConfig.twitterImage) {
    updateMetaTag("twitter:image", seoConfig.twitterImage);
  }
  updateMetaTag("twitter:card", "summary_large_image");

  // Update canonical
  if (seoConfig.canonical) {
    updateCanonical(seoConfig.canonical);
  }

  // Update schema
  if (seoConfig.schema) {
    updateSchema(seoConfig.schema);
  }
}

export function useSEO(config: Partial<SEOConfig> = {}) {
  const route = useRoute();
  const seoConfig = { ...defaultSEO, ...config };

  onMounted(() => {
    applySEO(config);
  });

  watch(
    () => route.path,
    () => {
      applySEO(config);
    }
  );

  return {
    applySEO: () => applySEO(config),
  };
}
