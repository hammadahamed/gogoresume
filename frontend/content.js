// Element IDs
const CONTAINER_ID = "gogoresume-container";
const SUGGESTIONS_ID = "gogoresume-suggestions";
const TOGGLE_BUTTON_ID = "gogoresume-toggle";
const IFRAME_ID = "gogoresume-iframe";

// Class names
const BRANDING_CLASS = "gogoresume-branding";
const SUGGESTIONS_CONTAINER_CLASS = "suggestions-container";
const SECTIONS_PANE_CLASS = "sections-pane";
const VALUES_PANE_CLASS = "values-pane";
const SECTION_ITEM_CLASS = "section-item";
const SUGGESTION_ITEM_CLASS = "suggestion-item";
const ACTIVE_CLASS = "active";
const OPEN_CLASS = "open";

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
const SECTION_EXPERIENCES = "Experiences";
const SECTION_EDUCATION = "Education";
const SECTION_SKILLS = "Skills";
const SECTION_PROJECTS = "Projects";
const SECTION_LINKS = "Links";

// URLs
const IFRAME_URL = "http://localhost:5173/ce";

// UI text
const BRANDING_TEXT = "Powered by GoGoResume";
const TOGGLE_BUTTON_OPEN = ">";
const TOGGLE_BUTTON_CLOSE = "<";

// Storage keys
const STORAGE_KEY_ENABLED = "gogoResumeEnabled";
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

let container = null;
let isOpen = false;
let suggestionsPopup = null;
let currentField = null;
let currentFieldRect = null;
let isEnabled = true; // Default to enabled

// Remove any existing elements from previous injections
function cleanup() {
  // Remove container if it exists
  const existingContainer = document.getElementById(CONTAINER_ID);
  if (existingContainer) {
    existingContainer.remove();
  }

  // Remove suggestions popup if it exists
  const existingSuggestions = document.getElementById(SUGGESTIONS_ID);
  if (existingSuggestions) {
    existingSuggestions.remove();
  }

  // Reset state
  container = null;
  suggestionsPopup = null;
  isOpen = false;
}

// Initialize when the content script loads
async function initialize() {
  cleanup();

  // Load state from storage
  isEnabled = await loadFromStorage(STORAGE_KEY_ENABLED, true);

  if (isEnabled) {
    createPanel();
  }
}

initialize();

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === ACTION_TOGGLE) {
    togglePanel();
  } else if (request.action === "updateEnabled") {
    isEnabled = request.enabled;
    saveToStorage(STORAGE_KEY_ENABLED, isEnabled);
    if (isEnabled) {
      if (!container) {
        createPanel();
      }
    } else {
      cleanup();
      hideSuggestions();
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
  if (message.type === MESSAGE_TYPE_SUGGESTIONS) {
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

  // Add branding
  const branding = document.createElement("div");
  branding.className = BRANDING_CLASS;
  branding.textContent = BRANDING_TEXT;
  suggestionsPopup.appendChild(branding);

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

  // Create sections pane
  const sectionsPane = document.createElement("div");
  sectionsPane.className = SECTIONS_PANE_CLASS;

  // Create values pane
  const valuesPane = document.createElement("div");
  valuesPane.className = VALUES_PANE_CLASS;

  // Define sections based on the structured data
  const sections = {
    [SECTION_PERSONAL_INFO]: suggestions.personalInfo || [],
    [SECTION_EXPERIENCES]: suggestions.experiences || [],
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

  // Add both panes to container
  suggestionsContainer.appendChild(sectionsPane);
  suggestionsContainer.appendChild(valuesPane);
  suggestionsPopup.appendChild(suggestionsContainer);

  // Add branding
  const branding = document.createElement("div");
  branding.className = BRANDING_CLASS;
  branding.textContent = BRANDING_TEXT;
  suggestionsPopup.appendChild(branding);

  // Position the popup
  suggestionsPopup.style.position = "fixed";
  suggestionsPopup.style.left = `${x}px`;
  suggestionsPopup.style.top = `${y}px`;

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

// Handle field clicks
function handleFieldClick(e) {
  if (!isEnabled) return;

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

    // Send message to iframe
    const iframe = document.getElementById(IFRAME_ID);
    if (iframe) {
      console.log("Sending FIELD_CLICK message to iframe:", fieldInfo);
      iframe.contentWindow.postMessage(
        {
          type: MESSAGE_TYPE_FIELD_CLICK,
          fieldInfo,
        },
        "*"
      );
    } else {
      console.error("Iframe not found - suggestions won't work");
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

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
  if (!suggestionsPopup?.contains(e.target) && e.target !== currentField) {
    hideSuggestions();
  }
});

function createPanel() {
  // Create container
  container = document.createElement("div");
  container.id = CONTAINER_ID;

  // Create toggle button
  const toggleButton = document.createElement("button");
  toggleButton.id = TOGGLE_BUTTON_ID;
  toggleButton.innerHTML = TOGGLE_BUTTON_CLOSE;
  toggleButton.onclick = togglePanel;

  // Create iframe - directly load the Vue app
  const iframe = document.createElement("iframe");
  iframe.id = IFRAME_ID;
  iframe.src = IFRAME_URL;
  iframe.allow = "clipboard-read; clipboard-write";

  // Assemble the panel
  container.appendChild(toggleButton);
  container.appendChild(iframe);
  document.body.appendChild(container);

  // Add click listener to document
  document.addEventListener("click", handleFieldClick);
}

function togglePanel() {
  if (!container) {
    createPanel();
  }

  isOpen = !isOpen;
  container.classList.toggle(OPEN_CLASS);

  const toggleButton = container.querySelector(`#${TOGGLE_BUTTON_ID}`);
  toggleButton.innerHTML = isOpen ? TOGGLE_BUTTON_OPEN : TOGGLE_BUTTON_CLOSE;
}
