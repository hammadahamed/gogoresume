const EXT_ACTION_PREFIX = "GGR_EXT_ACTION";
const ACTIONS = {
  UPDATE_SIDEBAR: `${EXT_ACTION_PREFIX}:UPDATE_SIDEBAR`,
  UPDATE_SUGGESTIONS: `${EXT_ACTION_PREFIX}:UPDATE_SUGGESTIONS`,
};

const HOST_URL = "https://gogoresume.com";

document.addEventListener("DOMContentLoaded", () => {
  const sidebarToggle = document.getElementById("ggr-sidebarToggle");
  const suggestionsToggle = document.getElementById("ggr-suggestionsToggle");
  const setupButton = document.getElementById("ggr-setupButton");

  // Load initial states
  chrome.storage.sync.get(
    ["sidebarEnabled", "suggestionsEnabled"],
    (result) => {
      sidebarToggle.checked = result.sidebarEnabled !== false;
      suggestionsToggle.checked = result.suggestionsEnabled !== false;
    }
  );

  // Handle sidebar toggle
  sidebarToggle.addEventListener("change", () => {
    const isEnabled = sidebarToggle.checked;
    chrome.storage.sync.set({ sidebarEnabled: isEnabled });

    // Update content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: ACTIONS.UPDATE_SIDEBAR,
          enabled: isEnabled,
        });
      }
    });
  });

  // Handle suggestions toggle
  suggestionsToggle.addEventListener("change", () => {
    const isEnabled = suggestionsToggle.checked;
    chrome.storage.sync.set({ suggestionsEnabled: isEnabled });

    // Update content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: ACTIONS.UPDATE_SUGGESTIONS,
          enabled: isEnabled,
        });
      }
    });
  });

  // Handle setup button click
  setupButton.addEventListener("click", () => {
    chrome.tabs.create({
      url: `${HOST_URL}/chrome-extension?autoSync=true`,
    });
    console.log("Opening Chrome Extension setup page in new tab");
  });
});
