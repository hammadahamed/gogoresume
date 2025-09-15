import { Schema, Document } from 'mongoose';
import gogoresumeStandard from 'src/clients/mongodb/gogoresumeStandard';

export interface ITweakUsage extends Document {
  userId: Schema.Types.ObjectId; // Reference to the user
  lastTweaked: Date; // When the user last used a tweak
  dailyTweaks: number; // Number of tweaks used today
  totalTweaks: number; // Total tweaks used in the CURRENT PLAN Cycle
}

const tweakUsageSchema = new Schema<ITweakUsage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
      unique: true, // One record per user
      index: true,
    },
    lastTweaked: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dailyTweaks: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    totalTweaks: {
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

const TweakUsageModel = gogoresumeStandard.model<ITweakUsage>(
  'TweakUsage',
  tweakUsageSchema,
);

export default TweakUsageModel;
