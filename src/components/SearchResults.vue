<template>
  <div class="search-results">
    <ul class="search-results__list">
      <li v-for="movie of movies.moviesByTitle" :key="movie.id" class="search-results__item">
        <RouterLink class="search-results__link" :to="`/movie/${movie.id}`"
          @click="emits('clearSearch'); emits('hideSearch')">
          <img class="search-results__poster" :src="movie.posterUrl || stubPoster" alt="Постер фильма">

          <div class="search-results__info">
            <div class="search-results__top">
              <BaseRating class="rating--small" :rating="movie.tmdbRating"></BaseRating>

              <span class="search-results__year">
                {{ movie.releaseYear }}
              </span>

              <span class="search-results__genres">
                {{ movie.genres.slice(0, 4).join(', ') }}
              </span>

              <span class="search-results__timing">
                {{ `${Math.floor(movie.runtime / 60)} ч ${movie.runtime % 60} мин` }}
              </span>
            </div>

            <h3 class="search-results__title">
              {{ movie.title }}
            </h3>
          </div>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import BaseRating from './BaseRating.vue';
  import { useMoviesStore } from '@/stores/movies.ts';
  import stubPoster from '@/assets/images/image-stub-poster-vertical.jpg';

  const emits = defineEmits<{
    (name: 'clearSearch'): void,
    (name: 'hideSearch'): void,
  }>();

  const movies = useMoviesStore();
</script>

<style scoped lang="scss">
  .search-results {
    min-width: 560px;
    border-radius: 8px;
    background-color: vars.$color-gray;
    padding: 8px;

    @include mixins.vp-767 {
      min-width: unset;
      width: calc(100vw - 40px);
      padding: 24px 20px;
    }

    &__list {
      @include mixins.list-params-unset;
      display: flex;
      flex-direction: column;
      width: 100%;

      @include mixins.vp-767 {
        flex-direction: row;
        gap: 16px;
        overflow: scroll;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }

    &__item {
      width: 100%;
      border-radius: 6px;

      @include mixins.vp-767 {
        width: 220px;
      }
    }

    &__link {
      display: flex;
      align-items: center;
      gap: 16px;
      width: 100%;
      border-radius: 6px;
      outline-color: transparent;
      padding: 20px 8px;
      transition: outline vars.$transition-300;

      @include mixins.vp-767 {
        flex-direction: column;
        align-items: flex-start;
        width: 220px;
        outline: none;
        padding: 0;
      }

      &:hover,
      &:focus-visible {
        outline: 1px solid vars.$color-white-transparent-50;

        @include mixins.vp-767 {
          outline: none;
        }
      }

      &:active {
        outline-color: vars.$color-purple-light;

        @include mixins.vp-767 {
          outline: none;
        }
      }
    }

    &__poster {
      width: 40px;
      height: 52px;

      @include mixins.vp-767 {
        width: 158px;
        height: 206px;
      }
    }

    &__info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &__top {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    &__year,
    &__genres,
    &__timing {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: vars.$color-white-transparent-70;
    }

    &__title {
      font-size: 18px;
      font-weight: 700;
      line-height: 24px;
      color: vars.$color-white;
      margin: 0;
    }
  }
</style>
