// Sidepanel JavaScript for GoGoResume Chrome Extension
const iframe = document.getElementById("app-iframe");
const loading = document.getElementById("loading");
let hasLoaded = false;

console.log("Sidepanel loaded, attempting to load Vue app...");

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
    console.log("Vue app check response:", response.status);

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
  console.log("GoGoResume app loaded successfully");
  loading.style.display = "none";
  iframe.style.display = "block";
}

// Listen for iframe load events
iframe.addEventListener("load", () => {
  console.log("Iframe load event fired");
  showApp();
});

// Listen for iframe errors
iframe.addEventListener("error", (e) => {
  console.error("Iframe error event:", e);
  showError(
    "Failed to load GoGoResume iframe\n\nPlease check browser console for details."
  );
});

// Check if iframe content is loaded after a delay
setTimeout(() => {
  try {
    if (iframe.contentDocument || iframe.contentWindow.document) {
      console.log("Iframe content accessible, assuming loaded");
      showApp();
    }
  } catch (e) {
    console.log("Cannot access iframe content (may be cross-origin)");
  }
}, 2000);

// Fallback timeout
setTimeout(() => {
  if (!hasLoaded) {
    console.log("Fallback timeout reached, showing iframe anyway");
    showApp();
  }
}, 8000);

// Initial Vue app check
setTimeout(() => {
  checkVueApp();
}, 1000);
