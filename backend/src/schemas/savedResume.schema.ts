import { Schema, Document } from 'mongoose';
import gogoresumeStandard from 'src/clients/mongodb/gogoresumeStandard';

export interface ISavedResume extends Document {
  userId: string;
  name: string;
  data: object;
  templateId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const savedResumeSchema = new Schema<ISavedResume>(
  {
    userId: {
      type: String,
      ref: 'User',
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    data: {
      type: Object,
      required: true,
    },
    templateId: {
      type: String,
      default: 'classic',
      trim: true,
    },
  },
  { timestamps: true },
);

savedResumeSchema.index({ userId: 1, createdAt: -1 });

const SavedResumeModel = gogoresumeStandard.model<ISavedResume>(
  'savedResumes',
  savedResumeSchema,
);

export default SavedResumeModel;
