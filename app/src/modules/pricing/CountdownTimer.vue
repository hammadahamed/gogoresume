<!-- CountdownTimer.vue -->
<template>
  <div class="countdown-timer" style="padding-bottom: 30px !important">
    <div class="countdown-container">
      <div class="countdown-header">
        <span class="countdown-title" style="padding-bottom: 0px !important"
          >Offer ends in</span
        >
      </div>

      <div class="countdown-display">
        <div class="time-unit">
          <div class="time-value">{{ timeLeft.days }}</div>
          <div class="time-label">days</div>
        </div>

        <div class="time-separator">:</div>

        <div class="time-unit">
          <div class="time-value">{{ timeLeft.hours }}</div>
          <div class="time-label">hrs</div>
        </div>

        <div class="time-separator">:</div>

        <div class="time-unit">
          <div class="time-value">{{ timeLeft.minutes }}</div>
          <div class="time-label">min</div>
        </div>

        <div class="time-separator">:</div>

        <div class="time-unit">
          <div class="time-value">{{ timeLeft.seconds }}</div>
          <div class="time-label">sec</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const props = defineProps<{
  endDate?: string; // ISO date string, defaults to 7 days from now
}>();

const timeLeft = ref<TimeLeft>({
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
});

let interval: NodeJS.Timeout | null = null;
let targetEndDate: Date | null = null;

const getEndDate = (): Date => {
  if (targetEndDate) {
    return targetEndDate;
  }

  if (props.endDate) {
    targetEndDate = new Date(props.endDate);
  } else {
    // Default to 7 days from now
    const now = new Date();
    targetEndDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  }

  return targetEndDate;
};

const updateCountdown = () => {
  const now = new Date().getTime();
  const endTime = getEndDate().getTime();
  const difference = endTime - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timeLeft.value = {
      days: days.toString().padStart(2, "0"),
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  } else {
    // Timer expired
    timeLeft.value = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
    if (interval) {
      clearInterval(interval);
    }
  }
};

onMounted(() => {
  updateCountdown();
  interval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<style lang="scss" scoped>
.countdown-timer {
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 24px;
  text-align: center;
  background: #fafafa;
  border: 1px solid #e5e7eb;
}

.countdown-container {
  position: relative;
}

.countdown-header {
  margin-bottom: 16px;
}

.countdown-title {
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  letter-spacing: 0.3px;
}

.countdown-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.time-value {
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
  color: #111827;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.5px;
}

.time-label {
  font-size: 11px;
  color: #9ca3af;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.time-separator {
  font-size: 24px;
  font-weight: 600;
  color: #d1d5db;
  margin: 0 2px;
  align-self: flex-start;
  margin-top: 2px;

  @media (max-width: 640px) {
    display: none;
  }
}

@media (max-width: 768px) {
  .countdown-timer {
    padding: 16px 20px;
    margin-bottom: 20px;
  }

  .countdown-title {
    font-size: 12px;
  }

  .countdown-display {
    gap: 10px;
  }

  .time-value {
    font-size: 24px;
  }

  .time-label {
    font-size: 10px;
  }

  .time-separator {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .countdown-timer {
    padding: 14px 16px;
  }

  .countdown-title {
    font-size: 11px;
  }

  .time-value {
    font-size: 22px;
  }

  .time-label {
    font-size: 9px;
  }
}
</style>
