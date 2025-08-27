// Element IDs
const TOGGLE_BUTTON_ID = "gogoresume-toggle";
const SUGGESTIONS_ID = "gogoresume-suggestions";

// Class names
const BRANDING_CLASS = "gogoresume-branding";
const SUGGESTIONS_CONTAINER_CLASS = "suggestions-container";
const SECTIONS_PANE_CLASS = "sections-pane";
const VALUES_PANE_CLASS = "values-pane";
const SECTION_ITEM_CLASS = "section-item";
const SUGGESTION_ITEM_CLASS = "suggestion-item";
const ACTIVE_CLASS = "active";

// Messages and actions
const ACTION_TOGGLE = "toggle";
const ACTION_UPDATE_SUGGESTIONS = "updateSuggestionsState";
const ACTION_UPDATE_DRAWER = "updateDrawerState";
const MESSAGE_TYPE_FIELD_CLICK = "FIELD_CLICK";
const MESSAGE_TYPE_SUGGESTIONS = "SUGGESTIONS";
const MESSAGE_TYPE_SAVE_USER_INFO = "SAVE_USER_INFO";
const MESSAGE_TYPE_LOAD_USER_INFO = "LOAD_USER_INFO";
const MESSAGE_TYPE_USER_INFO_LOADED = "USER_INFO_LOADED";

// Section names
const SECTION_PERSONAL_INFO = "Personal Info";
const SECTION_WORK_EXPERIENCES = "Work Experiences";
const SECTION_EDUCATION = "Education";
const SECTION_SKILLS = "Skills";
const SECTION_PROJECTS = "Projects";
const SECTION_LINKS = "Links";
const PRIMARY_COLOR = "#6466f1";

// URLs
const IFRAME_URL = "http://localhost:5173/resume-tweaker?extension=true";

// UI text
const BRANDING_TEXT = "Powered by GoGoResume";

// Storage keys
const STORAGE_KEY_SIDEBAR_ENABLED = "sidebarEnabled";
const STORAGE_KEY_SUGGESTIONS_ENABLED = "suggestionsEnabled";
const STORAGE_KEY_USER_INFO = "userInfo";

// Storage functions
function saveToStorage(key, value) {
  chrome.storage.sync.set({ [key]: value }, () => {
    console.log(`Saved ${key}:`, value);
  });
}

function loadFromStorage(key, defaultValue) {
  console.log("Loading from storage, key:", key);
  return new Promise((resolve) => {
    try {
      chrome.storage.sync.get(key, (result) => {
        console.log("Storage get result:", result);
        // Chrome storage returns an object with the key
        const value = result[key];
        console.log("Loaded value:", value);
        resolve(value !== undefined ? value : defaultValue);
      });
    } catch (error) {
      console.error("Error loading from storage:", error);
      resolve(defaultValue);
    }
  });
}

let toggleButton = null;
let suggestionsPopup = null;
let currentField = null;
let currentFieldRect = null;
let isSidebarEnabled = true;
let isSuggestionsEnabled = true;

// Add these constants at the top with other constants
const SUGGESTIONS_WIDTH = "300px";
const SUGGESTIONS_MAX_HEIGHT = "200px";

// Add a new variable at the top with other state variables
let isSuggestionsIframeReady = false;

// Separate cleanup functions for each feature
function cleanupToggleButton() {
  if (toggleButton) {
    toggleButton.remove();
    toggleButton = null;
  }
}

// Function to get or create iframe for suggestions
function getOrCreateSuggestionsIframe() {
  let iframe = document.getElementById("suggestions-iframe");
  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.id = "suggestions-iframe";
    iframe.src = IFRAME_URL;
    iframe.style.display = "none"; // Hide the iframe

    // Add load listener to mark iframe as ready
    iframe.addEventListener("load", () => {
      console.log("Suggestions iframe ready");
      isSuggestionsIframeReady = true;
    });

    document.body.appendChild(iframe);
  }
  return iframe;
}

// Handle field clicks
function handleFieldClick(e) {
  if (!isSuggestionsEnabled || !isSuggestionsIframeReady) return;

  const field = e.target;
  if (field.tagName === "INPUT" || field.tagName === "TEXTAREA") {
    currentField = field;

    // Get field info
    const fieldInfo = {
      type: field.type,
      name: field.name,
      id: field.id,
      value: field.value,
      placeholder: field.placeholder,
      label:
        field.getAttribute("aria-label") || field.getAttribute("label") || "",
    };

    console.log("Field clicked with info:", fieldInfo);

    // Send message to suggestions iframe
    const suggestionsIframe = getOrCreateSuggestionsIframe();
    if (suggestionsIframe) {
      console.log(
        "Sending FIELD_CLICK message to suggestions iframe:",
        fieldInfo
      );
      suggestionsIframe.contentWindow.postMessage(
        {
          type: MESSAGE_TYPE_FIELD_CLICK,
          fieldInfo,
        },
        "*"
      );
    }

    // Calculate position relative to viewport
    const rect = field.getBoundingClientRect();
    currentFieldRect = {
      x: rect.left,
      y: rect.bottom,
      top: rect.top,
      height: rect.height,
      width: rect.width,
      viewportHeight: window.innerHeight,
      scrollY: window.scrollY,
    };
    console.log("Field position recorded:", currentFieldRect);
  }
}

function cleanupSuggestions() {
  if (suggestionsPopup) {
    suggestionsPopup.remove();
    suggestionsPopup = null;
  }
  // Also remove the suggestions iframe
  const suggestionsIframe = document.getElementById("suggestions-iframe");
  if (suggestionsIframe) {
    suggestionsIframe.remove();
  }
  currentField = null;
  currentFieldRect = null;
}

// Main cleanup now calls specific cleanups as needed
function cleanup() {
  cleanupToggleButton();
  cleanupSuggestions();
}

// Initialize when the content script loads
async function initialize() {
  // Load states from storage
  isSidebarEnabled = await loadFromStorage(STORAGE_KEY_SIDEBAR_ENABLED, true);
  isSuggestionsEnabled = await loadFromStorage(
    STORAGE_KEY_SUGGESTIONS_ENABLED,
    true
  );

  if (isSidebarEnabled) {
    createToggleButton();
  }

  // Create suggestions iframe immediately if suggestions are enabled
  if (isSuggestionsEnabled) {
    getOrCreateSuggestionsIframe();
    document.addEventListener("click", handleFieldClick);
  }
}

initialize();

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === ACTION_TOGGLE) {
    togglePanel();
  } else if (request.action === "updateSidebarEnabled") {
    isSidebarEnabled = request.enabled;
    saveToStorage(STORAGE_KEY_SIDEBAR_ENABLED, isSidebarEnabled);
    if (isSidebarEnabled) {
      if (!toggleButton) {
        createToggleButton();
      }
    } else {
      cleanupToggleButton();
    }
  } else if (request.action === "updateSuggestionsEnabled") {
    isSuggestionsEnabled = request.enabled;
    saveToStorage(STORAGE_KEY_SUGGESTIONS_ENABLED, isSuggestionsEnabled);
    if (isSuggestionsEnabled) {
      // Create suggestions iframe immediately when enabled
      getOrCreateSuggestionsIframe();
      // Add click listener when suggestions are enabled
      document.addEventListener("click", handleFieldClick);
    } else {
      // Remove click listener and cleanup when disabled
      document.removeEventListener("click", handleFieldClick);
      cleanupSuggestions();
    }
  }
});

// Listen for custom events from main window
window.addEventListener("gogoresume-init", () => {
  console.log("GoGoResume initialized in main window");
});

window.addEventListener("gogoresume-message", (event) => {
  const message = event.detail;
  console.log("Received message from main window:", message);
  handleMessage(message, window);
});

// Listen for messages from iframe
window.addEventListener("message", (event) => {
  console.log("Received message from iframe:", event.data);
  handleMessage(event.data, event.source);
});

// Handle messages from both sources
function handleMessage(message, source) {
  if (message.type === MESSAGE_TYPE_SUGGESTIONS && isSuggestionsEnabled) {
    const suggestions = message.suggestions;
    console.log("Processing suggestions:", suggestions);

    const hasSuggestions =
      suggestions && Object.values(suggestions).some((arr) => arr.length > 0);

    if (hasSuggestions && currentFieldRect) {
      console.log("Showing suggestions at position:", currentFieldRect);
      showSuggestions(suggestions, currentFieldRect.x, currentFieldRect.y);
    } else {
      console.warn("Cannot show suggestions:", {
        hasSuggestions,
        hasPosition: Boolean(currentFieldRect),
        suggestions,
        currentFieldRect,
      });
    }
  } else if (message.type === MESSAGE_TYPE_SAVE_USER_INFO) {
    console.log("Saving user info to storage:", message.userInfo);
    saveToStorage(STORAGE_KEY_USER_INFO, message.userInfo);
  } else if (message.type === MESSAGE_TYPE_LOAD_USER_INFO) {
    console.log("Loading user info from storage");
    loadFromStorage(STORAGE_KEY_USER_INFO, null).then((userInfo) => {
      console.log("Loaded user info from storage:", userInfo);
      if (source && source.postMessage) {
        source.postMessage(
          {
            type: MESSAGE_TYPE_USER_INFO_LOADED,
            userInfo,
          },
          "*"
        );
      }
    });
  }
}

// Create suggestions popup
function createSuggestionsPopup() {
  suggestionsPopup = document.createElement("div");
  suggestionsPopup.id = SUGGESTIONS_ID;
  suggestionsPopup.style.display = "none";
  suggestionsPopup.style.width = SUGGESTIONS_WIDTH;
  suggestionsPopup.style.height = SUGGESTIONS_MAX_HEIGHT;

  document.body.appendChild(suggestionsPopup);
}

// Show suggestions popup
function showSuggestions(suggestions, x, y) {
  console.log("Showing suggestions:", { suggestions, x, y });
  if (!suggestionsPopup) {
    createSuggestionsPopup();
  }

  // Create a container for suggestions
  const suggestionsContainer = document.createElement("div");
  suggestionsContainer.className = SUGGESTIONS_CONTAINER_CLASS;

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.className = "suggestions-close-button";
  closeButton.textContent = "×";
  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    hideSuggestions();
  });
  closeButton.addEventListener("mousedown", (e) => {
    e.preventDefault(); // Prevent focus change
  });

  // Create sections pane
  const sectionsPane = document.createElement("div");
  sectionsPane.className = SECTIONS_PANE_CLASS;
  sectionsPane.style.height = SUGGESTIONS_MAX_HEIGHT;
  sectionsPane.style.overflow = "auto";
  sectionsPane.style.paddingBottom = "100px";

  // Create values pane
  const valuesPane = document.createElement("div");
  valuesPane.className = VALUES_PANE_CLASS;
  valuesPane.style.overflow = "auto";
  valuesPane.style.height = SUGGESTIONS_MAX_HEIGHT;
  valuesPane.style.paddingBottom = "100px";

  // Define sections based on the structured data
  const sections = {
    [SECTION_PERSONAL_INFO]: suggestions.personalInfo || [],
    [SECTION_WORK_EXPERIENCES]: suggestions.workExperiences || [],
    [SECTION_EDUCATION]: suggestions.education || [],
    [SECTION_SKILLS]: suggestions.skills || [],
    [SECTION_PROJECTS]: suggestions.projects || [],
    [SECTION_LINKS]: suggestions.links || [],
  };

  console.log("Using sections:", sections);

  // Function to update values pane with click handlers
  function updateValuesPane(sectionValues) {
    valuesPane.innerHTML = "";
    sectionValues.forEach((value) => {
      const item = document.createElement("div");
      item.className = SUGGESTION_ITEM_CLASS;
      item.textContent = value;
      item.style.padding = "8px";
      item.style.cursor = "pointer";
      item.style.borderRadius = "4px";
      item.style.margin = "2px 0";
      item.style.fontSize = "14px";

      // Add click handler directly to each value
      item.addEventListener("click", () => {
        console.log("Suggestion clicked:", value);
        if (currentField) {
          currentField.value = value;
          currentField.dispatchEvent(new Event("input", { bubbles: true }));
          console.log("Updated field value to:", currentField.value);
        }
        hideSuggestions();
      });

      valuesPane.appendChild(item);
    });
  }

  // Only show sections that have values
  Object.entries(sections).forEach(([sectionName, sectionValues], index) => {
    if (sectionValues.length === 0) return; // Skip empty sections

    const sectionItem = document.createElement("div");
    sectionItem.className = SECTION_ITEM_CLASS;
    sectionItem.textContent = sectionName;
    if (index === 0) sectionItem.classList.add(ACTIVE_CLASS);

    // Show section values on hover
    sectionItem.addEventListener("mouseenter", () => {
      console.log("Showing values for section:", sectionName);
      // Remove active class from all sections
      sectionsPane
        .querySelectorAll(`.${SECTION_ITEM_CLASS}`)
        .forEach((item) => {
          item.classList.remove(ACTIVE_CLASS);
        });
      // Add active class to current section
      sectionItem.classList.add(ACTIVE_CLASS);

      // Update values pane with new values and click handlers
      updateValuesPane(sectionValues);
    });

    sectionsPane.appendChild(sectionItem);
  });

  // Show initial values (first non-empty section)
  const firstSection = Object.entries(sections).find(
    ([_, values]) => values.length > 0
  );
  if (firstSection) {
    updateValuesPane(firstSection[1]);
  }

  // Clear existing content
  suggestionsPopup.innerHTML = "";

  // Add close button first (so it's on top)
  suggestionsPopup.appendChild(closeButton);

  // Add both panes to container
  suggestionsContainer.appendChild(sectionsPane);
  suggestionsContainer.appendChild(valuesPane);
  suggestionsPopup.appendChild(suggestionsContainer);

  // Add branding
  const branding = document.createElement("div");
  branding.className = BRANDING_CLASS;
  branding.textContent = BRANDING_TEXT;
  branding.style.fontStyle = "italic";
  suggestionsPopup.appendChild(branding);

  // Position the popup
  suggestionsPopup.style.position = "fixed";
  suggestionsPopup.style.left = `${x}px`;
  suggestionsPopup.style.top = `${y}px`;
  suggestionsPopup.style.zIndex = "999999";

  // Make popup visible to calculate its height
  suggestionsPopup.style.display = "block";
  const popupHeight = suggestionsPopup.offsetHeight;

  // Check if popup would go off screen bottom
  if (y + popupHeight > currentFieldRect.viewportHeight) {
    // Position above the field instead - place it just above the field's top edge
    suggestionsPopup.style.top = `${currentFieldRect.top - popupHeight}px`;
  }
}

function hideSuggestions() {
  if (suggestionsPopup) {
    suggestionsPopup.style.display = "none";
  }
}

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!suggestionsPopup?.contains(e.target) && e.target !== currentField) {
    hideSuggestions();
  }
});

// Create toggle button function
function createToggleButton() {
  if (toggleButton) return; // Don't create if already exists

  console.log("Creating GoGoResume toggle button");

  // Create toggle button
  toggleButton = document.createElement("button");
  toggleButton.id = TOGGLE_BUTTON_ID;
  toggleButton.innerHTML = "📄"; // Resume icon
  toggleButton.title = "Open GoGoResume Sidebar";

  // Add hover effects
  toggleButton.addEventListener("mouseenter", () => {
    toggleButton.style.transform = "scale(1.1)";
    toggleButton.style.boxShadow = "0 6px 16px rgba(0,0,0,0.4)";
  });

  toggleButton.addEventListener("mouseleave", () => {
    toggleButton.style.transform = "scale(1)";
    toggleButton.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  });

  // Add click handler
  toggleButton.addEventListener("click", togglePanel);

  // Add to page
  document.body.appendChild(toggleButton);
  console.log("Toggle button created and added to page");
}

function togglePanel() {
  console.log("Toggle button clicked - opening sidebar");

  // Add visual feedback
  if (toggleButton) {
    toggleButton.style.transform = "scale(0.9)";
    setTimeout(() => {
      toggleButton.style.transform = "scale(1)";
    }, 150);
  }

  // Send message to background script to open sidebar
  chrome.runtime.sendMessage({ action: "openSidebar" }, (response) => {
    if (chrome.runtime.lastError) {
      console.error(
        "Error sending openSidebar message:",
        chrome.runtime.lastError
      );
    } else if (response && response.success) {
      console.log("Sidebar opened successfully");
    } else {
      console.error("Failed to open sidebar:", response?.error);
    }
  });
}
