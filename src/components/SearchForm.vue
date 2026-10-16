<template>
  <form class="search-form" @submit.prevent>
    <BaseCustomInput v-model="form.search" type="search" id="search" name="search" iconName="icon-search"
      placeholder="Поиск" @clearForm="clearForm"></BaseCustomInput>
  </form>
</template>

<script setup lang="ts">
  import { reactive, watch } from 'vue';
  import BaseCustomInput from './BaseCustomInput.vue';
  import { useMoviesStore } from '@/stores/movies.ts';

  const props = defineProps<{
    isClearSearchRequested: boolean,
  }>();

  const emits = defineEmits<{
    (name: 'hideSearchResults'): void,
    (name: 'showSearchResults'): void,
  }>();

  const movies = useMoviesStore();

  interface ISearchForm {
    search: string,
  };

  const form = reactive<ISearchForm>({
    search: '',
  });

  const clearForm = () => {
    form.search = '';
  };

  watch(() => form.search, () => {
    if (!form.search.trim()) {
      emits('hideSearchResults');

      setTimeout(() => {
        movies.clearMoviesByTitle();
      }, 300);
    }
    else {
      emits('showSearchResults');
      movies.loadMoviesByTitle(form.search, 5);
    };
  });

  watch(() => props.isClearSearchRequested, () => {
    if (props.isClearSearchRequested) {
      form.search = '';
    };
  });
</script>

<style scoped lang="scss"></style>
