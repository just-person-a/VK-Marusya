<template>
  <div v-if="movie" :class="['movie-about', { 'movie-about--main': router.name === 'main' }]">
    <div class="movie-about__info">
      <div class="movie-about__top">
        <BaseRating :rating="movie?.tmdbRating"></BaseRating>

        <span class="movie-about__year">
          {{ movie.releaseYear }}
        </span>

        <span class="movie-about__genres">
          <span class="movie-about__genres-full">
            {{ movie.genres.slice(0, 4).join(', ') }}
          </span>

          <span class="movie-about__genres-short">
            {{ movie.genres.slice(0, 1).join(', ') }}
          </span>
        </span>

        <span class="movie-about__timing">
          {{ `${Math.floor(movie.runtime / 60)} ч ${movie.runtime % 60} мин` }}
        </span>
      </div>

      <h2 class="movie-about__title">
        {{ movie.title }}
      </h2>

      <p class="movie-about__plot">
        {{ moviePlot }}
      </p>

      <div class="movie-about__buttons">
        <BaseButton ref="trailerButton" class="btn--light movie-about__trailer-btn" text="Трейлер" type="button"
          @click="switchTrailerShowing">
        </BaseButton>

        <BaseButton v-if="router.name === 'main'" class="movie-about__about-btn" text="О фильме" type="button"
          :to="`/movie/${movie.id}`">
        </BaseButton>

        <BaseButton :class="['btn--small', { 'btn--colored-icon': isMovieFavorite }]"
          :iconName="isMovieFavorite ? 'icon-favorite-filled' : 'icon-favorite'" :iconWidth="24" :iconHeight="24"
          aria-label="Добавить фильм в избранное" @click="switchFavorite"></BaseButton>

        <BaseButton v-if="router.name === 'main'" class="btn--small" iconName="icon-refresh" :iconWidth="24"
          :iconHeight="24" aria-label="Обновить фильм" @click="emits('refreshMovie')"></BaseButton>
      </div>
    </div>

    <div class="movie-about__poster-container">
      <img class="movie-about__poster" :src="movie.backdropUrl || movie.posterUrl || stubPoster" alt="Постер фильма">
    </div>

    <BaseTrailer :movie="movie" :isTrailerShown="isTrailerShown" @switchTrailerShowing="switchTrailerShowing">
    </BaseTrailer>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import BaseRating from './BaseRating.vue';
  import BaseButton from './BaseButton.vue';
  import BaseTrailer from './BaseTrailer.vue';
  import { useAuthStore } from '@/stores/auth.ts';
  import { useUserStore } from '@/stores/user.ts';
  import { useFavoritesStore } from '@/stores/favorites.ts';
  import stubPoster from '@/assets/images/image-stub-poster-horizontal.jpg';
  import type IMovie from '@/types/Movie';

  const router = useRoute();

  const props = defineProps<{
    movie: IMovie | undefined,
  }>();

  const emits = defineEmits<{
    (name: 'refreshMovie'): void,
  }>();

  const auth = useAuthStore();
  const user = useUserStore();
  const favorites = useFavoritesStore();

  const trailerButton = ref<InstanceType<typeof BaseButton> | null>(null);
  const isTrailerShown = ref<boolean>(false);

  const moviePlot = computed(() => {
    if (props.movie) {
      if (props.movie.plot.split(' ').length > 60) {
        const shortPlot = props.movie.plot.split(' ').slice(0, 60).join(' ');
        return shortPlot.slice(0, shortPlot.lastIndexOf('.') + 1);
      };

      return props.movie.plot;
    };

    return '';
  });

  const isMovieFavorite = computed(() => {
    if (auth.isAuthorized) {
      if (props.movie) {
        return user.userInfo?.favorites.includes(`${props.movie.id}`);
      };
    };

    return false;
  });

  const switchTrailerShowing = () => {
    isTrailerShown.value = !isTrailerShown.value;

    if (!isTrailerShown.value) {
      trailerButton.value?.focus();
    };
  };

  const switchFavorite = async () => {
    if (auth.isAuthorized) {
      if (props.movie) {
        if (user.userInfo?.favorites.includes(`${props.movie.id}`)) {
          await favorites.removeFavorite(props.movie.id);
        }
        else {
          await favorites.addFavorite(props.movie.id);
        };

        user.updateUserInfo();
      };
    }
    else {
      auth.requestLogin();
    };
  };
</script>

<style scoped lang="scss">
  .movie-about {
    display: flex;
    gap: 30px;

    @media (max-width: 949px) {
      flex-direction: column-reverse;
    }

    @include mixins.vp-767 {
      gap: 24px;
    }

    &--main {
      & .movie-about__buttons {
        @include mixins.vp-1359 {
          flex-wrap: wrap;
        }
      }

      & .movie-about__trailer-btn {
        @include mixins.vp-1359 {
          width: 100%;
        }

        @media (max-width: 949px) {
          width: unset;
        }

        @media (max-width: 579px) {
          width: 100%;
        }
      }

      & .movie-about__poster {
        @media (max-width: 579px) {
          height: 234px;
        }
      }
    }

    &__info {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 570px;
      transform: translateY(-24px);

      @media (max-width: 1439px) {
        width: 100%;
        max-width: 650px;
      }

      @media (max-width: 949px) {
        max-width: unset;
        transform: translateY(0);
      }
    }

    &__top {
      display: flex;
      align-items: center;
      gap: 16px;
      margin: 0 0 16px;

      @include mixins.vp-767 {
        margin: 0 0 12px;
      }
    }

    &__year,
    &__genres,
    &__timing {
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      color: vars.$color-white-transparent-70;

      @include mixins.vp-1359 {
        font-size: 16px;
        line-height: 22px;
      }

      @include mixins.vp-767 {
        font-size: 13px;
        line-height: 20px;
      }
    }

    &__genres-full {
      @media (max-width: 1109px) {
        display: none;
      }
    }

    &__genres-short {
      display: none;

      @media (max-width: 1109px) {
        display: inline;
      }
    }

    &__title {
      font-size: 48px;
      font-weight: 700;
      line-height: 56px;
      color: vars.$color-white;
      margin: 0 0 16px;

      @include mixins.vp-1359 {
        font-size: 36px;
        line-height: 42px;
      }

      @include mixins.vp-1023 {
        font-size: 30px;
        line-height: 36px;
      }

      @include mixins.vp-767 {
        font-size: 24px;
        line-height: 32px;
        margin: 0 0 12px;
      }
    }

    &__plot {
      font-size: 24px;
      font-weight: 400;
      line-height: 32px;
      color: vars.$color-white-transparent-70;
      margin: 0 0 60px;

      @include mixins.vp-1359 {
        font-size: 22px;
        line-height: 28px;
        margin: 0 0 44px;
      }

      @include mixins.vp-1023 {
        font-size: 20px;
        line-height: 24px;
      }

      @media (max-width: 949px) {
        margin: 0 0 32px;
      }

      @include mixins.vp-767 {
        font-size: 18px;
        line-height: 24px;
      }
    }

    &__buttons {
      display: flex;
      gap: 14px;
    }

    &__trailer-btn {
      @media (max-width: 579px) {
        width: 100%;
      }
    }

    &__about-btn {
      @include mixins.vp-1359 {
        width: calc(100% - 2 * (68px + 16px));
      }

      @media (max-width: 949px) {
        width: unset;
      }

      @media (max-width: 579px) {
        width: calc(100% - 2 * (68px + 16px));
        padding: 16px 38px;
      }
    }

    &__poster-container {
      display: flex;
      justify-content: center;
      width: 680px;

      @media (max-width: 1439px) {
        width: 600px;
      }

      @media (max-width: 1169px) {
        width: 500px;
      }

      @include mixins.vp-1023 {
        width: 450px;
      }

      @media (max-width: 949px) {
        width: 100%;
      }
    }

    &__poster {
      max-width: 680px;
      height: 552px;
      border-radius: 16px;

      @media (max-width: 1439px) {
        width: 600px;
        height: 488px;
      }

      @media (max-width: 1169px) {
        width: 500px;
      }

      @include mixins.vp-1023 {
        width: 450px;
        height: 365px;
      }

      @media (max-width: 949px) {
        width: 100%;
      }

      @media (max-width: 579px) {
        height: 260px;
      }
    }
  }
</style>
