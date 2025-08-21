export const freePlan = {
  id: "free",
  name: "Free",
  period: "forever",
  description: "Perfect for trying out",
  price: 0,
  color: "#fcf2fd",
  features: [
    "1 resume",
    "2 AI-powered tweaks/month",
    "Basic templates",
    "Text-only download",
    "Basic ATS optimization",
  ],
};

export const pricedPlans = [
  {
    id: "pro_7_days",
    name: "7 Days Pro",
    period: "7 days",
    description: "Best for short-term job searches",
    price: 19,
    color: "#fffbe2",
    features: [
      "Unlimited resumes",
      "20 AI-powered tweaks/day (140/week)",
      "Premium templates",
      "PDF downloads",
      "Advanced ATS optimization",
      "Email support",
    ],
  },
  {
    id: "pro_1_month",
    name: "1 Month Pro",
    period: "1 month",
    description: "Ideal for active job seekers",
    price: 24,
    color: "#e8e8ff",
    isPopular: true,
    features: [
      "Unlimited resumes",
      "50 AI-powered tweaks/day (1,500/month)",
      "Premium templates",
      "PDF downloads",
      "Advanced ATS optimization",
      "Email support",
      "Cover letter builder",
      "Analytics dashboard",
      "Custom branding",
    ],
  },
  {
    id: "pro_3_months",
    name: "3 Months Pro",
    period: "3 months",
    description: "Great value for extended job searches",
    price: 59,
    color: "#ebf9fc",
    features: [
      "Unlimited resumes",
      "100 AI-powered tweaks/day (9,000/3 months)",
      "Premium templates",
      "PDF downloads",
      "Advanced ATS optimization",
      "Priority email support",
      "Cover letter builder",
      "Analytics dashboard",
      "Custom branding",
    ],
  },
];

export const plans = [freePlan, ...pricedPlans];

export const comparisonFeatures = [
  {
    name: "Basic Features",
    info: true,
    values: {
      free: true,
      pro_weekly: true,
      pro_monthly: true,
      pro_quarterly: true,
    },
    description: "Core resume builder with template population",
  },
  {
    name: "Resumes",
    info: true,
    values: {
      free: "1",
      pro_weekly: "Unlimited",
      pro_monthly: "Unlimited",
      pro_quarterly: "Unlimited",
    },
    description: "Number of resumes you can create and save",
  },
  {
    name: "AI-Powered Tweaks",
    info: true,
    values: {
      free: "5 / month",
      pro_weekly: "20 / day",
      pro_monthly: "50 / day",
      pro_quarterly: "100 / day",
    },
    description: "AI-driven tweaks to align resume with job descriptions",
  },
  {
    name: "Chrome Extension",
    info: true,
    values: {
      free: true,
      pro_weekly: true,
      pro_monthly: true,
      pro_quarterly: true,
    },
    description: "Tweak and submit resumes directly from job portals",
  },
  //   {
  //     name: "Downloads",
  //     info: true,
  //     values: {
  //       free: "Text-only",
  //       pro_weekly: "PDF, Word",
  //       pro_monthly: "PDF, Word",
  //       pro_quarterly: "PDF, Word, TXT",
  //     },
  //     description: "Export formats for resumes",
  //   },
  {
    name: "ATS Optimization",
    info: true,
    values: {
      free: "Basic",
      pro_weekly: "Advanced",
      pro_monthly: "Advanced",
      pro_quarterly: "Advanced",
    },
    description: "Keyword and formatting optimization for ATS",
  },
  //   {
  //     name: "Resume Scoring",
  //     info: true,
  //     values: {
  //       free: false,
  //       pro_weekly: true,
  //       pro_monthly: true,
  //       pro_quarterly: true,
  //     },
  //     description: "AI-based score for resume strength vs. JD",
  //   },
  {
    name: "Support",
    info: true,
    values: {
      free: "Community",
      pro_weekly: "Email",
      pro_monthly: "Email",
      pro_quarterly: "Priority Email",
    },
    description: "Access to customer support channels",
  },
  //   {
  //     name: "Analytics Dashboard",
  //     info: true,
  //     values: {
  //       free: false,
  //       pro_weekly: false,
  //       pro_monthly: true,
  //       pro_quarterly: true,
  //     },
  //     description: "Track resume performance and tweak history",
  //   },
];
