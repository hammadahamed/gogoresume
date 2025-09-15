// @ts-ignore

const EXT_ACTION_PREFIX = "GGR_EXT_ACTION";
const ACTIONS = {
  CONTEXT_MENU_TEXT_RECEIVED: `${EXT_ACTION_PREFIX}:CONTEXT_MENU_TEXT_RECEIVED`,
  REQUEST_STORED_TEXT: `${EXT_ACTION_PREFIX}:REQUEST_STORED_TEXT`,
  STORED_TEXT_RESPONSE: `${EXT_ACTION_PREFIX}:STORED_TEXT_RESPONSE`,
};

export function setupContextMenuTextListener(cb: (text: string) => void) {
  window.addEventListener("message", (event) => {
    if (event.data.type === ACTIONS.CONTEXT_MENU_TEXT_RECEIVED) {
      const text = event.data.data;
      cb(text);
    }
  });
  console.log("✅ Context menu text listener initialized");
}

// Getter function to request stored text from side-panel
export function getStoredTextFromSidePanel(): Promise<string | null> {
  return new Promise((resolve) => {
    // Set up a one-time listener for the response
    const handleResponse = (event: MessageEvent) => {
      if (event.data.type === ACTIONS.STORED_TEXT_RESPONSE) {
        window.removeEventListener("message", handleResponse);
        resolve(event.data.text || null);
      }
    };

    window.addEventListener("message", handleResponse);

    // Send request to parent (sidepanel)
    window.parent.postMessage(
      {
        type: ACTIONS.REQUEST_STORED_TEXT,
      },
      "*"
    );

    // Timeout after 1 second
    setTimeout(() => {
      window.removeEventListener("message", handleResponse);
      resolve(null);
    }, 1000);
  });
}
