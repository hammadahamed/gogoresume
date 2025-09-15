<template>
  <div class="relative">
    <div
      v-if="matchScore > 0"
      class="flex items-center absolute left-2 top-0"
      style="z-index: 1"
    >
      <div
        class="font-bold px-2 py-0.5 rounded-full"
        :class="getQualityBadgeClass(matchScore)"
        style="font-size: 11px; border-width: 0px"
      >
        {{ matchScore }}% {{ getQualityText(matchScore) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";

interface Props {
  matchScore: number;
}

const props = withDefaults(defineProps<Props>(), {
  matchScore: 0,
});

const isExtensionMode = inject("isExtensionMode", false);

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-teal-600";
  if (score >= 65) return "text-blue-500";
  if (score >= 50) return "text-yellow-500";
  if (score >= 30) return "text-orange-500";
  return "text-red-500";
};

const getQualityText = (score: number) => {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Good";
  if (score >= 50) return "Fair";
  if (score >= 30) return "Needs Work";
  return "Poor";
};

const getQualityBadgeClass = (score: number) => {
  if (score >= 80) return "bg-green-100 text-green-700 border border-green-700";
  if (score >= 65) return "bg-blue-100 text-blue-700 border border-blue-700";
  if (score >= 50)
    return "bg-yellow-100 text-yellow-700 border border-yellow-700";
  if (score >= 30)
    return "bg-orange-100 text-orange-700 border border-orange-700";
  return "bg-red-100 text-red-700 border border-red-700";
};
</script>

<style scoped>
/* Animation for score display */
.score-display {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
