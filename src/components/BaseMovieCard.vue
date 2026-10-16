<template>
  <div class="movie-card">
    <img class="movie-card__poster" :src="posterUrl" alt="Постер фильма">
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    posterUrl: string,
  }>();
</script>

<style scoped lang="scss">
  .movie-card {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 224px;
    height: 336px;
    border: 1px solid vars.$color-white-transparent-25;
    border-radius: 16px;
    box-shadow: 0px 0px 80px 0px vars.$color-white-transparent-33;
    transition: border-color vars.$transition-300;

    &:hover,
    &:focus-visible {
      border-color: vars.$color-white;
    }

    &--big {
      @include mixins.vp-767 {
        width: 335px;
        height: 502px;

        &>.movie-card__poster {
          width: 335px;
          height: 502px;
        }
      }
    }

    &__poster {
      width: 224px;
      height: 336px;
      pointer-events: none;
    }
  }
</style>
