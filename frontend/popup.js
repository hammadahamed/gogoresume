document.addEventListener("DOMContentLoaded", () => {
  const enableToggle = document.getElementById("enableToggle");

  // Load initial state
  chrome.storage.sync.get(["gogoResumeEnabled"], (result) => {
    enableToggle.checked = result.gogoResumeEnabled !== false;
  });

  // Handle toggle changes
  enableToggle.addEventListener("change", () => {
    const isEnabled = enableToggle.checked;

    // Save state
    chrome.storage.sync.set({ gogoResumeEnabled: isEnabled });

    // Update content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "updateEnabled",
          enabled: isEnabled,
        });
      }
    });
  });
});
