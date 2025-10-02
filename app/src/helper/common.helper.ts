export const getRelativeDate = (date: Date | string) => {
  const now = new Date();
  const updatedDate = new Date(date);
  const diffInMs = now.getTime() - updatedDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}mo ago`;
  return `${Math.floor(diffInDays / 365)}y ago`;
};

// Payload size validation constants and utilities
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
    return new Blob([JSON.stringify(data)]).size;
  } catch (error) {
    console.error("Error calculating payload size:", error);
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
    console.error("Error calculating character count:", error);
    return 0;
  }
};

/**
 * Format bytes to human readable string
 * @param bytes - Number of bytes
 * @returns Formatted string (e.g., "50 KB", "1.2 MB")
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

/**
 * Validate payload size against a limit
 * @param data - The data to validate
 * @param limit - Size limit in bytes
 * @returns Object with isValid boolean and error message if invalid
 */
export const validatePayloadSize = (
  data: any,
  limit: number
): {
  isValid: boolean;
  error?: string;
  size: number;
  characterCount: number;
} => {
  const size = calculatePayloadSize(data);
  const characterCount = calculateCharacterCount(data);

  if (size > limit) {
    return {
      isValid: false,
      error: `Data is too large (${formatBytes(
        size
      )}, ${characterCount.toLocaleString()} characters) and exceeds the limit of ${formatBytes(
        limit
      )}. Please reduce the amount of information and try again.`,
      size,
      characterCount,
    };
  }

  return { isValid: true, size, characterCount };
};
