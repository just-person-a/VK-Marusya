import { ref } from "vue";
import { defineStore } from "pinia";
import { checkRequest } from "@/composables/checkRequest";
import { errorHandler } from "@/composables/errorHandler";
import type IMovieBrief from "@/types/MovieBrief";
import type IMovie from "@/types/Movie";

export const useMoviesStore = defineStore("moviesStore", () => {
  // State
  const moviesTop = ref<IMovieBrief[]>([]);
  const randomMovie = ref<IMovie>();
  const movie = ref<IMovie>();
  const moviesByGenre = ref<IMovieBrief[]>([]);
  const moviesByGenreTemp = ref<IMovieBrief[]>([]);
  const moviesByGenreForShowingCount: number = 10;
  const moviesByTitle = ref<IMovie[]>([]);
  const isMovieTopLoaded = ref<boolean>(false);
  const isRandomMovieLoaded = ref<boolean>(false);
  const isMovieLoaded = ref<boolean>(false);
  const isMoviesByGenreLoaded = ref<boolean>(false);

  // Actions
  const loadMoviesTop = async () => {
    isMovieTopLoaded.value = false;

    const request = await fetch("https://cinemaguide.skillbox.cc/movie/top10");

    checkRequest(request, 'Не удалось загрузить список популярных фильмов! Обновите страницу и повторите попытку.');

    const data = await request.json();

    moviesTop.value = [];

    for (const movie of data) {
      moviesTop.value.push({
        id: movie.id,
        title: movie.title,
        posterUrl: movie.posterUrl,
      });
    };

    isMovieTopLoaded.value = true;
  };

  const loadRandomMovie = async () => {
    isRandomMovieLoaded.value = false;

    const request = await fetch("https://cinemaguide.skillbox.cc/movie/random");

    checkRequest(request, 'Не удалось загрузить случайный фильм! Обновите страницу и повторите попытку.');

    const data = await request.json();

    randomMovie.value = {
      id: data.id,
      title: data.title,
      language: data.language,
      releaseYear: data.releaseYear,
      genres: data.genres,
      plot: data.plot,
      runtime: data.runtime,
      budget: data.budget,
      revenue: data.revenue,
      posterUrl: data.posterUrl,
      backdropUrl: data.backdropUrl,
      trailerUrl: data.trailerUrl,
      trailerYouTubeId: data.trailerYouTubeId,
      tmdbRating: data.tmdbRating,
      director: data.director,
      production: data.production,
      awardsSummary: data.awardsSummary,
    };

    setTimeout(() => {
      isRandomMovieLoaded.value = true;
    }, 1000);
  };

  const loadMovieById = async (movieId: number) => {
    isMovieLoaded.value = false;

    const request = await fetch(`https://cinemaguide.skillbox.cc/movie/${movieId}`);

    checkRequest(request, 'Не удалось загрузить информацию о фильме! Обновите страницу и повторите попытку.');

    const data = await request.json();

    movie.value = {
      id: data.id,
      title: data.title,
      language: data.language,
      releaseYear: data.releaseYear,
      genres: data.genres,
      plot: data.plot,
      runtime: data.runtime,
      budget: data.budget,
      revenue: data.revenue,
      posterUrl: data.posterUrl,
      backdropUrl: data.backdropUrl,
      trailerUrl: data.trailerUrl,
      trailerYouTubeId: data.trailerYouTubeId,
      tmdbRating: data.tmdbRating,
      director: data.director,
      production: data.production,
      awardsSummary: data.awardsSummary,
    };

    setTimeout(() => {
      isMovieLoaded.value = true;
    }, 1000);
  };

  const loadMoviesByGenre = async (genre: string, count: number, page: number) => {
    isMoviesByGenreLoaded.value = false;

    if (page === 0) {
      moviesByGenreTemp.value = [];
      moviesByGenre.value = [];
    };

    if (moviesByGenreTemp.value.length === 0) {
      const queryParams = new URLSearchParams();
      queryParams.append("genre", genre);
      queryParams.append("count", `${count}`);
      queryParams.append("page", `${page}`);

      const request = await fetch(`https://cinemaguide.skillbox.cc/movie?${queryParams}`);

      checkRequest(request, 'Не удалось загрузить фильмы выбранного жанра! Обновите страницу и повторите попытку.');

      const data = await request.json();

      for (const movie of data) {
        moviesByGenreTemp.value.push({
          id: movie.id,
          title: movie.title,
          posterUrl: movie.posterUrl,
        });
      };
    };

    setTimeout(() => {
      const moviesForTransfer = moviesByGenreTemp.value.splice(0, moviesByGenreForShowingCount);
      moviesByGenre.value.push(...moviesForTransfer);

      isMoviesByGenreLoaded.value = true;
    }, 1000);
  };

  const loadMoviesByTitle = async (title: string, count: number) => {
    const queryParams = new URLSearchParams();
    queryParams.append("title", title);
    queryParams.append("count", `${count}`);

    const request = await fetch(`https://cinemaguide.skillbox.cc/movie?${queryParams}`);

    checkRequest(request, 'Не удалось выполнить поиск фильмов! Обновите страницу и повторите попытку.');

    const data = await request.json();

    moviesByTitle.value = [];

    for (const movie of data) {
      moviesByTitle.value.push({
        id: movie.id,
        title: movie.title,
        language: movie.language,
        releaseYear: movie.releaseYear,
        genres: movie.genres,
        plot: movie.plot,
        runtime: movie.runtime,
        budget: movie.budget,
        revenue: movie.revenue,
        posterUrl: movie.posterUrl,
        backdropUrl: movie.backdropUrl,
        trailerUrl: movie.trailerUrl,
        trailerYouTubeId: movie.trailerYouTubeId,
        tmdbRating: movie.tmdbRating,
        director: movie.director,
        production: movie.production,
        awardsSummary: movie.awardsSummary,
      });
    };
  };

  const clearMoviesByTitle = () => {
    moviesByTitle.value = [];
  };

  return {
    moviesTop,
    randomMovie,
    movie,
    moviesByGenre,
    moviesByGenreForShowingCount,
    moviesByTitle,
    isMovieTopLoaded,
    isRandomMovieLoaded,
    isMovieLoaded,
    isMoviesByGenreLoaded,

    loadMoviesTop: errorHandler(loadMoviesTop),
    loadRandomMovie: errorHandler(loadRandomMovie),
    loadMovieById: errorHandler(loadMovieById),
    loadMoviesByGenre: errorHandler(loadMoviesByGenre),
    loadMoviesByTitle: errorHandler(loadMoviesByTitle),
    clearMoviesByTitle,
  };
});
