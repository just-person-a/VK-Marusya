<template>
  <h1 class="visually-hidden">Страница с информацией о фильме</h1>

  <MovieHero v-if="movies.isMovieLoaded" :movie="movies.movie"></MovieHero>

  <div v-else class="loader-container">
    <BaseLoader></BaseLoader>
  </div>

  <MovieInfo :movie="movies.movie"></MovieInfo>
</template>

<script setup lang="ts">
  import { onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useMoviesStore } from '@/stores/movies';
  import MovieHero from '@/components/MovieHero.vue';
  import MovieInfo from '@/components/MovieInfo.vue';
  import BaseLoader from '@/components/BaseLoader.vue';

  const router = useRoute();
  const movies = useMoviesStore();

  onMounted(() => {
    if (router.params.id) {
      movies.loadMovieById(+router.params.id);
    };
  });

  watch(() => router.params.id, () => {
    if (router.params.id) {
      movies.loadMovieById(+router.params.id)
    };
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
