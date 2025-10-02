<template>
  <div>
    <p class="text-gray-500 text-sm">
      Separate skills with commas (,) to add multiple skills
    </p>
    <div class="flex items-center gap-4 mb-4">
      <div class="flex-grow">
        <Input
          v-model="newSkill"
          @keypress.enter.prevent="handleAddSkill"
          placeholder="Enter a skill and press Enter"
        />
      </div>
      <button
        type="button"
        @click="handleAddSkill"
        class="-mt-2.5 h-min px-4 py-2 rounded-sm bg-gray-900 text-white hover:bg-gray-400 text-sm font-semibold transition-all duration-200"
      >
        Add
      </button>
    </div>

    <div v-if="skills.length > 0" class="space-y-3">
      <!-- Clear All Button -->
      <div class="flex justify-end">
        <button
          type="button"
          @click="handleClearAll"
          class="text-xs text-red-600 hover:text-red-700 hover:underline font-medium transition-all duration-200"
          title="Remove all skills"
        >
          Clear All ({{ skills.length }})
        </button>
      </div>

      <!-- Skills List -->
      <div class="flex flex-wrap gap-2">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          class="flex items-center bg-gray-100 rounded-full px-4 py-1 text-sm text-black font-semibold"
        >
          <span>{{ skill }}</span>
          <button
            type="button"
            @click="handleRemoveSkill(index)"
            class="ml-2 text-gray-500 hover:text-red-400 text-lg"
            :title="`Remove ${skill}`"
          >
            ×
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-gray-500 text-sm italic py-4">
      No skills added yet. Add your first skill above.
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Input from "@/common/components/Input.vue";

export default {
  name: "SkillsForm",
  components: { Input },
  props: {
    skills: {
      type: Array,
      required: true,
    },
  },
  emits: ["update:skills"],
  setup(props, { emit }) {
    const newSkill = ref("");

    const handleAddSkill = () => {
      if (newSkill.value.trim()) {
        // Check if the input contains commas and split accordingly
        const skillsToAdd = newSkill.value
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0);

        emit("update:skills", [...props.skills, ...skillsToAdd]);
        newSkill.value = "";
      }
    };

    const handleRemoveSkill = (index) => {
      emit(
        "update:skills",
        props.skills.filter((_, i) => i !== index)
      );
    };

    const handleClearAll = () => {
      emit("update:skills", []);
    };

    return {
      newSkill,
      handleAddSkill,
      handleRemoveSkill,
      handleClearAll,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
