import { planFeatures, planPeriodInDays, Plans } from 'src/planConfig';
import TweakUsageModel, { ITweakUsage } from 'src/schemas/tweaksUsage.schema';
import * as moment from 'moment';

export const getTotalTweaksUsed = (
  tweakUsage: ITweakUsage,
  userPlan: string,
) => {
  return userPlan === Plans.FREE
    ? tweakUsage.totalTweaks > planFeatures[Plans.FREE].count
      ? planFeatures[Plans.FREE].count
      : tweakUsage.totalTweaks
    : tweakUsage.totalTweaks;
};

export const calculateTweaksUsage = async (
  tweakUsage: ITweakUsage,
  userPlan: string,
) => {
  const today = moment().startOf('day').toDate();
  const isNotSameDay = !moment(tweakUsage.lastTweaked).isSame(today, 'day');
  if (isNotSameDay) {
    tweakUsage.dailyTweaks = 0;
    tweakUsage.lastTweaked = today;
    await tweakUsage.save();
  }
  const totalTweaksUsed = getTotalTweaksUsed(tweakUsage, userPlan);
  const dailyTweaksUsed =
    userPlan === Plans.FREE ? totalTweaksUsed : tweakUsage.dailyTweaks;
  const planPeriod = planFeatures[userPlan].planPeriod;
  const planDailyTweaks = planFeatures[userPlan].count;

  const totalTweaks =
    userPlan === Plans.FREE
      ? planDailyTweaks
      : planDailyTweaks * planPeriodInDays[planPeriod];

  const planTotalTweaksLeft = totalTweaks - totalTweaksUsed;

  return {
    planDailyTweaks,
    totalTweaks,
    planTotalTweaksLeft,
    totalTweaksUsed,
    dailyTweaksUsed,
    lastTweaked: tweakUsage.lastTweaked,
  };
};

export const incrementTweaksUsage = async (
  userId: string,
  tweakUsageDoc?: ITweakUsage,
) => {
  const tweakUsage =
    tweakUsageDoc || (await TweakUsageModel.findOne({ userId }));

  const today = new Date().toDateString(); // "Mon Jan 15 2024"
  const lastTweakedDay = tweakUsage.lastTweaked.toDateString();

  if (today !== lastTweakedDay)
    tweakUsage.dailyTweaks = 1; // New day - first tweak
  else tweakUsage.dailyTweaks++; // Same day - increment

  tweakUsage.totalTweaks++;
  tweakUsage.lastTweaked = moment().toDate();

  await tweakUsage.save();
};

// here we don't need to worry about if the plan is over or not., because that is taken care in JWT creation itself
// access token JWT refreshes frequently, so we don't need to check for plan expiration here.
export const isTweakUsageAvailable = async (
  tweakUsage: ITweakUsage,
  userPlan: string,
) => {
  const today = new Date().toDateString();
  const lastTweakedDay = tweakUsage.lastTweaked.toDateString();

  if (today !== lastTweakedDay && userPlan !== Plans.FREE) return true;

  const maxTweakCount = planFeatures[userPlan].count;
  const tweaksToConsider =
    userPlan === Plans.FREE ? tweakUsage.totalTweaks : tweakUsage.dailyTweaks;
  return tweaksToConsider < maxTweakCount;
};
