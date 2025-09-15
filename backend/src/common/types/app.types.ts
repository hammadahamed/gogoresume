export interface IJwtPayloadPlan {
  planId: string;
  planStart?: Date;
  planEnd?: Date;
}
export interface IJwtPayload {
  id: string;
  email: string;
  currentPlan: IJwtPayloadPlan;
}
