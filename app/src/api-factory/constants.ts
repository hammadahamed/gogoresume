export const accessTokenKey = "access_token";
export const refreshTokenKey = "refresh_token";

// Auth error codes
export enum AuthErrorCode {
  // Access token errors
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  TOKEN_INVALID = "TOKEN_INVALID",
  NO_TOKEN = "NO_TOKEN",

  // Refresh token errors
  REFRESH_TOKEN_EXPIRED = "REFRESH_TOKEN_EXPIRED",
  REFRESH_TOKEN_INVALID = "REFRESH_TOKEN_INVALID",
  REFRESH_FAILED = "REFRESH_FAILED",

  // User related errors
  USER_NOT_FOUND = "USER_NOT_FOUND",
  USER_RESTRICTED = "USER_RESTRICTED",

  // General errors
  AUTH_FAILED = "AUTH_FAILED",
}

// Critical errors that require logout
export const CRITICAL_AUTH_ERRORS = [
  AuthErrorCode.REFRESH_TOKEN_EXPIRED,
  AuthErrorCode.REFRESH_TOKEN_INVALID,
  AuthErrorCode.USER_NOT_FOUND,
  AuthErrorCode.USER_RESTRICTED,
];
