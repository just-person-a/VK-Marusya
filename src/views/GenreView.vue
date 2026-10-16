<template>
  <section class="genre">
    <div class="container">
      <div class="genre__wrapper">
        <RouterLink class="genre__back" to="/genres">
          <svg class="genre__back-icon" width="40" height="40" aria-hidden="true">
            <use xlink:href="@/assets/images/sprite.svg#icon-arrow-back"></use>
          </svg>

          <h1 class="genre__heading">
            {{ `${genreName.slice(0, 1).toLocaleUpperCase()}${genreName.slice(1)}` }}
          </h1>
        </RouterLink>

        <ul v-if="movies.moviesByGenre.length > 0" class="genre__list">
          <li class="genre__item" v-for="movie of movies.moviesByGenre" :key="movie.id">
            <RouterLink :to="`/movie/${movie.id}`">
              <BaseMovieCard :class="{ 'movie-card--big': screenWidth <= 767 }"
                :posterUrl="movie.posterUrl || stubPoster"></BaseMovieCard>
            </RouterLink>
          </li>
        </ul>

        <div v-if="!movies.isMoviesByGenreLoaded" class="loader-container">
          <BaseLoader></BaseLoader>
        </div>

        <BaseButton v-if="!isAllMoviesLoaded && movies.isMoviesByGenreLoaded" class="btn--light genre__btn"
          text="Показать ещё" type="button" @click="loadMoreMovies">
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { RouterLink, useRoute } from 'vue-router';
  import { useMoviesStore } from '@/stores/movies';
  import { useWindowSize } from '@/composables/windowSize';
  import BaseMovieCard from '@/components/BaseMovieCard.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import BaseLoader from '@/components/BaseLoader.vue';
  import stubPosterFile from '@/assets/images/image-stub-poster-vertical.jpg';

  const route = useRoute();
  const movies = useMoviesStore();
  const { screenWidth } = useWindowSize();

  const stubPoster: string = stubPosterFile;

  const isAllMoviesLoaded = ref<boolean>(false);
  const moviesForLoadingCount: number = 50;

  const genreName = computed(() => {
    if (route.params?.name && !Array.isArray(route.params.name)) {
      return route.params.name;
    };

    return '';
  });

  const nextPage = computed(() => Math.ceil(movies.moviesByGenre.length / moviesForLoadingCount));

  const loadMoreMovies = async () => {
    const oldMoviesCount = movies.moviesByGenre.length;
    await movies.loadMoviesByGenre(genreName.value, moviesForLoadingCount, nextPage.value);

    setTimeout(() => {
      const newMoviesCount = movies.moviesByGenre.length;

      if (newMoviesCount - oldMoviesCount < movies.moviesByGenreForShowingCount) {
        isAllMoviesLoaded.value = true;
      };
    }, 1000);
  };

  onMounted(() => {
    movies.loadMoviesByGenre(genreName.value, moviesForLoadingCount, 0);
  });
</script>

<style scoped lang="scss">
  .genre {
    &__wrapper {
      display: flex;
      flex-direction: column;
      padding: 64px 0 160px;

      @include mixins.vp-1023 {
        padding: 64px 0;
      }

      @include mixins.vp-767 {
        padding: 16px 0 40px;
      }
    }

    &__back {
      display: flex;
      align-items: center;
      align-self: flex-start;
      gap: 16px;
      outline: none;
      margin: 0 0 64px;

      @include mixins.vp-1023 {
        gap: 8px;
      }

      @include mixins.vp-767 {
        margin: 0 0 40px;

        &:hover .genre__back-icon,
        &:focus-visible .genre__back-icon {
          transform: translateX(-6px);
        }
      }

      &:hover .genre__back-icon,
      &:focus-visible .genre__back-icon {
        transform: translateX(-10px);
      }

      &:active .genre__back-icon {
        transform: translateX(0);
      }
    }

    &__back-icon {
      width: 40px;
      height: 40px;
      color: vars.$color-white;
      transition: transform vars.$transition-300;

      @include mixins.vp-1359 {
        width: 36px;
        height: 36px;
      }

      @include mixins.vp-1023 {
        width: 32px;
        height: 32px;
      }
    }

    &__heading {
      font-size: 48px;
      font-weight: 700;
      line-height: 56px;
      color: vars.$color-white;
      margin: 0;

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
      }
    }

    &__list {
      @include mixins.list-params-unset;
      display: grid;
      grid-template-columns: repeat(5, 224px);
      gap: 64px 40px;
      margin: 0 0 64px;

      @media (max-width: 1439px) {
        display: flex;
        justify-content: space-evenly;
        gap: 40px;
        flex-wrap: wrap;
      }

      @include mixins.vp-767 {
        gap: 24px;
        margin: 0 0 40px;
      }
    }

    &__item {
      transition: transform vars.$transition-300;

      &:hover,
      &:focus-visible {
        transform: scale(1.05);
      }

      &:active {
        transform: scale(1);
      }
    }

    &__btn {
      align-self: center;

      @media (max-width: 376px) {
        width: 100%;
      }
    }
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 250px;
    padding: 0 0 50px;
  }
</style>
