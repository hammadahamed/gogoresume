import { Schema, Document } from 'mongoose';
import gogoresumeStandard from 'src/clients/mongodb/gogoresumeStandard';
import {
  PaymentProvider,
  PaymentStatus,
} from 'src/constants/payment.constants';
import { Plans } from 'src/planConfig';

export interface IPayment extends Document {
  userId: Schema.Types.ObjectId;
  provider: PaymentProvider;
  status: PaymentStatus;
  providerPaymentId?: string; // From payment provider (DodoPayments)
  orderId: string; // Our internal order ID, we are treating every payment attempt as a new order
  internalPlanId: Plans; // our internal plan ID, we are using this to identify the plan
  providerProductId: string; // the planID or productID from the payment provider
  paymentResponsePayload?: any; // The raw response from the payment provider, we are storing this for future reference
}

const paymentSchema = new Schema<IPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    provider: {
      type: String,
      enum: Object.values(PaymentProvider),
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.STARTED,
    },
    providerPaymentId: {
      type: String,
      sparse: true, // Allow multiple null values but unique non-null values
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    internalPlanId: {
      type: String,
      enum: Object.values(Plans),
      required: true,
    },
    providerProductId: {
      type: String,
      required: true,
    },
    paymentResponsePayload: {
      type: Object,
    },
  },
  { timestamps: true },
);

paymentSchema.index({ userId: 1 });

const PaymentModel = gogoresumeStandard.model<IPayment>(
  'Payment',
  paymentSchema,
);

export default PaymentModel;
