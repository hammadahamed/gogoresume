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
    "2 resumes",
    "10 AI-powered tweaks",
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
    discountedPrice: 5,
    features: [
      "10 resumes",
      "20 AI-powered tweaks/day",
      "Templates Access",
      "PDF downloads",
      "Email support",
    ],
  },
  {
    id: Plans.PRO_1_MONTH,
    name: "1 Month Pro",
    period: "1 month",
    description: "Ideal for active job seekers",
    price: 29,
    discountedPercentage: 50,
    discountedPrice: 15,
    // color: "#fffbe2",
    isPopular: true,
    features: [
      "20 resumes",
      "50 AI-powered tweaks/day",
      "Templates Access",
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
    discountedPrice: 39,
    features: [
      "50 resumes",
      "100 AI-powered tweaks/day",
      "Templates Access",
      "PDF downloads",
      "Priority email support",
    ],
  },
];

export const plans = [freePlan, ...pricedPlans];

export const comparisonFeatures = [
  {
    name: "Basic Features\n(Smart Suggestions, Download)",
    info: true,
    values: {
      [Plans.FREE]: true,
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
      [Plans.FREE]: "2",
      [Plans.PRO_7_DAYS]: "10",
      [Plans.PRO_1_MONTH]: "20",
      [Plans.PRO_3_MONTHS]: "50",
    },
    description: "Number of resumes you can create and save",
  },
  {
    name: "AI-Powered Tweaks",
    info: true,
    values: {
      [Plans.FREE]: "10",
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
      [Plans.FREE]: true,
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
      [Plans.FREE]: "Community",
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
