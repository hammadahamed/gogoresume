import { Schema, Document } from 'mongoose';
import gogoresumeStandard from 'src/clients/mongodb/gogoresumeStandard';

export interface IUserProfile extends Document {
  userId: string;
  data: object;
  createdAt: Date;
  updatedAt: Date;
}

const userProfileSchema = new Schema<IUserProfile>(
  {
    userId: {
      type: String,
      ref: 'User',
      required: true,
      trim: true,
    },
    data: {
      type: Object,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const UserProfileModel = gogoresumeStandard.model<IUserProfile>(
  'userProfile',
  userProfileSchema,
);

export default UserProfileModel;
