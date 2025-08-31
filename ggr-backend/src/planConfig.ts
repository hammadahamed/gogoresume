export enum Plans {
  FREE = 'free',
  PRO_7_DAYS = 'pro_7_days',
  PRO_1_MONTH = 'pro_1_month',
  PRO_3_MONTHS = 'pro_3_months',
}

const paymentConfig = {
  [Plans.PRO_7_DAYS]: {
    dodo: {
      id: 'pdt_JINsxFgveyiKN9mua8qiF',
      days: 7,
    },
  },
  [Plans.PRO_1_MONTH]: {
    dodo: {
      id: 'pdt_V3utQF4b9tSjrrC6xbVHp',
      days: 30, // 1 month
    },
  },
  [Plans.PRO_3_MONTHS]: {
    dodo: {
      id: 'pdt_i1nN5weo3ZNDGiQHglUpV',
      days: 90, // 3 months
    },
  },
};

export const planRanking = [
  Plans.FREE,
  Plans.PRO_7_DAYS,
  Plans.PRO_1_MONTH,
  Plans.PRO_3_MONTHS,
];

export enum PlanSpan {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  THREE_MONTHS = 'three_months',
}

export const planPeriodInDays = {
  [PlanSpan.DAY]: 1,
  [PlanSpan.WEEK]: 7,
  [PlanSpan.MONTH]: 30,
  [PlanSpan.THREE_MONTHS]: 90,
};

export const planFeatures = {
  [Plans.FREE]: {
    count: 10,
    countPeriod: PlanSpan.MONTH,
    carryForward: false,
    planPeriod: null,
    numberOfResumes: 2,
  },
  [Plans.PRO_7_DAYS]: {
    count: 20,
    countPeriod: PlanSpan.DAY,
    carryForward: true,
    planPeriod: PlanSpan.WEEK,
    numberOfResumes: 5,
  },
  [Plans.PRO_1_MONTH]: {
    count: 50,
    countPeriod: PlanSpan.DAY,
    carryForward: true,
    planPeriod: PlanSpan.MONTH,
    numberOfResumes: 20,
  },
  [Plans.PRO_3_MONTHS]: {
    count: 100,
    countPeriod: PlanSpan.DAY,
    carryForward: true,
    planPeriod: PlanSpan.THREE_MONTHS,
    numberOfResumes: 50,
  },
};

export default paymentConfig;
