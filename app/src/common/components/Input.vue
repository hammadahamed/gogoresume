<template>
  <div class="mb-4">
    <label
      class="block text-sm font-semibold text-left text-gray-700 mb-1.5"
      name="label"
    >
      {{ label }}
    </label>
    <textarea
      name="textarea"
      v-if="multiline"
      v-bind="inputProps"
      :rows="rows"
      :class="baseInputStyles"
      ref="inputRef"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    ></textarea>

    <input
      v-else
      v-bind="inputProps"
      :id="id"
      :type="type"
      :class="baseInputStyles"
      @click="handleClick"
      ref="inputRef"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Input",
  props: {
    label: {
      type: String,
    },
    multiline: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: [Number, String],
      default: 3,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const inputRef = ref(null);

    const handleClick = () => {
      if (props.type === "month" || props.type === "date") {
        inputRef.value?.showPicker();
      }
    };

    const handleInput = (event) => {
      emit("update:modelValue", event.target.value);
    };

    const baseInputStyles = `
      w-full
      px-3 py-1.5
      text-gray-700
      bg-black-50
      border border-gray-300

      focus:outline-none
      focus:border-gray-900
      focus:ring-1
      focus:ring-gray-900
      transition-all
      placeholder:text-gray-400
      placeholder:text-sm
      placeholder:font-normal
      text-sm
      font-medium
      [color-scheme:dark]
      [&::-webkit-calendar-picker-indicator]:grayscale
      [&::-webkit-calendar-picker-indicator]:invert
      [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer
      ${props.type === "month" || props.type === "date" ? "cursor-pointer" : ""}
    `;

    return {
      inputRef,
      handleClick,
      handleInput,
      baseInputStyles,
      inputProps: {
        ...props,
        class: undefined, // Remove class from props to avoid duplication
      },
    };
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
