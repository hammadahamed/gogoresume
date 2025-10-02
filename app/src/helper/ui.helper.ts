export const scrollToSection = (sectionId: string) => {
  if (sectionId === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export const openExtensionPage = () => {
  const link = process.env.CHROME_EXTENSION_URL;
  window.open(link, "_blank");
};
