<template>
  <div class="react-resume-builder" :class="{ 'template-view': templateView }">
    <!-- Show placeholder when no user data -->
    <div
      v-if="!hasUserData && !templateView"
      class="no-data-placeholder"
      :class="{ 'max-h-[45vh]': isExtensionMode }"
      style="margin-top: 50px"
    >
      <div class="placeholder-content">
        <div class="placeholder-icon">📄</div>
        <p class="font-medium text-gray-500">No Profile Data Found</p>
        <div
          class="p-2 rounded-full bg-primary hover:opacity-70 transition-all duration-300 text-sm text-white font-semibold cursor-pointer"
          @click="router.push('/profile-data')"
        >
          Complete Profile
        </div>
      </div>
    </div>

    <!-- React PDF container -->
    <div v-else ref="reactContainer" id="react-pdf-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, ref, computed, inject } from "vue";
import React from "react";
import { createRoot } from "react-dom/client";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { getTemplate } from "./a-app-react/templates/TemplateManager.jsx";
import type { ResumeData } from "./types/resume.types";
import { useRouter } from "vue-router";
import { useUserInfoManager } from "./composables/useUserInfoManager";

// Props to receive data from parent Vue component
interface Props {
  userData?: ResumeData;
  templateId?: string;
  templateView?: boolean;
  hideDownloadButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  userData: () => ({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      professionalLinks: [],
    },
    workExperiences: [],
    education: [],
    skills: [],
    projects: [],
  }),
  templateId: "classic",
  templateView: false,
  hideDownloadButton: false,
});

const isExtensionMode = inject("isExtensionMode");

const router = useRouter();
const { hasUserData } = useUserInfoManager();

const reactContainer = ref<HTMLElement>();
let reactRoot: any = null;
let stableResumeBuilderComponent: any = null;

// Create React component programmatically
const createReactComponent = () => {
  const { useState, useEffect, createElement, useMemo } = React;

  // Main component
  const ResumeBuilder = ({
    userData: initialUserData,
    templateId: initialTemplateId,
  }: {
    userData: any;
    templateId: string;
  }) => {
    const [userData, setUserData] = useState(initialUserData);
    const [templateId, setTemplateId] = useState(
      initialTemplateId || "classic"
    );
    const [isUpdating, setIsUpdating] = useState(false);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
      if (initialUserData) {
        // Start fade out animation
        setIsUpdating(true);
        setOpacity(0);

        // After fade out, update data and fade in
        const updateTimer = setTimeout(() => {
          setUserData(initialUserData);
          setOpacity(1);
          setIsUpdating(false);
        }, 250); // Wait for fade out to complete

        return () => clearTimeout(updateTimer);
      }
    }, [initialUserData]);

    useEffect(() => {
      if (initialTemplateId && initialTemplateId !== templateId) {
        setTemplateId(initialTemplateId);
      }
    }, [initialTemplateId]);

    // Memoize the PDF template to prevent unnecessary re-renders
    const memoizedTemplate = useMemo(() => {
      const selectedTemplate = getTemplate(templateId);
      return createElement(selectedTemplate.component, { userData });
    }, [userData, templateId]);

    // Use the memoized template
    const renderTemplate = () => memoizedTemplate;

    return createElement(
      "div",
      {
        style: {
          width: "100%",
          fontFamily: "Arial, sans-serif",
        },
      },
      createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "16px",
          },
        },
        // Download button (hidden when hideDownloadButton is true)
        !props.templateView &&
          createElement(
            PDFDownloadLink,
            {
              document: renderTemplate(),
              fileName: `${userData?.personalInfo?.firstName || "Resume"}_${
                userData?.personalInfo?.lastName || "PDF"
              }.pdf`.replace(/\s+/g, "_"),
              style: {
                textDecoration: "none",
                display: props.hideDownloadButton ? "none" : "block",
              },
            },
            ({ loading }: { loading: boolean }) =>
              createElement(
                "button",
                {
                  ref: (el: HTMLButtonElement | null) => {
                    if (props.hideDownloadButton) {
                      downloadButtonRef = el;
                    }
                  },
                  disabled: loading,
                  style: {
                    padding: "6px 16px",
                    backgroundColor: loading ? "#9ca3af" : "#6366f1",
                    color: "white",
                    border: "none",
                    borderRadius: "0px",
                    fontSize: "13px",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontWeight: "600",
                    transition: "background-color 0.15s ease",
                  },
                  onMouseEnter: (e: any) => {
                    if (!loading) {
                      e.target.style.backgroundColor = "#5b5bd6";
                    }
                  },
                  onMouseLeave: (e: any) => {
                    if (!loading) {
                      e.target.style.backgroundColor = "#6366f1";
                    }
                  },
                },
                loading ? "Generating..." : "Download"
              )
          )
      ),
      createElement(
        "div",
        {
          style: {
            position: "relative",
            ...(props.templateView && { width: "100%" }),
            maxHeight: props.templateView ? "50%" : "calc(100vh - 150px)",
            aspectRatio: "1 / 1.42",
            border: "1px solid black",
            overflow: "hidden",
            margin: "auto",
          },
        },
        createElement(
          PDFViewer,
          {
            style: {
              width: "100%",
              height: "100%",
              border: "none",
              opacity: opacity,
              transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: isUpdating ? "scale(0.98)" : "scale(1)",
              filter: isUpdating ? "blur(1px)" : "blur(0px)",
            },
            showToolbar: false, // Hide the built-in PDF viewer toolbar
          },
          renderTemplate()
        ),
        // Loading overlay with smooth animation
        isUpdating &&
          createElement(
            "div",
            {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(248, 250, 252, 0.95)",
                backdropFilter: "blur(4px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                opacity: 1,
                transition: "opacity 0.2s ease",
              },
            },
            // Animated spinner
            createElement("div", {
              style: {
                width: "24px",
                height: "24px",
                border: "3px solid #e2e8f0",
                borderTop: "3px solid #6366f1",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                marginBottom: "12px",
              },
            }),
            // Loading text
            createElement(
              "div",
              {
                style: {
                  color: "#64748b",
                  fontSize: "13px",
                  fontWeight: "500",
                  letterSpacing: "0.025em",
                },
              },
              "Updating..."
            )
          )
      )
    );
  };

  return ResumeBuilder;
};

// Download trigger system
let downloadEventListener: ((event: MessageEvent) => void) | null = null;
let downloadButtonRef: HTMLButtonElement | null = null;

const initDownloadEventListener = () => {
  if (!props.hideDownloadButton) return;

  downloadEventListener = (event: MessageEvent) => {
    if (event.data?.type === "trigger-resume-download" && downloadButtonRef) {
      downloadButtonRef.click();
    }
  };

  window.addEventListener("message", downloadEventListener);
};

const destroyDownloadEventListener = () => {
  if (downloadEventListener) {
    window.removeEventListener("message", downloadEventListener);
    downloadEventListener = null;
    downloadButtonRef = null;
  }
};

onMounted(async () => {
  try {
    // Initialize download event listener if needed
    initDownloadEventListener();

    if (reactContainer.value && hasUserData.value) {
      reactRoot = createRoot(reactContainer.value);

      // Create stable component once
      stableResumeBuilderComponent = createReactComponent();
      reactRoot.render(
        React.createElement(stableResumeBuilderComponent, {
          userData: props.userData,
          templateId: props.templateId,
        })
      );
    }
  } catch (error) {
    console.error("Failed to mount React components:", error);
  }
});

onUnmounted(() => {
  // Clean up download event listener
  destroyDownloadEventListener();

  if (updateTimeout) {
    clearTimeout(updateTimeout);
  }
  if (reactRoot) {
    reactRoot.unmount();
  }
});

// Watch for userData changes and update React component
let renderCount = 0;
let updateTimeout: any = null;

watch(
  [() => props.userData, () => props.templateId],
  ([newUserData, newTemplateId]) => {
    renderCount++;

    // Clear previous timeout
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }

    // Debounce the update
    updateTimeout = setTimeout(() => {
      // If no React root exists but we now have data, create it
      if (!reactRoot && reactContainer.value && hasUserData.value) {
        reactRoot = createRoot(reactContainer.value);
        stableResumeBuilderComponent = createReactComponent();
      }

      if (
        reactRoot &&
        newUserData &&
        stableResumeBuilderComponent &&
        hasUserData.value
      ) {
        // Reuse the same component instead of recreating
        reactRoot.render(
          React.createElement(stableResumeBuilderComponent, {
            userData: newUserData,
            templateId: newTemplateId,
            key: Date.now(), // Force React to recognize the update
          })
        );
      }
    }, 800); // Reduced to 200ms for faster feedback
  },
  { deep: true }
);
</script>

<style scoped>
.react-resume-builder {
  width: 100%;
}

#react-pdf-container {
  width: 100%;
}

.no-data-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 160px);
  max-width: 500px;
  margin: auto;
  border: 2px dashed rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}

.placeholder-content {
  text-align: center;
  padding: 2rem;
  max-width: 300px;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.placeholder-content h3 {
  margin: 0 0 1rem 0;
  color: #334155;
  font-size: 1.25rem;
  font-weight: 600;
}

.placeholder-content p {
  margin: 0 0 0.75rem 0;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
}

.placeholder-hint {
  font-size: 0.85rem !important;
  color: #94a3b8 !important;
  font-style: italic;
}

/* Global animations */
:global(@keyframes spin) {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Add smooth transitions for all elements */
#react-pdf-container {
  * {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
}
</style>
