<template>
  <div
    class="app-primary-btn loading-btn"
    :class="{ active: props.loading }"
    @click="emit('click')"
  >
    <p v-if="props.reverse">
      {{ loading && props.loadingText ? props.loadingText : props.text }}
    </p>

    <Spinner
      v-if="props.loading"
      :color="'white'"
      :borderWidth="'2px'"
      :size="'18px'"
    />
    <p v-if="!props.reverse">
      {{ loading && props.loadingText ? props.loadingText : props.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Spinner from "./Spinner.vue";

const emit = defineEmits(["click"]);
const props = defineProps({
  text: String,
  loading: Boolean,
  loadingText: String,
  reverse: Boolean,
});

const loading = ref(false);
</script>

<style lang="scss" scoped>
.loading-btn {
  height: 40px;
  padding: 10px auto;
  width: 100%;

  &.active {
    pointer-events: none;
  }
}
</style>
