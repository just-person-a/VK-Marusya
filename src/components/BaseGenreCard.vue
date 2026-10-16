<template>
  <div class="genre-card">
    <img class="genre-card__image" :src="genreImage" alt="Изображение жанра фильмов">

    <span class="genre-card__name">
      {{ `${genreName.slice(0, 1).toLocaleUpperCase()}${genreName.slice(1)}` }}
    </span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    genreName: string,
    genreImage: string,
  }>();
</script>

<style scoped lang="scss">
  .genre-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;
    width: 290px;
    height: 304px;
    background-color: vars.$color-black;
    border: 1px solid vars.$color-white-transparent-25;
    border-radius: 24px;
    box-shadow: 0px 0px 80px 0px vars.$color-white-transparent-33;
    overflow: hidden;

    @include mixins.vp-767 {
      width: 335px;
    }

    &__image {
      width: 100%;
      height: 220px;
      pointer-events: none;
    }

    &__name {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      color: vars.$color-white;
    }
  }
</style>
