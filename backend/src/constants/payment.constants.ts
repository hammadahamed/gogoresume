export enum PaymentProvider {
  DODO = 'dodopayments',
}

export enum PaymentStatus {
  // custom statuses
  STARTED = 'started',
  VERIFYING = 'verifying',
  VERIFIED = 'verified',

  // dodo statuses
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  PROCESSING = 'processing',
  REQUIRES_CUSTOMER_ACTION = 'requires_customer_action',
  REQUIRES_MERCHANT_ACTION = 'requires_merchant_action',
  REQUIRES_PAYMENT_METHOD = 'requires_payment_method',
  REQUIRES_CONFIRMATION = 'requires_confirmation',
  REQUIRES_CAPTURE = 'requires_capture',
  PARTIALLY_CAPTURED = 'partially_captured',
  PARTIALLY_CAPTURED_AND_CAPTURABLE = 'partially_captured_and_capturable',
}

export enum UserPlanStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  EXPIRED = 'expired',
}

export enum DodoWebhookEvents {
  // Payment Events
  PAYMENT_SUCCEEDED = 'payment.succeeded',
  PAYMENT_FAILED = 'payment.failed',
  PAYMENT_PROCESSING = 'payment.processing',
  PAYMENT_CANCELLED = 'payment.cancelled',

  // Refund Events
  REFUND_SUCCEEDED = 'refund.succeeded',
  REFUND_FAILED = 'refund.failed',

  // Dispute Events
  DISPUTE_OPENED = 'dispute.opened',
  DISPUTE_EXPIRED = 'dispute.expired',
  DISPUTE_ACCEPTED = 'dispute.accepted',
  DISPUTE_CANCELLED = 'dispute.cancelled',
  DISPUTE_CHALLENGED = 'dispute.challenged',
  DISPUTE_WON = 'dispute.won',
  DISPUTE_LOST = 'dispute.lost',
}

// Payment status messages for user-facing display
export const PAYMENT_STATUS_MESSAGES: Record<PaymentStatus, string> = {
  // Custom statuses
  [PaymentStatus.STARTED]: 'Payment has been initiated and is being processed.',
  [PaymentStatus.VERIFYING]: 'Payment is being verified. Please wait.',
  [PaymentStatus.VERIFIED]: 'Payment has been successfully verified.',

  // Dodo payment statuses
  [PaymentStatus.SUCCEEDED]: 'Payment completed successfully.',
  [PaymentStatus.FAILED]:
    'Payment has failed. Please try again or use a different payment method.',
  [PaymentStatus.CANCELLED]: 'Payment has been cancelled.',
  [PaymentStatus.PROCESSING]:
    'Your payment is currently being processed. This may take a few moments.',
  [PaymentStatus.REQUIRES_CUSTOMER_ACTION]:
    'Additional action is required from you to complete this payment. Please check your email or payment provider app.',
  [PaymentStatus.REQUIRES_MERCHANT_ACTION]:
    'Payment is waiting for merchant action. Our team has been notified.',
  [PaymentStatus.REQUIRES_PAYMENT_METHOD]:
    'A payment method is required to complete this transaction.',
  [PaymentStatus.REQUIRES_CONFIRMATION]:
    'Your payment requires confirmation to proceed. Please complete any additional steps.',
  [PaymentStatus.REQUIRES_CAPTURE]:
    'Payment has been authorized and is awaiting capture.',
  [PaymentStatus.PARTIALLY_CAPTURED]: 'Payment has been partially captured.',
  [PaymentStatus.PARTIALLY_CAPTURED_AND_CAPTURABLE]:
    'Payment has been partially captured with remaining amount available for capture.',
};
