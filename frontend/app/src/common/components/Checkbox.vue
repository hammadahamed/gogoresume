<template>
  <label
    :class="[
      'inline-flex items-center',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className,
    ]"
  >
    <div class="relative flex items-center">
      <input
        type="checkbox"
        v-model="isChecked"
        :disabled="disabled"
        class="sr-only"
        @change="handleChange"
      />
      <div
        :class="[
          'w-4 h-4 rounded border flex items-center justify-center transition-colors',
          isChecked
            ? 'bg-indigo-50 border-indigo-300'
            : 'bg-gray-50 border-gray-300',
          disabled
            ? 'bg-gray-100 border-gray-200'
            : isChecked
            ? 'hover:border-indigo-400'
            : 'hover:border-gray-400',
        ]"
      >
        <svg
          v-if="isChecked"
          class="w-3 h-3"
          :class="disabled ? 'text-gray-400' : 'text-indigo-600'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
    <span
      v-if="label"
      :class="[
        'ml-2 text-sm font-bold',
        isChecked ? 'text-indigo-700' : 'text-gray-600',
      ]"
    >
      {{ label }}
    </span>
  </label>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "Checkbox",
  props: {
    label: String,
    checked: Boolean,
    disabled: Boolean,
    className: String,
  },
  emits: ["update:checked"],
  setup(props, { emit }) {
    const isChecked = ref(props.checked);

    const handleChange = () => {
      emit("update:checked", isChecked.value);
    };

    watch(
      () => props.checked,
      (newVal) => {
        isChecked.value = newVal;
      }
    );

    return {
      isChecked,
      handleChange,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
