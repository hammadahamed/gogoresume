<template>
  <div
    class="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 p-5 hover:shadow-sm relative"
    :class="{ 'pointer-events-none': isDuplicating }"
    @mouseleave="handleMouseLeave"
  >
    <!-- Resume Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1 min-w-0">
        <h3 class="text-base font-medium text-gray-900 truncate mb-1">
          {{ resume.name }}
        </h3>
        <div class="flex items-center gap-3 text-xs text-gray-500">
          <span>{{ getTemplateName(resume.templateId) }}</span>
          <span class="text-gray-300">•</span>
          <span>{{ getRelativeDate(resume.updatedAt) }}</span>
        </div>
      </div>
      <div
        class="ml-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <!-- Actions Menu (hover only) -->
        <div @click.stop>
          <Dropdown
            ref="dropdownRef"
            :options="menuOptions"
            @select="handleMenuSelect"
          />
        </div>
      </div>
    </div>

    <!-- Primary Actions (always visible) -->
    <div class="flex gap-2">
      <button
        @click="$emit('edit', resume.id)"
        :disabled="isDuplicating"
        class="flex-1 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Edit Resume
      </button>
      <button
        @click="$emit('use-for-tweak', resume.id)"
        :disabled="isDuplicating"
        class="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        AI Tweak
      </button>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="isDuplicating"
      class="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10"
    >
      <div
        class="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-md shadow-sm border"
      >
        <Spinner size="16px" color="#6366f1" />
        <span>Duplicating...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import Dropdown, {
  type DropdownOption,
} from "../../common/components/Dropdown.vue";
import Spinner from "../../common/components/Spinner.vue";

export interface SavedResume {
  id: string;
  name: string;
  templateId: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  resume: SavedResume;
  isDuplicating?: boolean;
}

interface Emits {
  (e: "edit", resumeId: string): void;
  (e: "duplicate", resume: SavedResume): void;
  (e: "delete", resumeId: string, resumeName: string): void;
  (e: "use-for-tweak", resumeId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Template refs
const dropdownRef = ref<InstanceType<typeof Dropdown> | null>(null);

// Template name mapping
const templateNames: Record<string, string> = {
  classic: "Classic",
  modern: "Modern",
  creative: "Creative",
  minimal: "Minimal",
};

// Menu options for dropdown (computed to handle loading state)
const menuOptions = computed<DropdownOption[]>(() => [
  {
    value: "edit",
    label: "Edit Resume",
    variant: "default",
    disabled: props.isDuplicating,
  },
  {
    value: "duplicate",
    label: props.isDuplicating ? "Duplicating..." : "Duplicate",
    variant: "default",
    disabled: props.isDuplicating,
  },
  {
    value: "delete",
    label: "Delete",
    variant: "danger",
    disabled: props.isDuplicating,
  },
]);

// Methods
const getTemplateName = (templateId: string) => {
  return templateNames[templateId] || templateId;
};

const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getRelativeDate = (date: Date | string) => {
  const now = new Date();
  const updatedDate = new Date(date);
  const diffInMs = now.getTime() - updatedDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}mo ago`;
  return `${Math.floor(diffInDays / 365)}y ago`;
};

const handleMenuSelect = (value: string) => {
  switch (value) {
    case "edit":
      emit("edit", props.resume.id);
      break;
    case "duplicate":
      emit("duplicate", props.resume);
      break;
    case "delete":
      emit("delete", props.resume.id, props.resume.name);
      break;
  }
};

const handleMouseLeave = () => {
  // Close dropdown when mouse leaves the component
  if (dropdownRef.value) {
    dropdownRef.value.close();
  }
};
</script>
