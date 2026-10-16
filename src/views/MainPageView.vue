<template>
  <h1 class="visually-hidden">Главная страница VK-Маруся</h1>

  <MainHero v-if="movies.isRandomMovieLoaded" :movie="movies.randomMovie" @refreshMovie="refreshMovie"></MainHero>

  <div v-else class="loader-container">
    <BaseLoader></BaseLoader>
  </div>

  <MainTops v-if="movies.isMovieTopLoaded" :moviesTop="movies.moviesTop"></MainTops>

  <div v-else class="loader-container">
    <BaseLoader></BaseLoader>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useMoviesStore } from '@/stores/movies';
  import MainHero from '@/components/MainHero.vue';
  import MainTops from '@/components/MainTops.vue';
  import BaseLoader from '@/components/BaseLoader.vue';

  const movies = useMoviesStore();

  const refreshMovie = (): void => {
    movies.loadRandomMovie();
  };

  onMounted(() => {
    movies.loadRandomMovie();
    movies.loadMoviesTop();
  });
</script>

<style scoped lang="scss">
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 96px);
    padding: 32px 0 0;
  }
</style>
