<template>
  <section class="genres">
    <div class="container">
      <div class="genres__wrapper">
        <h1 class="genres__heading">
          Жанры фильмов
        </h1>

        <ul v-if="genres.isGenresLoaded" class="genres__list">
          <li class="genres__item" v-for="genre of genres.genres" :key="genre.id">
            <RouterLink :to="`/genres/${genre.name}`">
              <BaseGenreCard :genreName="genre.name" :genreImage="genre.image || stubGenreImage">
              </BaseGenreCard>
            </RouterLink>
          </li>
        </ul>

        <div v-else class="loader-container">
          <BaseLoader></BaseLoader>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { RouterLink } from 'vue-router';
  import { useGenresStore } from '@/stores/genres';
  import BaseGenreCard from '@/components/BaseGenreCard.vue';
  import BaseLoader from '@/components/BaseLoader.vue';
  import stubGenreImageFile from '@/assets/images/image-stub-genre.jpg';

  const genres = useGenresStore();
  const stubGenreImage: string = stubGenreImageFile;

  onMounted(() => {
    genres.loadGenres();
  });
</script>

<style scoped lang="scss">
  .genres {
    &__wrapper {
      padding: 64px 0 160px;

      @include mixins.vp-1023 {
        padding: 64px 0;
      }

      @include mixins.vp-767 {
        padding: 16px 0 40px;
      }
    }

    &__heading {
      font-size: 48px;
      font-weight: 700;
      line-height: 56px;
      margin: 0 0 64px;

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
        margin: 0 0 40px;
      }
    }

    &__list {
      @include mixins.list-params-unset;
      display: grid;
      grid-template-columns: repeat(4, 290px);
      gap: 64px 40px;

      @media (max-width: 1439px) {
        display: flex;
        justify-content: space-evenly;
        gap: 40px;
        flex-wrap: wrap;
      }

      @include mixins.vp-1023 {
        gap: 32px;
      }

      @include mixins.vp-767 {
        gap: 24px;
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
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 328px);
    padding: 0;
  }
</style>
