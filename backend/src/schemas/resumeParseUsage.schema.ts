import { Schema, Document } from 'mongoose';
import gogoresumeStandard from 'src/clients/mongodb/gogoresumeStandard';

export interface IResumeParseUsage extends Document {
  userId: Schema.Types.ObjectId; // Reference to the user
  lastParsed: Date; // When the user last parsed a resume
  dailyParses: number; // Number of parses used today
  totalParses: number; // Total parses used lifetime
}

const resumeParseUsageSchema = new Schema<IResumeParseUsage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
      unique: true, // One record per user
      index: true,
    },
    lastParsed: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dailyParses: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    totalParses: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

const ResumeParseUsageModel = gogoresumeStandard.model<IResumeParseUsage>(
  'ResumeParseUsage',
  resumeParseUsageSchema,
);

export default ResumeParseUsageModel;
