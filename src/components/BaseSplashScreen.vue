<template>
  <div :class="['splash-screen', { 'splash-screen--hidden': hiddenClass }]">
    <div class="splash-screen__wrapper">
      <svg class="splash-screen__icon" width="44" height="56" aria-hidden="true">
        <use :xlink:href="`${sprite}#splash-screen-marusya-icon`"></use>
      </svg>

      <div class="splash-screen__text-wrapper">
        <svg class="splash-screen__text" width="175" height="37" aria-hidden="true">
          <use :xlink:href="`${sprite}#splash-screen-marusya-text`"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import sprite from '@/assets/images/sprite.svg';
  import { ref, watchEffect } from 'vue';

  const props = defineProps<{
    isInfoLoaded: boolean,
  }>();

  const hiddenClass = ref<boolean>(false);

  watchEffect(() => {
    if (props.isInfoLoaded) {
      setTimeout(() => {
        hiddenClass.value = true;
      }, 2000);
    };
  });
</script>

<style scoped lang="scss">
  .splash-screen {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: vars.$color-white;
    opacity: 1;
    z-index: 999;

    &--hidden {
      animation: splashScreenFadeOut vars.$transition-300 0.6s forwards;

      .splash-screen__icon {
        transform: translateY(0);
        opacity: 1;
        animation: iconSlideFadeOut vars.$transition-800 0s forwards,
      }

      .splash-screen__text-wrapper {
        transform: translateX(0);
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        animation: textSlideClipOut vars.$transition-800 0s forwards;
      }
    }

    &__wrapper {
      display: flex;
      align-items: flex-start;
    }

    &__icon {
      transform: translateY(100%);
      opacity: 0;
      animation: iconSlideFadeIn vars.$transition-800 forwards;
      z-index: 10;
    }

    &__text-wrapper {
      padding: 15px 0 0 21px;
      transform: translateX(-200px);
      clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
      animation: textSlideClipIn vars.$transition-800 0.9s forwards;
      z-index: 0;
    }
  }

  @keyframes iconSlideFadeIn {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes textSlideClipIn {
    0% {
      transform: translateX(-200px);
      clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
    }

    100% {
      transform: translateX(0);
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }
  }

  @keyframes iconSlideFadeOut {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(240px);
    }
  }

  @keyframes textSlideClipOut {
    0% {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    }

    100% {
      clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
    }
  }

  @keyframes splashScreenFadeOut {
    0% {
      display: flex;
      opacity: 1;
    }

    95% {
      display: flex;
      opacity: 0;
    }

    100% {
      display: none;
      opacity: 0;
    }
  }
</style>
