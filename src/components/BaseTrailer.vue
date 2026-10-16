<template>
  <div :class="['trailer', { 'trailer--shown': shownClass, 'trailer--hidden': hiddenClass }]">
    <div class="trailer__wrapper">
      <div class="trailer__player">
        <div :class="['trailer__video', { 'trailer__video--hidden': playingStatus === -1 || playingStatus === 3 }]">
          <div ref="playerElement"></div>
        </div>

        <div v-if="playingStatus !== -1 && playingStatus !== 3" class="trailer__player-layer"
          @click="switchPlayingStatus()">
          <img :class="['trailer__poster', { 'trailer__poster--hidden': playingStatus === 1 }]"
            :src="movie.backdropUrl || stubTrailer" alt="Постер фильма">

          <BaseButton
            :class="['trailer__play-btn', 'btn--play', { 'trailer__play-btn--hidden': playingStatus === 4 }]"
            type="button" :iconName="playingStatus === 1 ? 'icon-pause' : 'icon-play'" :iconWidth="40" :iconHeight="40"
            aria-label="Остановить/запустить трейлер фильма" @click.stop="switchPlayingStatus()">
          </BaseButton>

          <span :class="['trailer__title', { 'trailer__title--hidden': playingStatus === 1 }]">
            {{ playingStatus === 4 ? 'Не удалось загрузить трейлер.' : movie.title }}
          </span>
        </div>

        <div v-else class="loader-container">
          <BaseLoader></BaseLoader>
        </div>
      </div>

      <BaseButton ref="closeButton" class="trailer__close-btn btn--close" type="button"
        :iconName="screenWidth >= 1023 ? 'icon-cross' : 'icon-cross-small'" :iconWidth="24" :iconHeight="24"
        aria-label="Закрыть трейлер фильма" @click="emits('switchTrailerShowing'), stopTrailerPlaying()"></BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import BaseButton from './BaseButton.vue';
  import BaseLoader from './BaseLoader.vue';
  import { useWindowSize } from '@/composables/windowSize.ts';
  import YouTubePlayer from 'youtube-player';
  import stubTrailer from '@/assets/images/image-stub-trailer-horizontal.jpg';
  import type IMovie from '@/types/Movie.ts';

  const props = defineProps<{
    movie: IMovie,
    isTrailerShown: boolean,
  }>();

  const emits = defineEmits<{
    (name: 'switchTrailerShowing'): void,
  }>();

  const { screenWidth } = useWindowSize();

  let player: ReturnType<typeof YouTubePlayer> | null = null;
  const playerElement = ref<HTMLDivElement | null>(null);
  const playingStatus = ref<number>(-1);
  let playingTimeout: number | undefined;

  const closeButton = ref<InstanceType<typeof BaseButton> | null>(null);
  const shownClass = ref<boolean>(false);
  const hiddenClass = ref<boolean>(false);

  const switchPlayingStatus = async () => {
    if (player) {
      if (playingStatus.value === 1) {
        await player.pauseVideo();
      }
      else {
        await player.playVideo();
      };
    }
  };

  const stopTrailerPlaying = () => {
    let currentVolume = 100;

    const volumeInterval = setInterval(async () => {
      if (player) {
        await player.setVolume(currentVolume);
        currentVolume--;
      };
    }, 10);

    setTimeout(async () => {
      clearInterval(volumeInterval);

      if (player) {
        await player.stopVideo();
        await player.setVolume(100);
      };
    }, 1000);
  };

  const initPlayer = () => {
    if (!playerElement.value) {
      return;
    };

    player = YouTubePlayer(playerElement.value, {
      videoId: props.movie.trailerYouTubeId,
      width: 960,
      height: 540,
      playerVars: {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        fs: 0,
        iv_load_policy: 3,
        disablekb: 1,
        playsinline: 1,
      }
    });

    player.on('stateChange', async (event) => {
      playingStatus.value = event.data;

      if (event.data === 0) {
        if (player) {
          await player.stopVideo();
        };
      }
      else if (event.data === 1) {
        clearTimeout(playingTimeout);
      };
    });
  };

  watch(() => props.isTrailerShown, async () => {
    if (props.isTrailerShown) {
      initPlayer();

      closeButton.value?.focus();

      shownClass.value = true;

      playingTimeout = setTimeout(() => {
        playingStatus.value = 4;
      }, 5000);

      if (player) {
        await player.playVideo();
      };
    }
    else {
      shownClass.value = false;
      hiddenClass.value = true;

      setTimeout(async () => {
        if (player) {
          await player.destroy();
          player = null;
        };

        playingStatus.value = -1;
        hiddenClass.value = false;
      }, 1000);
    };
  });
</script>

<style scoped lang="scss">
  .trailer {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    opacity: 0;
    z-index: 10;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 100vw;
      height: 100vh;
      background-color: transparent;
      z-index: 0;
    }

    &--shown {
      pointer-events: all;
      opacity: 1;
      transition: opacity vars.$transition-100;

      &::before {
        background-color: vars.$color-black-glass-transparent-90;
        transition: background-color vars.$transition-800 0.1s;
      }

      & .trailer__wrapper {
        transform: translateY(0);
        transition: transform vars.$transition-800 0.1s;
      }
    }

    &--hidden {
      pointer-events: none;
      opacity: 0;
      transition: opacity vars.$transition-100 0.8s;

      &::before {
        background-color: transparent;
        transition: background-color vars.$transition-800;
      }

      & .trailer__wrapper {
        transform: translateY(100vh);
        transition: transform vars.$transition-800;
      }
    }

    &__wrapper {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 960px;
      height: 540px;
      transform: translateY(-100vh);
      z-index: 10;

      @media (max-width: 1169px) {
        width: 800px;
        height: 450px;
      }

      @include mixins.vp-1023 {
        width: 663px;
        height: 375px;
      }

      @include mixins.vp-767 {
        width: 375px;
        height: 212px;
      }
    }

    &__player {
      width: 960px;
      height: 540px;
      outline: 1px solid vars.$color-white-transparent-50;
      background-color: vars.$color-gray;
      overflow: hidden;

      @media (max-width: 1169px) {
        width: 800px;
        height: 450px;
      }

      @include mixins.vp-1023 {
        width: 663px;
        height: 375px;
        outline: none;
      }

      @include mixins.vp-767 {
        width: 375px;
        height: 212px;
      }
    }

    &__video {
      width: 100%;
      height: 100%;
      opacity: 1;

      & :deep(iframe) {
        width: 100%;
        height: 100%;
      }

      &--hidden {
        opacity: 0;
      }
    }

    &__player-layer {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      cursor: pointer;

      &:hover,
      &:focus-visible {
        &>.trailer__play-btn {
          opacity: 1;
          transition-delay: 0s;
        }
      }

    }

    &__poster {
      width: 960px;
      object-fit: cover;
      pointer-events: none;
      opacity: 1;

      &--hidden {
        opacity: 0;
      }

      @media (max-width: 1169px) {
        width: 800px;
      }

      @include mixins.vp-1023 {
        width: 663px;
      }

      @include mixins.vp-767 {
        width: 375px;
      }
    }

    &__play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
      transition: opacity vars.$transition-300 4.2s;

      &--hidden {
        display: none;
      }
    }

    &__title {
      position: absolute;
      bottom: 24px;
      left: 20px;
      right: 20px;
      display: block;
      background-color: vars.$color-black-transparent-50;
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      padding: 24px 40px;
      opacity: 1;

      &--hidden {
        opacity: 0;
      }

      @include mixins.vp-1023 {
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 18px;
        line-height: 24px;
      }

      @include mixins.vp-767 {
        transform: translateY(100%);
      }
    }

    &__close-btn {
      position: absolute;
      top: 0;
      right: -72px;

      @include mixins.vp-1023 {
        top: 16px;
        right: 16px;
        padding: 4px;
      }

      @include mixins.vp-767 {
        top: 8px;
        right: 8px;
      }
    }
  }

  .loader-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
