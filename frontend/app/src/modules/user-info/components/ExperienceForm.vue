<script setup lang="ts">
import Input from "@/common/components/Input.vue";
import Checkbox from "@/common/components/Checkbox.vue";
import AddButton from "@/common/components/AddButton.vue";

// Define props
const props = defineProps<{
  experience: {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  };
  index: number;
  disableCurrentOption: boolean;
}>();

// Define emits
const emit = defineEmits<{
  (e: "onChange", updatedExperience: any): void;
  (e: "onDelete"): void;
}>();

// Methods to handle changes
function handleAchievementChange(index: number, value: string) {
  const newAchievements = [...props.experience.achievements];
  newAchievements[index] = value;
  emit("onChange", { ...props.experience, achievements: newAchievements });
}

function addAchievement() {
  emit("onChange", {
    ...props.experience,
    achievements: [...props.experience.achievements, ""],
  });
}

function removeAchievement(index: number) {
  const newAchievements = props.experience.achievements.filter(
    (_, i) => i !== index
  );
  emit("onChange", { ...props.experience, achievements: newAchievements });
}
</script>

<template>
  <div class="mb-6 mt-10">
    <div
      class="bg-white border border-gray-400 p-6 shadow-sm hover:shadow-md transition-shadow relative"
    >
      <div
        class="absolute -top-3 -left-3 w-6 h-6 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium"
      >
        {{ index + 1 }}
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company"
          name="company"
          v-model="props.experience.company"
          required
          placeholder="e.g., Google"
        />
        <Input
          label="Position"
          name="position"
          v-model="props.experience.position"
          required
          placeholder="e.g., Senior Software Engineer"
        />
      </div>

      <div class="mt-4">
        <Input
          label="Location"
          name="location"
          v-model="props.experience.location"
          required
          placeholder="e.g., Mountain View, CA"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Input
          label="Start Date"
          type="month"
          name="startDate"
          v-model="props.experience.startDate"
          required
        />
        <Input
          label="End Date"
          type="month"
          name="endDate"
          v-model="props.experience.endDate"
          :disabled="props.experience.current"
          :required="!props.experience.current"
        />
      </div>

      <div class="mt-2">
        <Checkbox
          name="current"
          :checked="props.experience.current"
          @update:checked="
            (value) => emit('onChange', { ...props.experience, current: value })
          "
          :disabled="props.disableCurrentOption"
          label="I currently work here"
        />
      </div>

      <div class="mt-4">
        <Input
          label="Description"
          name="description"
          v-model="props.experience.description"
          multiline
          rows="3"
          required
          placeholder="Describe your role, responsibilities, and key contributions..."
        />
      </div>

      <div class="mt-6">
        <div class="flex items-center justify-between mb-3">
          <label class="block text-sm font-semibold text-gray-700">
            Key Achievements
          </label>
          <AddButton @click="addAchievement" />
        </div>
        <div class="">
          <div
            v-for="(achievement, index) in props.experience.achievements"
            :key="index"
            class="flex gap-2 items-center"
          >
            <div class="flex-grow">
              <Input
                label=""
                v-model="props.experience.achievements[index]"
                class="mb-0"
                placeholder="e.g., Increased team productivity by 25% through process improvements"
                @keydown.enter.prevent
              />
            </div>
            <button
              type="button"
              @click="removeAchievement(index)"
              class="-mt-3 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          <p
            v-if="props.experience.achievements.length === 0"
            class="text-gray-500 text-sm"
          >
            Add key achievements or notable accomplishments from this role
          </p>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button
          type="button"
          @click="emit('onDelete')"
          class="text-sm font-medium bg-red-50 border border-red-500 text-red-600 px-3 py-1.5 hover:bg-red-100 transition-all duration-200 transform hover:translate-y-[-1px]"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here if needed */
</style>
