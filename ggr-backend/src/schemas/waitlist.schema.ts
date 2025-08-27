import { Schema, Document } from 'mongoose';
import gogoresumeStandard from 'src/clients/mongodb/gogoresumeStandard';

export interface IWaitlist extends Document {
  name: string;
  email: string;
  profession: string;
  createdAt: Date;
  updatedAt: Date;
}

const waitlistSchema = new Schema<IWaitlist>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    profession: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true },
);

// Add index for email field for uniqueness checks
waitlistSchema.index({ email: 1 }, { unique: true });

const WaitlistModel = gogoresumeStandard.model<IWaitlist>(
  'Waitlist',
  waitlistSchema,
);

export default WaitlistModel;
