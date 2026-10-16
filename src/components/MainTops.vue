<template>
  <section class="tops">
    <div class="container">
      <div class="tops__wrapper">
        <h2 class="tops__heading">
          Топ 10 фильмов
        </h2>

        <div class="tops__scroll">
          <ul class="tops__list">
            <li v-for="movie of moviesTop" :key="movie.id" class="tops__item">
              <RouterLink :to="`/movie/${movie.id}`">
                <BaseMovieCard :poster-url="movie.posterUrl || stubPoster"></BaseMovieCard>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import BaseMovieCard from './BaseMovieCard.vue';
  import stubPoster from '@/assets/images/image-stub-poster-vertical.jpg';
  import type IMovieTop from '@/types/MovieBrief';

  defineProps<{
    moviesTop: IMovieTop[];
  }>();
</script>

<style scoped lang="scss">
  .tops {
    &__wrapper {
      display: flex;
      flex-direction: column;
      gap: 64px;
      padding: 40px 0 120px;

      @include mixins.vp-1023 {
        padding: 40px 0 60px;
      }

      @include mixins.vp-767 {
        gap: 40px;
        padding: 56px 0 32px;
      }
    }

    &__heading {
      font-size: 40px;
      font-weight: 700;
      line-height: 48px;
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

    &__scroll {
      @include mixins.vp-767 {
        overflow-x: auto;
        overflow-y: visible;
        padding: 100px 20px;
        margin: -100px -20px;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }

    &__list {
      @include mixins.list-params-unset;
      counter-reset: curcounter;
      display: grid;
      grid-template-columns: repeat(5, 224px);
      gap: 64px 40px;

      @media (max-width: 1439px) {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        gap: 40px;
      }

      @include mixins.vp-767 {
        width: max-content;
      }
    }

    &__item {
      counter-increment: curcounter;
      position: relative;
      transition: transform vars.$transition-300;

      &:hover,
      &:focus-visible {
        transform: scale(1.05);
      }

      &:active {
        transform: scale(1);
      }

      &::before {
        content: counter(curcounter);
        position: absolute;
        top: -12px;
        left: -12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: 700;
        line-height: 32px;
        color: vars.$color-purple;
        background-color: vars.$color-white;
        border-radius: 50px;
        padding: 8px 24px;
      }
    }
  }

</style>
