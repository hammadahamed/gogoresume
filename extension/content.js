const EXT_ACTION_PREFIX = "GGR_EXT_ACTION";
const WINDOW_MESSAGE_PREFIX = "GOGORESUME_MESSAGE";

const ACTIONS = {
  UPDATE_SIDEBAR: `${EXT_ACTION_PREFIX}:UPDATE_SIDEBAR`,
  UPDATE_SUGGESTIONS: `${EXT_ACTION_PREFIX}:UPDATE_SUGGESTIONS`,
  OPEN_SIDEBAR: `${EXT_ACTION_PREFIX}:OPEN_SIDEBAR`,
  ACTION_TOGGLE: `${EXT_ACTION_PREFIX}:toggle`,
  SEND_SELECTED_TEXT: `${EXT_ACTION_PREFIX}:SEND_SELECTED_TEXT`,
};

const WindowMessages = {
  EXT_PING: `${WINDOW_MESSAGE_PREFIX}:EXT_PING`,
  EXT_PING_RESPONSE: `${WINDOW_MESSAGE_PREFIX}:EXT_PING_RESPONSE`,
  SAVE_USER_INFO: `${WINDOW_MESSAGE_PREFIX}:SAVE_USER_INFO`,
  SAVE_USER_INFO_RESPONSE: `${WINDOW_MESSAGE_PREFIX}:SAVE_USER_INFO_RESPONSE`,
};

const HOST_URL = "https://gogoresume.com";

// Storage keys
const StorageKeys = {
  SIDEBAR_ENABLED: "sidebarEnabled",
  SUGGESTIONS_ENABLED: "suggestionsEnabled",
  USER_INFO: "userInfo",
  BUTTON_POSITION: "toggleButtonPosition",
};

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

const MESSAGE_TYPE_SUGGESTIONS = "SUGGESTIONS";

// Section names
const UserInfoSections = {
  PERSONAL_INFO: {
    name: "Personal Info",
    key: "personalInfo",
  },
  WORK_EXPERIENCES: {
    name: "Work Experiences",
    key: "workExperiences",
  },
  EDUCATION: {
    name: "Education",
    key: "education",
  },
  SKILLS: {
    name: "Skills",
    key: "skills",
  },
  PROJECTS: {
    name: "Projects",
    key: "projects",
  },
  LINKS: {
    name: "Links",
    key: "links",
  },
};

const PRIMARY_COLOR = "#6466f1";

// UI text
const BRANDING_TEXT = "Powered by GoGoResume";

// STORAGE FUNCTIONS ------------------------------------------------------------
function saveToStorage(key, value) {
  chrome.storage.sync.set({ [key]: value }, () => {});
}

function loadFromStorage(key, defaultValue) {
  return new Promise((resolve) => {
    try {
      chrome.storage.sync.get(key, (result) => {
        const value = result[key];
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

// Dragging state
let isDragging = false;
let dragOffset = { y: 0 };
let buttonPosition = { top: 20, right: 10 };

// Add these constants at the top with other constants
const SUGGESTIONS_WIDTH = "300px";
const SUGGESTIONS_MAX_HEIGHT = "250px";

// Global references to event handlers so we can remove them
let mouseMoveHandler = null;
let mouseUpHandler = null;
let resizeHandler = null;

// CLEANUP FUNCTIONS ------------------------------------------------------------
function cleanupToggleButton() {
  if (toggleButton) {
    toggleButton.remove();
    toggleButton = null;
  }

  // Clean up global event listeners
  if (mouseMoveHandler) {
    document.removeEventListener("mousemove", mouseMoveHandler);
    mouseMoveHandler = null;
  }

  if (mouseUpHandler) {
    document.removeEventListener("mouseup", mouseUpHandler);
    mouseUpHandler = null;
  }

  if (resizeHandler) {
    window.removeEventListener("resize", resizeHandler);
    resizeHandler = null;
  }
}

const openMasterProfile = () => {
  window.open(`${HOST_URL}/master-profile`, "_blank");
};

const openSyncData = () => {
  window.open(`${HOST_URL}/chrome-extension?autoSync=true`, "_blank");
};

// PROCESS & SHOW SUGGESTIONS ------------------------------------------------------------
async function processAndShowSuggestions() {
  const suggestions = await loadFromStorage(StorageKeys.USER_INFO, null);

  const hasSuggestions =
    suggestions && Object.values(suggestions).some((arr) => arr.length > 0);

  if (currentFieldRect) {
    showSuggestions(suggestions, currentFieldRect.x, currentFieldRect.y);
  } else {
    console.warn("Cannot show suggestions - no field position:", {
      hasSuggestions,
      hasPosition: Boolean(currentFieldRect),
      suggestions,
      currentFieldRect,
    });
  }
}

// HANDLE FIELD CLICKS ------------------------------------------------------------
async function handleFieldClick(e) {
  if (!isSuggestionsEnabled) return;

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

    await processAndShowSuggestions();
  }
}

// CLEANUP SUGGESTIONS ------------------------------------------------------------
function cleanupSuggestions() {
  if (suggestionsPopup) {
    suggestionsPopup.remove();
    suggestionsPopup = null;
  }
  currentField = null;
  currentFieldRect = null;
}

// MAIN CLEANUP ------------------------------------------------------------
function cleanup() {
  cleanupToggleButton();
  cleanupSuggestions();
}

// INITIALIZE ------------------------------------------------------------
async function initialize() {
  // Load states from storage
  isSidebarEnabled = await loadFromStorage(StorageKeys.SIDEBAR_ENABLED, true);
  isSuggestionsEnabled = await loadFromStorage(
    StorageKeys.SUGGESTIONS_ENABLED,
    true
  );

  // Load saved button position
  buttonPosition = await loadFromStorage(StorageKeys.BUTTON_POSITION, {
    top: 20,
    right: 10,
  });

  // Migration: ensure we always use right positioning (remove any left positioning from old version)
  if (buttonPosition.left !== undefined) {
    delete buttonPosition.left;
    buttonPosition.right = 10; // Always stick to right edge
    saveToStorage(StorageKeys.BUTTON_POSITION, buttonPosition);
  }

  if (isSidebarEnabled) {
    createToggleButton();
  }

  // Create suggestions iframe immediately if suggestions are enabled
  if (isSuggestionsEnabled) {
    document.addEventListener("click", handleFieldClick);
  }
}

initialize();

// LISTEN FOR MESSAGES FROM THE EXTENSION ------------------------------------------------------------
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === ACTIONS.ACTION_TOGGLE) {
    toggleSideBar();
  } else if (request.action === ACTIONS.OPEN_SIDEBAR) {
    toggleSideBar();
    if (request.fromContextMenu) {
      console.log(
        "Sidebar opened via context menu with text:",
        request.selectedText
      );
    }
  } else if (request.action === ACTIONS.UPDATE_SIDEBAR) {
    isSidebarEnabled = request.enabled;
    saveToStorage(StorageKeys.SIDEBAR_ENABLED, isSidebarEnabled);
    if (isSidebarEnabled) {
      if (!toggleButton) {
        createToggleButton();
      }
    } else {
      cleanupToggleButton();
    }
  } else if (request.action === ACTIONS.UPDATE_SUGGESTIONS) {
    isSuggestionsEnabled = request.enabled;
    saveToStorage(StorageKeys.SUGGESTIONS_ENABLED, isSuggestionsEnabled);
    if (isSuggestionsEnabled) {
      document.addEventListener("click", handleFieldClick);
    } else {
      document.removeEventListener("click", handleFieldClick);
      cleanupSuggestions();
    }
  }
});

// LISTEN FOR STORAGE CHANGES (since popup can no longer directly message content scripts)
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === "sync") {
    if (changes.sidebarEnabled) {
      const wasEnabled = isSidebarEnabled;
      isSidebarEnabled = changes.sidebarEnabled.newValue;

      if (isSidebarEnabled && !wasEnabled) {
        if (!toggleButton) {
          createToggleButton();
        }
      } else if (!isSidebarEnabled && wasEnabled) {
        cleanupToggleButton();
      }
    }

    if (changes.suggestionsEnabled) {
      const wasEnabled = isSuggestionsEnabled;
      isSuggestionsEnabled = changes.suggestionsEnabled.newValue;

      if (isSuggestionsEnabled && !wasEnabled) {
        document.addEventListener("click", handleFieldClick);
      } else if (!isSuggestionsEnabled && wasEnabled) {
        document.removeEventListener("click", handleFieldClick);
        cleanupSuggestions();
      }
    }
  }
});

// LISTEN FOR MESSAGES FROM IFRAME ------------------------------------------------------------
window.addEventListener("message", (event) => {
  handleMessage(event.data, event.source);
});

function handlePing(message) {
  window.postMessage({ type: WindowMessages.EXT_PING_RESPONSE }, event.origin);
}

function handleSaveUserInfo(message) {
  saveToStorage(StorageKeys.USER_INFO, message.userInfo);
  window.postMessage(
    { type: WindowMessages.SAVE_USER_INFO_RESPONSE },
    event.origin
  );
}

// HANDLE MESSAGES FROM BOTH SOURCES ------------------------------------------------------------
function handleMessage(message, source) {
  if (message.type === WindowMessages.EXT_PING) {
    handlePing(message);
    return;
  }

  if (message.type === WindowMessages.SAVE_USER_INFO) {
    handleSaveUserInfo(message);
    return;
  }
}

// CREATE SUGGESTIONS POPUP ------------------------------------------------------------
function createSuggestionsPopup() {
  suggestionsPopup = document.createElement("div");
  suggestionsPopup.id = SUGGESTIONS_ID;
  suggestionsPopup.style.display = "none";
  suggestionsPopup.style.width = SUGGESTIONS_WIDTH;

  document.body.appendChild(suggestionsPopup);
}

// SHOW SUGGESTIONS POPUP ------------------------------------------------------------
function showSuggestions(suggestions, x, y) {
  if (!suggestionsPopup) {
    createSuggestionsPopup();
  }

  const hasSuggestions =
    suggestions && Object.values(suggestions).some((arr) => arr.length > 0);

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

  if (!hasSuggestions) {
    // Show setup message when no suggestions available
    const setupMessage = document.createElement("div");
    setupMessage.id = "setup-message";

    setupMessage.innerHTML = `
        <div style="margin-top: 10px; font-size: 26px;">😓</div>
        <div style="font-weight: 500; margin-bottom: 8px; color: #fff;">No suggestions available</div>
        <div style="color: #999; font-size: 12px;">
          Set up your <span id="master-profile-link" class="span-highlight">Master Profile</span> to start seeing smart suggestions.
          <br>
          or try <span id="sync-data-link" class="span-highlight">Sync Data</span> manually.
        </div>
      `;

    // Add click handler for Master Profile link
    suggestionsContainer.appendChild(setupMessage);

    const profileLink = setupMessage.querySelector("#master-profile-link");
    if (profileLink) {
      profileLink.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openMasterProfile();
      });
    }
    const syncDataLink = setupMessage.querySelector("#sync-data-link");
    if (syncDataLink) {
      syncDataLink.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openSyncData();
      });
    }
  } else {
    // Create sections pane (reduced height to account for hint and branding)
    const sectionsPane = document.createElement("div");
    sectionsPane.className = SECTIONS_PANE_CLASS;
    sectionsPane.style.height = "180px"; // Reduced from max height to leave space for hint/branding
    sectionsPane.style.overflow = "auto";
    sectionsPane.style.paddingBottom = "10px";

    // Create values pane (reduced height to account for hint and branding)
    const valuesPane = document.createElement("div");
    valuesPane.className = VALUES_PANE_CLASS;
    valuesPane.style.overflow = "auto";
    valuesPane.style.height = "180px"; // Reduced from max height to leave space for hint/branding
    valuesPane.style.paddingBottom = "10px";

    // Define sections based on the structured data
    const sections = Object.values(UserInfoSections).reduce((acc, section) => {
      acc[section.name] = suggestions[section.key] || [];
      return acc;
    }, {});

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
        item.addEventListener("click", (e) => {
          if (currentField) {
            if (e.ctrlKey || e.metaKey) {
              // Ctrl+click (or Cmd+click on Mac): append to existing value
              const currentValue = currentField.value.trim();
              const separator = currentValue
                ? currentValue.endsWith(",")
                  ? " "
                  : ", "
                : "";
              currentField.value = currentValue + separator + value;
            } else {
              // Normal click: replace value
              currentField.value = value;
            }
            currentField.dispatchEvent(new Event("input", { bubbles: true }));
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

    // Add both panes to container
    suggestionsContainer.appendChild(sectionsPane);
    suggestionsContainer.appendChild(valuesPane);
  }

  // Clear existing content
  suggestionsPopup.innerHTML = "";

  // Add close button first (so it's on top)
  suggestionsPopup.appendChild(closeButton);

  // Add container to popup
  suggestionsPopup.appendChild(suggestionsContainer);

  // Add usage hint (only when there are suggestions)
  if (hasSuggestions) {
    const hintText = document.createElement("div");
    hintText.style.cssText = `
      font-size: 11px;
      color: #999;
      text-align: center;
      padding: 5px;
      border-top: 1px solid #333;
      background: rgba(0, 0, 0, 0.05);
      margin-top: 2px;
    `;
    hintText.innerHTML = `💡 <strong>Tip:</strong> Ctrl+click to append, click to replace`;
    suggestionsPopup.appendChild(hintText);
  }

  // Add branding
  const branding = document.createElement("div");
  branding.className = BRANDING_CLASS;
  branding.textContent = BRANDING_TEXT;
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

// HIDE SUGGESTIONS POPUP ------------------------------------------------------------
function hideSuggestions() {
  if (suggestionsPopup) {
    suggestionsPopup.style.display = "none";
  }
}

// HIDE ON CLICK OUTSIDE ------------------------------------------------------------
document.addEventListener("click", (e) => {
  if (!suggestionsPopup?.contains(e.target) && e.target !== currentField) {
    hideSuggestions();
  }
});

// CREATE TOGGLE BUTTON ------------------------------------------------------------
function createToggleButton() {
  if (toggleButton) return; // Don't create if already exists
  // Create toggle button
  toggleButton = document.createElement("button");
  toggleButton.id = TOGGLE_BUTTON_ID;
  toggleButton.style.padding = "0px !important";
  toggleButton.style.borderRadius = "50% !important";
  toggleButton.style.height = "46px !important";
  toggleButton.style.width = "46px !important";

  // Create and add mascot image
  const mascotImg = document.createElement("div");
  mascotImg.innerHTML = "📄";
  mascotImg.style.fontSize = "20px";
  //   mascotImg.src = chrome.runtime.getURL("mascot.webp");
  //   mascotImg.alt = "GoGoResume";
  mascotImg.style.padding = "0px";
  mascotImg.style.margin = "0px";
  mascotImg.style.width = "30px";
  mascotImg.style.height = "30px";
  mascotImg.style.objectFit = "cover";
  mascotImg.style.pointerEvents = "none";
  mascotImg.style.display = "flex";
  mascotImg.style.alignItems = "center";
  mascotImg.style.justifyContent = "center";

  toggleButton.appendChild(mascotImg);
  toggleButton.title = "Open GoGoResume Sidebar (Drag vertically to move)";

  // Position the button using saved position
  updateButtonPosition();

  // Add drag functionality (vertical only)
  let dragStartTime = 0;

  toggleButton.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return; // Only left click

    dragStartTime = Date.now();
    isDragging = true;

    const rect = toggleButton.getBoundingClientRect();
    dragOffset.y = e.clientY - rect.top;

    toggleButton.style.userSelect = "none";

    e.preventDefault();
  });

  // Create event handlers and store references for cleanup
  mouseMoveHandler = (e) => {
    if (!isDragging) return;

    e.preventDefault();

    // Calculate new vertical position only
    const newY = e.clientY - dragOffset.y;

    // Constrain to viewport vertically
    const maxY = window.innerHeight - 50;
    const constrainedY = Math.max(0, Math.min(newY, maxY));

    // Update position (keep on right edge, only change vertical)
    buttonPosition.top = constrainedY;
    buttonPosition.right = 10; // Always stick to right edge with margin

    updateButtonPosition();
  };

  mouseUpHandler = (e) => {
    if (!isDragging) return;

    isDragging = false;
    toggleButton.style.cursor = "pointer";

    // Save position to storage
    saveToStorage(StorageKeys.BUTTON_POSITION, buttonPosition);

    // If it was a quick click (not a drag), trigger the toggle
    const clickDuration = Date.now() - dragStartTime;
    if (clickDuration < 200) {
      toggleSideBar();
    }
  };

  resizeHandler = () => {
    const maxY = window.innerHeight - 50;

    if (buttonPosition.top > maxY) {
      buttonPosition.top = maxY;
      updateButtonPosition();
      saveToStorage(StorageKeys.BUTTON_POSITION, buttonPosition);
    }
  };

  // Add event listeners
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
  window.addEventListener("resize", resizeHandler);

  // Add hover effects
  toggleButton.addEventListener("mouseenter", () => {
    if (!isDragging) {
      toggleButton.style.transform = "scale(1.1)";
    }
  });

  toggleButton.addEventListener("mouseleave", () => {
    if (!isDragging) {
      toggleButton.style.transform = "scale(1)";
    }
  });

  // Set initial cursor
  toggleButton.style.cursor = "pointer";

  // Add to page
  document.body.appendChild(toggleButton);
}

// UPDATE BUTTON POSITION ------------------------------------------------------------
function updateButtonPosition() {
  if (!toggleButton) return;

  // Always use right/top positioning to stick to right edge
  toggleButton.style.right = `${buttonPosition.right || 10}px`;
  toggleButton.style.top = `${buttonPosition.top || 20}px`;
  toggleButton.style.left = "auto";
}

// TOGGLE SIDE BAR ------------------------------------------------------------
function toggleSideBar() {
  // Add visual feedback
  if (toggleButton) {
    toggleButton.style.transform = "scale(0.9)";
    setTimeout(() => {
      toggleButton.style.transform = "scale(1)";
    }, 150);
  }

  // Send message to background script to open sidebar
  chrome.runtime.sendMessage({ action: ACTIONS.OPEN_SIDEBAR }, (response) => {
    // if (chrome.runtime.lastError) {
    //   console.error(
    //     "Error sending OPEN_SIDEBAR message:",
    //     chrome.runtime.lastError
    //   );
    // } else if (response && response.success) {
    // } else {
    //   console.error("Failed to open sidebar:", response?.error);
    // }
  });
}
