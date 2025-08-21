document.addEventListener("DOMContentLoaded", () => {
  const sidebarToggle = document.getElementById("ggr-sidebarToggle");
  const suggestionsToggle = document.getElementById("ggr-suggestionsToggle");

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
          action: "updateSidebarEnabled",
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
          action: "updateSuggestionsEnabled",
          enabled: isEnabled,
        });
      }
    });
  });
});
