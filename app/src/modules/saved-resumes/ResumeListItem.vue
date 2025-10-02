<template>
  <div
    class="group py-5 px-6 transition-all rounded duration-200 relative cursor-pointer hover:border-indigo-400 border border-gray-200"
    :class="{ 'pointer-events-none opacity-50': isDuplicating }"
    @click="$emit('edit', resume.id)"
    @mouseleave="handleMouseLeave"
  >
    <div class="flex items-center justify-between gap-4">
      <!-- Resume Info -->
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-medium text-gray-900 truncate">
          {{ resume.name }}
        </h3>
        <div class="flex items-center gap-4 mt-1 text-xs text-gray-500">
          <span>{{ getTemplateName(resume.templateId) }}</span>
          <span>{{ getRelativeDate(resume.updatedAt) }}</span>
        </div>
      </div>

      <!-- Actions (hover only) -->
      <div
        class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <button
          @click.stop="$emit('use-for-tweak', resume.id)"
          :disabled="isDuplicating"
          class="text-[12px] font-semibold rounded-full border border-black bg-black text-white px-2 py-1 transition-colors hover:opacity-70"
        >
          Tweak ⚡️
        </button>
        <div @click.stop class="text-gray-400 hover:text-gray-600">
          <Dropdown
            ref="dropdownRef"
            :options="menuOptions"
            @select="handleMenuSelect"
          />
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div
      v-if="isDuplicating"
      class="absolute inset-0 bg-gray-50 flex items-center justify-center"
    >
      <div class="flex items-center gap-2 text-xs text-gray-600">
        <Spinner size="12px" color="#6366f1" />
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
import { getRelativeDate } from "../../helper/common.helper";

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
