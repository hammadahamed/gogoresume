// Helper functions for date manipulation in resume forms

/**
 * Converts a date string to a Date object
 * Handles both old format (YYYY-MM) and new format (MMM YYYY)
 */
export const stringToDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  // Handle both old format (YYYY-MM) and new format (MMM YYYY)
  if (dateString.includes("-")) {
    // Old format: "2023-01"
    const [year, month] = dateString.split("-");
    return new Date(parseInt(year), parseInt(month) - 1, 1);
  } else {
    // New format: "Jan 2023"
    const date = new Date(dateString + " 1"); // Add day for parsing
    return isNaN(date.getTime()) ? null : date;
  }
};

/**
 * Converts a Date object to month name format string
 * Returns format like "Jan 2023"
 */
export const dateToString = (date: Date | null): string => {
  if (!date) return "";
  // Return format like "Jan 2023"
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};
