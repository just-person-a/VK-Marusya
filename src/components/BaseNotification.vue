<template>
  <div :class="[
    'notification',
    {
      'notification--error': notification.notificationStatus === 'error',
      'notification--shown': notification.isNotificationShown,
      'notification--hidden': !notification.isNotificationShown
    }
  ]" @click="notification.hideNotification()" @mouseenter="pauseTimer" @mouseleave="playTimer">
    <span class="notification__text">
      {{ notification.notificationText }}
    </span>

    <div class="notification__timer" :style="{ transform: `scaleX(${timerProgress / 100})` }"></div>
  </div>
</template>

<script setup lang="ts">
  import { onUnmounted, ref, watch } from 'vue';
  import { useNotificationStore } from '@/stores/notification';

  const notification = useNotificationStore();

  const timerProgress = ref<number>(100);
  let timerInterval: ReturnType<typeof setInterval>;

  const pauseTimer = () => {
    clearInterval(timerInterval);
  };

  const playTimer = () => {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      timerProgress.value -= 0.15;

      if (timerProgress.value <= 0) {
        clearInterval(timerInterval);

        notification.hideNotification();

        setTimeout(() => {
          timerProgress.value = 100;
        }, 300);
      };
    }, 20);
  };

  watch(() => notification.isNotificationShown, () => {
    if (notification.isNotificationShown) {
      setTimeout(() => {
        playTimer();
      }, 300);
    } else {
      setTimeout(() => {
        pauseTimer();

        timerProgress.value = 100;
      }, 300);
    }
  });

  onUnmounted(() => {
    clearInterval(timerInterval);
  });
</script>

<style scoped lang="scss">
  .notification {
    position: fixed;
    right: 40px;
    bottom: 40px;
    display: flex;
    align-items: center;
    overflow: hidden;
    width: calc(100% - 40px);
    max-width: 410px;
    background-color: vars.$color-gray;
    border: 1px solid vars.$color-black-transparent-40;
    border-radius: 8px;
    padding: 15px 20px 30px;
    transform: translateY(-200%);
    transition: border-color vars.$transition-300;
    cursor: pointer;
    z-index: 20;

    @include mixins.vp-767 {
      right: 20px;
      bottom: 20px;
    }

    &:hover,
    &:focus-visible {
      border-color: vars.$color-purple-light;

      .notification__text {
        color: vars.$color-purple-light;
      }
    }

    &:active {
      border-color: vars.$color-purple;

      .notification__text {
        color: vars.$color-purple;
      }
    }

    &--error {
      border-color: vars.$color-error;

      .notification__text {
        color: vars.$color-error;
      }
    }

    &--shown {
      animation: notificationSlideInUp vars.$transition-500 forwards;
    }

    &--hidden {
      animation: notificationSlideOutDown vars.$transition-500 forwards;
    }

    &__text {
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      transition: color vars.$transition-300;
    }

    &__timer {
      position: absolute;
      left: 20px;
      bottom: 15px;
      width: calc(100% - 40px);
      height: 1.5px;
      background-color: vars.$color-pink;
      transform-origin: left;
    }
  }

  @keyframes notificationSlideInUp {
    0% {
      opacity: 0;
      transform: translateY(200%) scale(0);
    }

    10% {
      opacity: 1;
      transform: translateY(200%) scale(1);
    }

    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes notificationSlideOutDown {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    90% {
      opacity: 1;
      transform: translateY(200%) scale(1);
    }

    100% {
      opacity: 0;
      transform: translateY(200%) scale(0);
    }
  }
</style>
