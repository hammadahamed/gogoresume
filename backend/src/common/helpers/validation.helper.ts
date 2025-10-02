import { HttpException, HttpStatus } from '@nestjs/common';

// Payload size limits in bytes
export const PAYLOAD_SIZE_LIMITS = {
  USER_PROFILE: 10 * 1024, // 10KB for user profile (~5000 characters + JSON overhead)
  RESUME_DATA: 10 * 1024, // 10KB for resume data (~5000 characters + JSON overhead)
} as const;

/**
 * Calculate the size of a payload in bytes (JSON stringified)
 * @param data - The data to calculate size for
 * @returns Size in bytes
 */
export const calculatePayloadSize = (data: any): number => {
  try {
    return Buffer.byteLength(JSON.stringify(data), 'utf8');
  } catch (error) {
    console.error('Error calculating payload size:', error);
    return 0;
  }
};

/**
 * Calculate the approximate character count in a payload
 * @param data - The data to calculate character count for
 * @returns Approximate number of characters
 */
export const calculateCharacterCount = (data: any): number => {
  try {
    return JSON.stringify(data).length;
  } catch (error) {
    console.error('Error calculating character count:', error);
    return 0;
  }
};

/**
 * Format bytes to human readable string
 * @param bytes - Number of bytes
 * @returns Formatted string (e.g., "50 KB", "1.2 MB")
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

/**
 * Validate payload size against a limit and throw exception if invalid
 * @param data - The data to validate
 * @param limit - Size limit in bytes
 * @param dataType - Description of the data type for error message
 * @throws HttpException with status 413 if payload is too large
 */
export const validatePayloadSize = (
  data: any,
  limit: number,
  dataType: string = 'Data',
): void => {
  const size = calculatePayloadSize(data);
  const characterCount = calculateCharacterCount(data);

  if (size > limit) {
    const errorMessage = `${dataType} is too large (${formatBytes(size)}, ${characterCount.toLocaleString()} characters) and exceeds the limit of ${formatBytes(limit)}. Please reduce the amount of information and try again.`;

    throw new HttpException(
      {
        statusCode: HttpStatus.PAYLOAD_TOO_LARGE,
        message: errorMessage,
        error: 'Payload Too Large',
      },
      HttpStatus.PAYLOAD_TOO_LARGE,
    );
  }
};

/**
 * Validate user profile payload size
 * @param userProfileData - User profile data to validate
 * @throws HttpException with status 413 if payload is too large
 */
export const validateUserProfileSize = (userProfileData: any): void => {
  validatePayloadSize(
    userProfileData,
    PAYLOAD_SIZE_LIMITS.USER_PROFILE,
    'User profile data',
  );
};

/**
 * Validate resume data payload size
 * @param resumeData - Resume data to validate
 * @throws HttpException with status 413 if payload is too large
 */
export const validateResumeDataSize = (resumeData: any): void => {
  validatePayloadSize(
    resumeData,
    PAYLOAD_SIZE_LIMITS.RESUME_DATA,
    'Resume data',
  );
};
