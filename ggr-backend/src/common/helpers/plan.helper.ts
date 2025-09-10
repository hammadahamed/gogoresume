import * as moment from 'moment';
import paymentConfig, { planRanking, Plans } from 'src/planConfig';
import PaymentModel, { IPayment } from 'src/schemas/payment.schema';
import { IUser } from 'src/schemas/users.schema';
import { IJwtPayloadPlan } from '../types/app.types';

const fields: Partial<Record<keyof IPayment, 1>> = {
  internalPlanId: 1,
  providerPaymentId: 1,
};

export const getIsExpired = (planEnd: Date) => moment().isAfter(planEnd);

export const getDaysOfPlan = (planId: string) => {
  return paymentConfig[planId].dodo.days;
};

export const getPlanEnd = (planId: string) => {
  return moment().add(getDaysOfPlan(planId), 'days').toDate();
};

export const checkIfUserAlreadyHasPlan = async (user: IUser) => {
  return user.plan && user.plan.planEnd > moment().toDate();
};

export const getPlanDataForTokenGeneration = async (user: IUser) => {
  let currentUserPlan = Plans.FREE;

  const paymentIdMongo = user.plan?.currentPaymentId;
  if (!user.plan || !paymentIdMongo) return { planId: currentUserPlan };

  const isExpired = user.plan?.planEnd && getIsExpired(user.plan.planEnd);
  if (!isExpired) {
    const payment = await PaymentModel.findById(paymentIdMongo).select(fields);
    if (payment) currentUserPlan = payment.internalPlanId as Plans;
  }
  return {
    planId: currentUserPlan,
    ...(currentUserPlan !== Plans.FREE && {
      planStart: user.plan.planStart,
      planEnd: user.plan.planEnd,
    }),
  } as IJwtPayloadPlan;
};

const planUpgradeData = (currentPlan: Plans) => {
  const data = {
    upgradeAvailable: false,
    upgradeAvailablePlans: null,
  };
  const currentPlanIndex = planRanking.indexOf(currentPlan);
  if (currentPlanIndex < planRanking.length - 1) {
    data.upgradeAvailable = true;
    data.upgradeAvailablePlans = planRanking.slice(currentPlanIndex + 1);
  }
  return data;
};

export const constructPlanDataForBootstrap = async (user: IUser) => {
  const paymentIdMongo = user.plan?.currentPaymentId;
  const defaultReturn = {
    internalPlanId: Plans.FREE,
    isActive: false,
    ...planUpgradeData(Plans.FREE),
  };
  if (!user.plan || !paymentIdMongo) {
    return defaultReturn;
  }
  const payment = await PaymentModel.findById(paymentIdMongo).select(fields);
  if (!payment) return defaultReturn;
  const isExpired = getIsExpired(user.plan.planEnd);

  //  we are supplying the plan details even after plan expiry
  //  because, this will be used to show previous plan details in frontend
  const plan = {
    internalPlanId: payment.internalPlanId,
    planStart: user.plan.planStart,
    planEnd: user.plan.planEnd,
    providerPaymentId: payment.providerPaymentId,
    isActive: !isExpired,
    ...planUpgradeData(
      isExpired ? Plans.FREE : (payment.internalPlanId as Plans),
    ),
  };
  return plan;
};

export const userCurrentPlan = async (user: IUser) => {
  const paymentIdMongo = user.plan?.currentPaymentId;
  if (!user.plan || !paymentIdMongo) return Plans.FREE;
  const payment = await PaymentModel.findById(paymentIdMongo).select(fields);
  return payment.internalPlanId as Plans;
};
