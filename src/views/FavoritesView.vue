<template>
  <div class="account-favorites">
    <h2 class="visually-hidden">
      Избранные фильмы
    </h2>

    <div class="account-favorites__scroll">
      <ul v-if="favorites.isFavotitesLoaded" class="account-favorites__list">
        <li v-for="favorite of favorites.favorites" :key="favorite.id"
          :class="['account-favorites__item', { 'account-favorites__item--hidden': favorite.id === removingMovieId }]">
          <RouterLink class="account-favorites__card" :to="`/movie/${favorite.id}`">
            <BaseMovieCard :poster-url="favorite.posterUrl || stubPoster"></BaseMovieCard>
          </RouterLink>

          <BaseButton class="account-favorites__remove btn--remove" iconName="icon-cross-small" :iconWidth="24"
            :iconHeight="24" type="button" aria-label="Удалить фильм из избранного"
            @click="removeFavorite(favorite.id)">
          </BaseButton>
        </li>
      </ul>

      <div v-else class="loader-container">
        <BaseLoader></BaseLoader>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useFavoritesStore } from '@/stores/favorites';
  import BaseMovieCard from '@/components/BaseMovieCard.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import BaseLoader from '@/components/BaseLoader.vue';
  import stubPoster from '@/assets/images/image-stub-poster-vertical.jpg';
  import type IUser from '@/types/User';

  defineProps<{
    userInfo: IUser,
  }>();

  const favorites = useFavoritesStore();

  const removingMovieId = ref<number>();

  const removeFavorite = (movieId: number) => {
    removingMovieId.value = movieId;

    favorites.removeFavorite(movieId);
  };

  onMounted(() => {
    favorites.loadFavorites();
  });
</script>

<style scoped lang="scss">
  .account-favorites {
    &__list {
      @include mixins.list-params-unset;
      display: grid;
      grid-template-columns: repeat(5, 224px);
      gap: 64px 40px;
      margin: 0 0 120px;

      @media (max-width: 1439px) {
        display: flex;
        justify-content: space-evenly;
        gap: 40px;
        flex-wrap: wrap;
      }

      @include mixins.vp-767 {
        margin: 0 0 152px;
      }
    }

    &__scroll {
      @include mixins.vp-767 {
        overflow-x: auto;
        overflow-y: visible;
        padding: 100px 20px 0;
        margin: -100px -20px 0;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }

    &__list {
      @include mixins.vp-767 {
        width: max-content;
      }
    }

    &__item {
      position: relative;
      transition: transform vars.$transition-300;

      &:hover,
      &:focus-visible {
        transform: scale(1.05);

        .account-favorites__remove {
          transform: translate(50%, -50%);
          opacity: 1;
        }
      }

      &:active:not(:has(.account-favorites__remove:active)) {
        transform: scale(1);
      }

      &--hidden {
        animation: cardSlideFadeOut vars.$transition-500 forwards;
      }
    }

    &__remove {
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0;
      transition: transform vars.$transition-300, opacity vars.$transition-300;

      @include mixins.vp-767 {
        display: none;
      }
    }
  }

  @keyframes cardSlideFadeOut {
    0% {
      display: flex;
      transform: translateY(0);
      opacity: 1;
    }

    90% {
      display: flex;
      transform: translateY(-150%);
      opacity: 0;
    }

    100% {
      display: none;
      transform: translateY(-150%);
      opacity: 0;
    }
  }
</style>
