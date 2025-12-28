<script setup lang="ts">
import { ref, computed } from "vue";
import { toast } from "vue3-toastify";
import Section from "./Section.vue";
import Input from "@/common/components/Input.vue";
import AddButton from "@/common/components/AddButton.vue";

// Define props
const props = defineProps<{
  personalInfo: any;
  professionalSummary?: string;
  onChange: (updatedInfo: any) => void;
}>();

// Local state for new link
const newLink = ref({ label: "", url: "" });

// Computed property for professionalSummary to fix reactivity
const summaryModel = computed({
  get: () => props.professionalSummary,
  set: (value) =>
    props.onChange({
      personalInfo: props.personalInfo,
      professionalSummary: value,
    }),
});

// Methods to handle changes
function handleAddLink() {
  if (!newLink.value.label.trim() || !newLink.value.url.trim()) {
    toast.error("Both label and URL are required.");
    return;
  }

  props.onChange({
    personalInfo: props.personalInfo,
    professionalSummary: props.professionalSummary,
    professionalLinks: [
      ...(props?.personalInfo.professionalLinks ?? []),
      { ...newLink.value },
    ],
  });
  newLink.value = { label: "", url: "" };
}

function handleRemoveLink(index: number) {
  props.onChange({
    personalInfo: props.personalInfo,
    professionalSummary: props.professionalSummary,
    professionalLinks: props.personalInfo.professionalLinks.filter(
      (_, i) => i !== index
    ),
  });
}

function handleLinkChange(event: Event, field: "label" | "url") {
  const target = event.target as HTMLInputElement;
  newLink.value = {
    ...newLink.value,
    [field]: target.value,
  };
}

function handleKeyPress(event: KeyboardEvent) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleAddLink();
  }
}
</script>

<template>
  <div>
    <Section title="Personal Information">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-2">
        <Input
          label="First Name"
          name="firstName"
          v-model="props.personalInfo.firstName"
          placeholder="e.g., John"
        />
        <Input
          label="Last Name"
          name="lastName"
          v-model="props.personalInfo.lastName"
          placeholder="e.g., Doe"
        />
        <Input
          label="Title"
          name="title"
          class="sm:col-span-2"
          v-model="props.personalInfo.title"
          placeholder="e.g., Senior Software Engineer with 5+ years of experience"
        />
      </div>
    </Section>

    <Section title="Contact Information">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <Input
          label="Location"
          name="location"
          v-model="props.personalInfo.location"
          placeholder="e.g., San Francisco, CA"
        />
        <Input
          label="Phone"
          type="tel"
          name="phone"
          v-model="props.personalInfo.phone"
          placeholder="e.g., +1 (555) 123-4567"
        />
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          class="sm:col-span-2"
          v-model="props.personalInfo.email"
          placeholder="e.g., john.smith@example.com"
        />
      </div>
    </Section>

    <Section title="Professional Links">
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="LinkedIn Profile"
            type="url"
            name="linkedin"
            v-model="props.personalInfo.linkedin"
            placeholder="https://linkedin.com/in/yourprofile"
          />
          <Input
            label="Portfolio Website"
            type="url"
            name="portfolio"
            v-model="props.personalInfo.portfolio"
            placeholder="https://yourportfolio.com"
          />
        </div>

        <div class="mt-6">
          <div class="flex items-center justify-between mb">
            <label class="block font-semibold text-gray-700">
              Additional Links
            </label>
            <AddButton @click="handleAddLink" />
          </div>
          <p class="text-gray-400 text-sm">Hit enter(⏎) to add</p>

          <div class="space-y-2 mb-4 mt-4">
            <div
              v-for="(link, index) in props.personalInfo.professionalLinks"
              :key="index"
              class="flex items-center bg-gray-100/50 border border-gray-200 rounded-xs px-4 py-2 text-gray-900"
            >
              <span class="font-medium text-sm">{{ link.label }}:</span>
              <span class="ml-2 text-gray-600 truncate flex-grow text-sm">
                {{ link.url }}
              </span>
              <button
                type="button"
                @click="handleRemoveLink(index)"
                class="ml-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label=""
              placeholder="Link Label (e.g., GitHub, Dribbble)"
              v-model="newLink.label"
              @keypress="handleKeyPress"
            />
            <div class="flex gap-2">
              <div class="flex-grow">
                <Input
                  label=""
                  type="url"
                  placeholder="URL"
                  v-model="newLink.url"
                  @keypress="handleKeyPress"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
    <Section title="Professional Summary">
      <Input
        label="Summary"
        name="professionalSummary"
        v-model="summaryModel"
        multiline
        rows="4"
        placeholder="Write a brief overview of your professional background and career objectives..."
      />
    </Section>
  </div>
</template>

<style scoped>
/* Add your styles here if needed */
</style>
