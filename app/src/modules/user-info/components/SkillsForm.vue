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
        >
          ×
        </button>
      </div>
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

    return {
      newSkill,
      handleAddSkill,
      handleRemoveSkill,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
