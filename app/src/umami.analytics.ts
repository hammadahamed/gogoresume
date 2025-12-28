export const initializeUmamiAnalytics = () => {
  // Load analytics only in production
  if (process.env.NODE_ENV === "production") {
    const script = document.createElement("script");
    script.defer = true;
    script.src = "https://mama.gogoresume.com/script.js";
    script.setAttribute(
      "data-website-id",
      "84b5a76b-cf59-4593-9b54-52f711b5990e"
    );
    document.head.appendChild(script);
  }
};
