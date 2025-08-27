export enum Plans {
  FREE = "free",
  PRO_7_DAYS = "pro_7_days",
  PRO_1_MONTH = "pro_1_month",
  PRO_3_MONTHS = "pro_3_months",
}

export const freePlan = {
  id: Plans.FREE,
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
  ],
};

export const pricedPlans = [
  {
    id: Plans.PRO_7_DAYS,
    name: "7 Days Pro",
    period: "7 days",
    description: "Best for short-term job searches",
    price: 7,
    color: "#fffbe2",
    features: [
      "Unlimited resumes",
      "20 AI-powered tweaks/day (140/week)",
      "Premium templates",
      "PDF downloads",
      "Email support",
    ],
  },
  {
    id: Plans.PRO_1_MONTH,
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
      "Email support",
    ],
  },
  {
    id: Plans.PRO_3_MONTHS,
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
      "Priority email support",
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
      [Plans.PRO_7_DAYS]: true,
      [Plans.PRO_1_MONTH]: true,
      [Plans.PRO_3_MONTHS]: true,
    },
    description: "Core resume builder with template population",
  },
  {
    name: "Resumes",
    info: true,
    values: {
      free: "1",
      [Plans.PRO_7_DAYS]: "Unlimited",
      [Plans.PRO_1_MONTH]: "Unlimited",
      [Plans.PRO_3_MONTHS]: "Unlimited",
    },
    description: "Number of resumes you can create and save",
  },
  {
    name: "AI-Powered Tweaks",
    info: true,
    values: {
      free: "5 / month",
      [Plans.PRO_7_DAYS]: "20 / day",
      [Plans.PRO_1_MONTH]: "50 / day",
      [Plans.PRO_3_MONTHS]: "100 / day",
    },
    description: "AI-driven tweaks to align resume with job descriptions",
  },
  {
    name: "Chrome Extension",
    info: true,
    values: {
      free: true,
      [Plans.PRO_7_DAYS]: true,
      [Plans.PRO_1_MONTH]: true,
      [Plans.PRO_3_MONTHS]: true,
    },
    description: "Tweak and submit resumes directly from job portals",
  },
  //   {
  //     name: "Downloads",
  //     info: true,
  //     values: {
  //       free: "Text-only",
  //       pro_7_days: "PDF, Word",
  //       pro_1_month: "PDF, Word",
  //       pro_3_months: "PDF, Word, TXT",
  //     },
  //     description: "Export formats for resumes",
  //   },
  //   {
  //     name: "ATS Optimization",
  //     info: true,
  //     values: {
  //       free: "Basic",
  //       pro_7_days: "Advanced",
  //       pro_1_month: "Advanced",
  //       pro_3_months: "Advanced",
  //     },
  //     description: "Keyword and formatting optimization for ATS",
  //   },
  //   {
  //     name: "Resume Scoring",
  //     info: true,
  //     values: {
  //       free: false,
  //       pro_7_days: true,
  //       pro_1_month: true,
  //       pro_3_months: true,
  //     },
  //     description: "AI-based score for resume strength vs. JD",
  //   },
  {
    name: "Support",
    info: true,
    values: {
      free: "Community",
      [Plans.PRO_7_DAYS]: "Email",
      [Plans.PRO_1_MONTH]: "Email",
      [Plans.PRO_3_MONTHS]: "Priority Email",
    },
    description: "Access to customer support channels",
  },
  //   {
  //     name: "Analytics Dashboard",
  //     info: true,
  //     values: {
  //       free: false,
  //       pro_7_days: false,
  //       pro_1_month: true,
  //       pro_3_months: true,
  //     },
  //     description: "Track resume performance and tweak history",
  //   },
];
