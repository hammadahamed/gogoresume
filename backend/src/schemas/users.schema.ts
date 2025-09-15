import { Schema, Document } from 'mongoose';
import gogoresumeStandard from 'src/clients/mongodb/gogoresumeStandard';

export enum AuthMethod {
  EMAIL_ONLY = 'EMAIL_ONLY',
  GOOGLE = 'GOOGLE',
}

export interface IGoogleSignInData {
  accessToken: string;
  refreshToken: string;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  isRestricted: boolean;
  lastLogin: Date;
  authMethod: AuthMethod;
  google: IGoogleSignInData;
  meta: object;
  plan: IUserPlan;
  billing: IBilling;
  profilePicture?: string;
}

export interface IUserPlan {
  planId: string;
  planStart: Date;
  planEnd: Date;
  currentPaymentId: string; // this is the _id of the payment document from our mongodb
}

export interface IBilling {
  city: string;
  country: string;
  state: string;
  street: string;
  zipcode: string;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isRestricted: {
      type: Boolean,
      default: false,
    },
    authMethod: {
      type: String,
      required: true,
    },
    google: {
      type: Object,
      required: false,
    },
    meta: {
      type: Object,
    },
    plan: {
      type: Object,
      default: null,
    },
    billing: {
      type: Object,
      default: null,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const UsersModel = gogoresumeStandard.model<IUser>('Users', userSchema);

export default UsersModel;
