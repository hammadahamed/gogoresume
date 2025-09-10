<template>
  <div class="minimal-pdf-viewer">
    <div ref="reactContainer" id="minimal-pdf-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import React from "react";
import { createRoot } from "react-dom/client";
import { PDFViewer } from "@react-pdf/renderer";
import { getTemplate } from "./a-app-react/templates/TemplateManager.jsx";
import type { UserInfo } from "./types/resume.types";

interface Props {
  userData?: UserInfo;
  templateId?: string;
}

const props = defineProps({
  userData: {
    type: Object as PropType<UserInfo>,
    default: () => ({}),
  },
  templateId: {
    type: String,
    default: "classic",
  },
});

const reactContainer = ref<HTMLElement>();
let reactRoot: any = null;

// Minimal React component - no states, no effects, no animations
const createMinimalPDFViewer = () => {
  const { createElement } = React;

  const MinimalPDFViewer = ({
    userData,
    templateId,
  }: {
    userData: any;
    templateId: string;
  }) => {
    const selectedTemplate = getTemplate(templateId || "classic");
    const pdfDocument = createElement(selectedTemplate.component, { userData });

    return createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100vh",
        },
      },
      createElement(
        PDFViewer,
        {
          style: {
            width: "100%",
            height: "100%",
            border: "none",
          },
          showToolbar: true,
        },
        pdfDocument
      )
    );
  };

  return MinimalPDFViewer;
};

onMounted(() => {
  if (reactContainer.value) {
    reactRoot = createRoot(reactContainer.value);
    const MinimalComponent = createMinimalPDFViewer();

    reactRoot.render(
      React.createElement(MinimalComponent, {
        userData: props.userData,
        templateId: props.templateId,
      })
    );
  }
});

onUnmounted(() => {
  if (reactRoot) {
    reactRoot.unmount();
  }
});
</script>

<style scoped>
.minimal-pdf-viewer {
  width: 100%;
  height: 100vh;
}

#minimal-pdf-container {
  width: 100%;
  height: 100%;
}
</style>
