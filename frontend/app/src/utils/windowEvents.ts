import { getSuggestions } from "./suggestions";
import type { FieldInfo } from "./suggestions";
import type { UserInfo } from "@/types/resume.types";

// Message types
const MESSAGE_TYPE_FIELD_CLICK = "FIELD_CLICK";
const MESSAGE_TYPE_SUGGESTIONS = "SUGGESTIONS";
const MESSAGE_TYPE_SAVE_USER_INFO = "SAVE_USER_INFO";
const MESSAGE_TYPE_LOAD_USER_INFO = "LOAD_USER_INFO";
const MESSAGE_TYPE_USER_INFO_LOADED = "USER_INFO_LOADED";

// Timeout for storage operations
const STORAGE_TIMEOUT = 100;

// Track if we're in an iframe
const isInIframe = window !== window.top;

// Initialize window event listeners
export function initializeWindowEvents() {
  window.addEventListener("message", handleWindowMessage);

  // If we're in the main window, also listen for extension messages
  if (!isInIframe) {
    // Try to connect to extension
    tryConnectToExtension();
  }
}

// Try to connect to the extension's content script
function tryConnectToExtension() {
  // Dispatch a custom event that the content script can listen for
  const event = new CustomEvent("gogoresume-init");
  window.dispatchEvent(event);
}

// Handle incoming messages
function handleWindowMessage(event: MessageEvent) {
  console.log("Received message:", event.data);

  if (event.data.type === MESSAGE_TYPE_FIELD_CLICK) {
    handleFieldClick(event.data.fieldInfo);
  } else if (event.data.type === MESSAGE_TYPE_USER_INFO_LOADED) {
    console.log("Received user info from storage:", event.data.userInfo);
    handleUserInfoLoaded(event.data.userInfo);
  }
}

// Handle field click events
function handleFieldClick(fieldInfo: FieldInfo) {
  console.log("Field clicked:", fieldInfo);
  const suggestions = getSuggestions(fieldInfo);

  // Send suggestions back to content script
  sendMessage({
    type: MESSAGE_TYPE_SUGGESTIONS,
    suggestions,
  });
}

// Storage related functions
let userInfoCallback:
  | ((result: { userInfo: UserInfo | null; error?: string }) => void)
  | null = null;

function sendMessage(message: any) {
  if (isInIframe) {
    // If in iframe, send to parent
    window.parent.postMessage(message, "*");
  } else {
    // If in main window, dispatch event for content script
    const event = new CustomEvent("gogoresume-message", { detail: message });
    window.dispatchEvent(event);
  }
}

export function saveUserInfo(userInfo: UserInfo): void {
  console.log("Saving user info:", userInfo);
  sendMessage({
    type: MESSAGE_TYPE_SAVE_USER_INFO,
    userInfo,
  });
}

export function loadUserInfo(): Promise<{
  userInfo: UserInfo | null;
  error?: string;
}> {
  return new Promise((resolve) => {
    // Create one-time event listener for user info
    const handleUserInfoLoaded = (event: MessageEvent) => {
      if (event.data.type === MESSAGE_TYPE_USER_INFO_LOADED) {
        console.log("Received user info in loadUserInfo:", event.data.userInfo);
        window.removeEventListener("message", handleUserInfoLoaded);
        resolve({ userInfo: event.data.userInfo });
      }
    };

    // Add the listener
    window.addEventListener("message", handleUserInfoLoaded);

    // Send request for user info
    sendMessage({
      type: MESSAGE_TYPE_LOAD_USER_INFO,
    });

    // Set timeout to clean up listener and resolve if no response
    setTimeout(() => {
      window.removeEventListener("message", handleUserInfoLoaded);
      if (!userInfoCallback) {
        console.log("No user info received within timeout");
        resolve({ userInfo: null, error: "Timeout waiting for user info" });
      }
    }, 200);
  });
}

function handleUserInfoLoaded(userInfo: UserInfo | null) {
  console.log("Handling loaded user info:", userInfo);
  if (userInfoCallback) {
    userInfoCallback({ userInfo });
    userInfoCallback = null;
  }
}

// Clean up function to remove event listeners
export function cleanupWindowEvents() {
  window.removeEventListener("message", handleWindowMessage);
  userInfoCallback = null;
}
