// Background script for GoGoResume Chrome Extension
console.log("GoGoResume background script loaded");

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Background received message:", request);

  if (request.action === "openSidebar") {
    console.log("Opening sidebar for tab:", sender.tab?.id);

    // Handle the sidebar opening asynchronously
    (async () => {
      try {
        if (sender.tab?.id) {
          // Open the side panel for the specific tab
          await chrome.sidePanel.open({ tabId: sender.tab.id });
          console.log("Sidebar opened successfully");
          sendResponse({ success: true });
        } else {
          console.error("No valid tab ID found");
          sendResponse({ success: false, error: "No valid tab ID" });
        }
      } catch (error) {
        console.error("Error opening sidebar:", error);
        sendResponse({ success: false, error: error.message });
      }
    })();

    // Return true to indicate we'll send response asynchronously
    return true;
  }
});

// Set up the side panel when extension is installed/updated
chrome.runtime.onInstalled.addListener(async () => {
  console.log("GoGoResume extension installed/updated");

  try {
    // Enable the side panel for all sites
    await chrome.sidePanel.setOptions({
      path: "sidepanel.html",
      enabled: true,
    });
    console.log("Side panel configured successfully");
  } catch (error) {
    console.error("Error configuring side panel:", error);
  }
});
