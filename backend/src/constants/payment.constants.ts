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
