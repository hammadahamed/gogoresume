export const EmailConstants = {
  ProductName: 'GoGoResume',
};

export enum EmailAuthRedisPrefix {
  REQUESTS = 'otp_request:',
  ATTEMPTS = 'otp_attempts:',
  DAILY_GEN_LIMIT = 'otp_daily_limit:',
  OTP = 'otp:',
}

export const EMAIL_OTP_DAILY_LIMIT = 3;

export const EMAIL_OTP_COOLDOWN = 30; // 30 seconds

export const EMAIL_OTP_VERIFICATION_ATTEMPTS_LIMIT = 10;

// Auth error constants
export enum AuthErrorCode {
  // Access token errors
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  NO_TOKEN = 'NO_TOKEN',

  // Refresh token errors
  REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED',
  REFRESH_TOKEN_INVALID = 'REFRESH_TOKEN_INVALID',
  REFRESH_FAILED = 'REFRESH_FAILED',

  // User related errors
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_RESTRICTED = 'USER_RESTRICTED',

  // General errors
  AUTH_FAILED = 'AUTH_FAILED',
}

export const AuthErrorMessage = {
  [AuthErrorCode.TOKEN_EXPIRED]: 'Access token has expired',
  [AuthErrorCode.TOKEN_INVALID]: 'Invalid access token',
  [AuthErrorCode.NO_TOKEN]: 'No token found',

  [AuthErrorCode.REFRESH_TOKEN_EXPIRED]: 'Refresh token has expired',
  [AuthErrorCode.REFRESH_TOKEN_INVALID]: 'Invalid refresh token',
  [AuthErrorCode.REFRESH_FAILED]: 'Failed to refresh token',

  [AuthErrorCode.USER_NOT_FOUND]: 'User not found',
  [AuthErrorCode.USER_RESTRICTED]: 'User access has been restricted',

  [AuthErrorCode.AUTH_FAILED]: 'Authentication failed',
};
