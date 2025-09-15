const EXT_ACTION_PREFIX = "GGR_EXT_ACTION";
const ACTIONS = {
  CONTEXT_MENU_TEXT_RECEIVED: `${EXT_ACTION_PREFIX}:CONTEXT_MENU_TEXT_RECEIVED`,
  REQUEST_STORED_TEXT: `${EXT_ACTION_PREFIX}:REQUEST_STORED_TEXT`,
  STORED_TEXT_RESPONSE: `${EXT_ACTION_PREFIX}:STORED_TEXT_RESPONSE`,
  GET_CACHED_SELECTED_TEXT: `${EXT_ACTION_PREFIX}:GET_CACHED_SELECTED_TEXT`,
};

const IFRAME_ID = "app-iframe";

const iframe = document.getElementById(IFRAME_ID);
const loading = document.getElementById("loading");
let hasLoaded = false;

// Function to update loading status
function updateLoadingStatus(message) {
  const loadingText = loading.querySelector(".loading-text");
  const loadingSubtext = loading.querySelector(".loading-subtext");
  if (loadingText) loadingText.textContent = message;
  if (loadingSubtext) loadingSubtext.textContent = "Debugging...";
}

// Check if Vue app is accessible
async function checkVueApp() {
  try {
    updateLoadingStatus("Checking Vue app...");
    const response = await fetch(
      "http://localhost:5173/resume-tweaker?extension=true"
    );

    if (response.ok) {
      updateLoadingStatus("Vue app found, loading...");
      return true;
    } else {
      throw new Error(`Vue app responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Vue app check failed:", error);
    updateLoadingStatus("Vue app not accessible");
    showError(
      `Vue app not running on localhost:5173\n\nError: ${error.message}\n\nPlease start your Vue development server.`
    );
    return false;
  }
}

// Show error message
function showError(message) {
  loading.innerHTML = `
        <div style="text-align: center; padding: 20px; max-width: 300px;">
            <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
            <div style="font-size: 16px; color: #ef4444; margin-bottom: 12px; font-weight: 500;">GoGoResume Not Available</div>
            <div style="font-size: 12px; color: #64748b; line-height: 1.4; white-space: pre-line;">${message}</div>
            <button id="retry-button" style="
                margin-top: 16px; 
                padding: 8px 16px; 
                background: #6466f1; 
                color: white; 
                border: none; 
                border-radius: 6px; 
                cursor: pointer;
                font-size: 12px;
            ">Retry</button>
        </div>
    `;

  // Add event listener to retry button (avoiding inline onclick)
  const retryButton = document.getElementById("retry-button");
  if (retryButton) {
    retryButton.addEventListener("click", () => {
      location.reload();
    });
  }
}

// Show success and display iframe
function showApp() {
  if (hasLoaded) return;
  hasLoaded = true;
  loading.style.display = "none";
  iframe.style.display = "block";
}

// Listen for iframe load events
iframe.addEventListener("load", () => {
  showApp();
});

// Listen for iframe errors
iframe.addEventListener("error", (e) => {
  console.error("Iframe error event:", e);
  showError(
    "Failed to load GoGoResume iframe\n\nPlease check browser console for details."
  );
});

// Fallback timeout
setTimeout(() => {
  if (!hasLoaded) {
    showApp();
  }
}, 8000);

const getStoredTextFromBgScript = () => {
  window.addEventListener("message", async (event) => {
    if (event.data.type === ACTIONS.REQUEST_STORED_TEXT) {
      try {
        // Request cached text from background script
        const response = await chrome.runtime.sendMessage({
          action: ACTIONS.GET_CACHED_SELECTED_TEXT,
        });

        const iframe = document.getElementById(IFRAME_ID);
        if (iframe) {
          iframe.contentWindow.postMessage(
            {
              type: ACTIONS.STORED_TEXT_RESPONSE,
              text: response.selectedText || null,
            },
            "*"
          );
        }
      } catch (error) {
        console.error("Error getting cached text from background:", error);

        // Send null response on error
        const iframe = document.getElementById(IFRAME_ID);
        if (iframe) {
          iframe.contentWindow.postMessage(
            {
              type: ACTIONS.STORED_TEXT_RESPONSE,
              text: null,
            },
            "*"
          );
        }
      }
    }
  });
};

const listenFormCopyTextFromBgScriptAndSendToIframe = () => {
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === ACTIONS.CONTEXT_MENU_TEXT_RECEIVED) {
      const iframe = document.getElementById(IFRAME_ID);
      if (iframe) {
        const textValue = msg.data;
        iframe.contentWindow.postMessage(
          { type: ACTIONS.CONTEXT_MENU_TEXT_RECEIVED, data: textValue },
          "*"
        );
      }
    }
  });
};

const setupContextMenuTextListener = () => {
  listenFormCopyTextFromBgScriptAndSendToIframe();
  getStoredTextFromBgScript();
};

try {
  setupContextMenuTextListener();
  console.log("✅ [SIDE PANEL] Context menu text listener initialized");
} catch (error) {
  console.error("Error setting up context menu text listener:", error);
}

// Initial Vue app check
setTimeout(() => {
  checkVueApp();
}, 1000);
