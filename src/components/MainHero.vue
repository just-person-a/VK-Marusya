<template>
  <section class="hero">
    <div class="container">
      <div class="hero__wrapper">
        <BaseMovieAbout :movie="movie" @refreshMovie="emits('refreshMovie')"></BaseMovieAbout>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import BaseMovieAbout from './BaseMovieAbout.vue';
  import type IMovie from '@/types/Movie';

  defineProps<{
    movie: IMovie | undefined,
  }>();

  const emits = defineEmits<{
    (name: 'refreshMovie'): void,
  }>();
</script>

<style scoped lang="scss">
  .hero {
    &__wrapper {
      display: flex;
      align-items: center;
      min-height: calc(100vh - 96px);
      padding: 32px 0 0;

      @include mixins.vp-767 {
        min-height: unset;
        padding: 0;
      }

      @media (max-width: 499px) {
        margin: -8px 0 0;
      }
    }
  }
</style>
