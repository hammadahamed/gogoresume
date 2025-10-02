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
    // Content script will detect this change via chrome.storage.onChanged listener
  });

  // Handle suggestions toggle
  suggestionsToggle.addEventListener("change", () => {
    const isEnabled = suggestionsToggle.checked;
    chrome.storage.sync.set({ suggestionsEnabled: isEnabled });
    // Content script will detect this change via chrome.storage.onChanged listener
  });

  // Handle setup button click
  setupButton.addEventListener("click", () => {
    // Use window.open as an alternative to chrome.tabs.create
    window.open(`${HOST_URL}/chrome-extension?autoSync=true`, "_blank");
    console.log("Opening Chrome Extension setup page in new tab");
  });
});
