export const initializeUmamiAnalytics = () => {
  // Load analytics only in production
  if (process.env.NODE_ENV === "production") {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://mama.gogoresume.com/script.js";
    script.setAttribute(
      "data-website-id",
      "f4b94323-3bbe-40f7-8a37-e41264cee9b2"
    );
    document.head.appendChild(script);
  }
};
