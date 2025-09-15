const EXT_ACTION_PREFIX = "GGR_EXT_ACTION";
const ACTIONS = {
  UPDATE_SIDEBAR: `${EXT_ACTION_PREFIX}:UPDATE_SIDEBAR`,
  OPEN_SIDEBAR: `${EXT_ACTION_PREFIX}:OPEN_SIDEBAR`,
  SEND_SELECTED_TEXT: `${EXT_ACTION_PREFIX}:SEND_SELECTED_TEXT`,
  CONTEXT_MENU_TEXT_RECEIVED: `${EXT_ACTION_PREFIX}:CONTEXT_MENU_TEXT_RECEIVED`,
  GET_CACHED_SELECTED_TEXT: `${EXT_ACTION_PREFIX}:GET_CACHED_SELECTED_TEXT`,
};

// Context menu IDs
const CONTEXT_MENU_IDS = {
  COPY_TO_GOGORESUME: "copyToGoGoResume",
};

// LISTEN FOR MESSAGES FROM CONTENT SCRIPTS ------------------------------------------------------------
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === ACTIONS.OPEN_SIDEBAR) {
    (async () => {
      try {
        if (sender.tab?.id) {
          // Open the side panel for the specific tab
          await chrome.sidePanel.open({ tabId: sender.tab.id });
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

  if (request.action === ACTIONS.SEND_SELECTED_TEXT) {
    (async () => {
      try {
        if (sender.tab?.id) {
          // Store the selected text for the sidepanel to access
          await chrome.storage.local.set({
            selectedText: request.text,
            timestamp: Date.now(),
          });

          // Open the side panel
          await chrome.sidePanel.open({ tabId: sender.tab.id });
          sendResponse({ success: true });
        } else {
          console.error("No valid tab ID found");
          sendResponse({ success: false, error: "No valid tab ID" });
        }
      } catch (error) {
        console.error("Error sending text to sidebar:", error);
        sendResponse({ success: false, error: error.message });
      }
    })();

    // Return true to indicate we'll send response asynchronously
    return true;
  }

  if (request.action === ACTIONS.GET_CACHED_SELECTED_TEXT) {
    sendResponse({
      success: true,
      selectedText: selectedTextCache || null,
    });

    // Clear the cache after sending it to avoid duplicate usage
    if (selectedTextCache) selectedTextCache = null;
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

    // Create context menu item for selected text
    chrome.contextMenus.create({
      id: CONTEXT_MENU_IDS.COPY_TO_GOGORESUME,
      title: "Copy Job Description to GoGoResume",
      contexts: ["selection"], // Show only when text is selected
    });

    // window.open(
    //   "https://gogoresume.com/chrome-extension?autoSync=true",
    //   "_blank"
    // );
  } catch (error) {
    console.error("Error configuring side panel:", error);
  }
});

let selectedTextCache;

// HANDLE CONTEXT MENU CLICKS ------------------------------------------------------------
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === CONTEXT_MENU_IDS.COPY_TO_GOGORESUME) {
    const selectedText = info.selectionText;

    try {
      // Store the selected text for the sidepanel to access
      await chrome.storage.local.set({
        selectedText: selectedText,
        timestamp: Date.now(),
      });

      // Send message to content script to open sidebar (this counts as user gesture)
      if (tab?.id) {
        chrome.tabs.sendMessage(tab.id, {
          action: ACTIONS.OPEN_SIDEBAR,
          fromContextMenu: true,
          selectedText: selectedText,
        });

        selectedTextCache = selectedText;
        chrome.runtime
          .sendMessage({
            type: ACTIONS.CONTEXT_MENU_TEXT_RECEIVED,
            data: selectedText,
          })
          .catch((error) => {});
      }
    } catch (error) {
      console.error("Error handling context menu click:", error);
    }
  }
});
