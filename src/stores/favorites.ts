import { ref } from "vue";
import { defineStore } from "pinia";
import { checkRequest } from "@/composables/checkRequest";
import { errorHandler } from "@/composables/errorHandler";
import type IMovieBrief from "@/types/MovieBrief";

export const useFavoritesStore = defineStore("favoritesStore", () => {
  // State
  const favorites = ref<IMovieBrief[]>([]);
  const isFavotitesLoaded = ref<boolean>(false);

  // Actions
  const loadFavorites = async () => {
    isFavotitesLoaded.value = false;

    favorites.value = [];

    const request = await fetch("https://cinemaguide.skillbox.cc/favorites", {
      method: "GET",
      credentials: "include",
    });

    checkRequest(request, 'Не удалось загрузить список избранного! Обновите страницу и повторите попытку.');

    const data = await request.json();

    setTimeout(() => {
      isFavotitesLoaded.value = true;

      for (const movie of data) {
        favorites.value.push({
          id: movie.id,
          title: movie.title,
          posterUrl: movie.posterUrl,
        });
      };
    }, 1000);
  };

  const updateFavorites = async () => {
    const request = await fetch("https://cinemaguide.skillbox.cc/favorites", {
      method: "GET",
      credentials: "include",
    });

    checkRequest(request, 'Не удалось обновить список избранного! Обновите страницу и повторите попытку.');

    const data = await request.json();

    favorites.value = [];

    for (const movie of data) {
      favorites.value.push({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.posterUrl,
      });
    };
  };

  const addFavorite = async (movieId: number) => {
    const request = await fetch("https://cinemaguide.skillbox.cc/favorites", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: `${movieId}`
      }),
    });

    checkRequest(request, 'Не удалось добавить фильм в избранное! Обновите страницу и повторите попытку.');
  };

  const removeFavorite = async (movieId: number) => {
    const request = await fetch(`https://cinemaguide.skillbox.cc/favorites/${movieId}`, {
      method: "DELETE",
      credentials: "include",
    });

    checkRequest(request, 'Не удалось удалить фильм из избранного! Обновите страницу и повторите попытку.');

    setTimeout(() => {
      errorHandler(updateFavorites);
    }, 500);
  };

  return {
    favorites,
    isFavotitesLoaded,

    loadFavorites: errorHandler(loadFavorites),
    addFavorite: errorHandler(addFavorite),
    removeFavorite: errorHandler(removeFavorite),
  };
});
