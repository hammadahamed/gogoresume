<!-- CountdownTimer.vue -->
<template>
  <div class="countdown-timer border-gray-200">
    <div class="countdown-container">
      <div class="countdown-header">
        <h3 class="countdown-title">Launch Offer Ends in 🥳</h3>
      </div>

      <div class="countdown-display">
        <div class="time-unit">
          <div class="time-value">{{ timeLeft.days }}</div>
          <div class="time-label">Days</div>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
          <div class="time-value">{{ timeLeft.hours }}</div>
          <div class="time-label">Hours</div>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
          <div class="time-value">{{ timeLeft.minutes }}</div>
          <div class="time-label">Minutes</div>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
          <div class="time-value">{{ timeLeft.seconds }}</div>
          <div class="time-label">Seconds</div>
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
  padding: 24px;
  margin-bottom: 32px;
  text-align: center;
  position: relative;
  overflow: hidden;

  //   // Corner decorations - more prominent
  //   &::before {
  //     content: "";
  //     position: absolute;
  //     top: -20px;
  //     left: -20px;
  //     width: 80px;
  //     height: 80px;
  //     background: rgba(124, 58, 237, 0.1);
  //     border-radius: 50%;
  //     z-index: 0;
  //   }

  //   &::after {
  //     content: "";
  //     position: absolute;
  //     bottom: -25px;
  //     right: -25px;
  //     width: 100px;
  //     height: 100px;
  //     background: rgba(59, 130, 246, 0.08);
  //     border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  //     z-index: 0;
  //   }

  //   // Additional decorative elements
  //   .countdown-container::before {
  //     content: "";
  //     position: absolute;
  //     top: 10px;
  //     right: 20px;
  //     width: 30px;
  //     height: 30px;
  //     background: rgba(236, 72, 153, 0.06);
  //     border-radius: 6px;
  //     transform: rotate(12deg);
  //     z-index: 0;
  //   }

  //   .countdown-container::after {
  //     content: "";
  //     position: absolute;
  //     bottom: 15px;
  //     left: 25px;
  //     width: 20px;
  //     height: 20px;
  //     background: rgba(168, 85, 247, 0.07);
  //     border-radius: 50%;
  //     z-index: 0;
  //   }
}

.countdown-container {
  color: #333;
  position: relative;
  z-index: 1;
}

.countdown-header {
  margin-bottom: 16px;
}

.countdown-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 6px 0;
  color: #111827;
}

.countdown-subtitle {
  font-size: 15px;
  margin: 0;
  color: #6b7280;
  font-weight: 500;
}

.countdown-display {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.time-unit {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 16px;
  min-width: 70px;
}

.time-value {
  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
  color: #111827;
}

.time-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7280;
  font-weight: 600;
}

.time-separator {
  font-size: 20px;
  font-weight: 700;
  color: #9ca3af;

  @media (max-width: 640px) {
    display: none;
  }
}

.countdown-message {
  p {
    margin: 0;
    font-size: 15px;
    color: #374151;
    font-weight: 500;

    strong {
      font-weight: 700;
      color: #7c3aed;
    }
  }
}

@media (max-width: 768px) {
  .countdown-timer {
    padding: 16px;
    margin-bottom: 24px;
  }

  .countdown-title {
    font-size: 16px;
  }

  .countdown-display {
    gap: 10px;
  }

  .time-unit {
    padding: 6px 10px;
    min-width: 50px;
  }

  .time-value {
    font-size: 18px;
  }

  .time-label {
    font-size: 9px;
  }
}

.countdown-display {
  gap: 8px;
}

.time-unit {
  padding: 6px 8px;
  min-width: 45px;
}

.time-value {
  font-size: 18px;
}
</style>
