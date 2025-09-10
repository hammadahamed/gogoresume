import { getSuggestions } from "./suggestions";
import { useDataManager } from "../composables/useDataManager";

export function setupMessageHandler() {
  console.log("Setting up message handler");
  const { getUserProfile } = useDataManager();

  // Load user data when message handler is initialized
  //   getUserProfile().then(() => {
  //     console.log("User profile loaded in message handler");
  //   });

  window.addEventListener("message", (event) => {
    // console.log("🔥🔥 Message received in iframe:", event.data);

    // Handle field click events from content script
    if (event.data.type === "FIELD_CLICK") {
      const fieldInfo = event.data.fieldInfo;
      console.log("Processing field click:", fieldInfo);

      const suggestions = getSuggestions(fieldInfo);
      console.log("Generated suggestions:", suggestions);

      // Send suggestions back to content script
      window.parent.postMessage(
        {
          type: "SUGGESTIONS",
          suggestions,
        },
        "*"
      );
      console.log("Sent suggestions back to content script");
    }
  });
}
