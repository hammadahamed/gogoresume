<template>
  <button
    type="button"
    @click="onClick"
    :class="[
      'w-6 h-6 bg-slate-50 text-black border border-slate-300 border-dashed rounded-full hover:scale-110 flex items-center justify-center transition-all duration-200 font-medium',
      className,
    ]"
    :style="{ paddingBottom: '1.5px' }"
  >
    +
  </button>
</template>

<script>
export default {
  name: "AddButton",
  props: {
    onClick: {
      type: Function,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
