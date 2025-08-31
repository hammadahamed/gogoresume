/**
 * Simple utility to trigger resume downloads
 * Sends a message event that ReactResumeBuilder listens for
 */

/**
 * Triggers a resume download by clicking the hidden download button
 * @param source - Identifier of the component triggering the download
 */
export const triggerResumeDownload = (source: string = "unknown"): void => {
  window.postMessage(
    {
      type: "trigger-resume-download",
      source,
    },
    "*"
  );
};
