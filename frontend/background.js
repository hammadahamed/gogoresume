const EXT_ACTION_PREFIX = "GGR_EXT_ACTION";
const ACTIONS = {
  UPDATE_SIDEBAR: `${EXT_ACTION_PREFIX}:UPDATE_SIDEBAR`,
  OPEN_SIDEBAR: `${EXT_ACTION_PREFIX}:OPEN_SIDEBAR`,
};

// LISTEN FOR MESSAGES FROM CONTENT SCRIPTS ------------------------------------------------------------
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === ACTIONS.OPEN_SIDEBAR) {
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

// SET UP THE SIDE PANEL WHEN EXTENSION IS INSTALLED/UPDATED ------------------------------------------------------------
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
