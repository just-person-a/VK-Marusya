<template>
  <div class="search" ref="search">
    <SearchForm :isClearSearchRequested="isClearSearchRequested" @hideSearchResults="hideSearchResults"
      @showSearchResults="showSearchResults">
    </SearchForm>

    <SearchResults v-if="movies.moviesByTitle.length > 0 && !isClearSearchRequested"
      :class="['search__results', { 'search__results--shown': isSearchResultShowing, 'search__results--hidden': !isSearchResultShowing }]"
      @clearSearch="clearSearch" @hideSearch="emits('hideSearch')">
    </SearchResults>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import SearchForm from './SearchForm.vue';
  import SearchResults from './SearchResults.vue';
  import { useMoviesStore } from '@/stores/movies.ts';

  const emits = defineEmits<{
    (name: 'hideSearch'): void,
  }>();

  const movies = useMoviesStore();

  const isClearSearchRequested = ref<boolean>(false);
  const search = ref<HTMLElement | null>(null);
  const isSearchResultShowing = ref<boolean>(true);

  const clearSearch = () => {
    isClearSearchRequested.value = true;

    setTimeout(() => {
      isClearSearchRequested.value = false;
    }, 1000);
  };

  const hideSearchResults = () => {
    isSearchResultShowing.value = false;
  };

  const showSearchResults = () => {
    isSearchResultShowing.value = true;
  };

  const handleDocumentClick = (event: MouseEvent) => {
    if (search.value?.contains(event.target as Node)) {
      isSearchResultShowing.value = true;
    }
    else {
      isSearchResultShowing.value = false;

      if ((event.target as HTMLElement).tagName === 'A') {
        clearSearch();
      };
    };
  }

  onMounted(() => {
    document.addEventListener('click', handleDocumentClick);
  });

  onUnmounted(() => {
    document.removeEventListener('click', handleDocumentClick);
  });
</script>

<style scoped lang="scss">
  .search {
    position: relative;

    &__results {
      position: absolute;
      top: calc(48px + 12px);
      right: 0;
      z-index: 10;

      @include mixins.vp-767 {
        top: calc(56px + 8px);
        right: unset;
        left: 0;
      }

      &--shown {
        animation: resultsFadeIn vars.$transition-300 forwards;
      }

      &--hidden {
        animation: resultsFadeOut vars.$transition-300 forwards;
      }
    }
  }

  @keyframes resultsFadeIn {
    0% {
      display: none;
      opacity: 0;
    }

    10% {
      display: flex;
      opacity: 0;
    }

    100% {
      display: flex;
      opacity: 1;
    }
  }

  @keyframes resultsFadeOut {
    0% {
      display: flex;
      opacity: 1;
    }

    90% {
      display: flex;
      opacity: 0;
    }

    100% {
      display: none;
      opacity: 0;
    }
  }
</style>
