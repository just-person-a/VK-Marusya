import { ref } from "vue";
import { defineStore } from "pinia";
import { checkRequest } from "@/composables/checkRequest";
import { errorHandler } from "@/composables/errorHandler";
import type IGenre from "@/types/Genre";

export const useGenresStore = defineStore("genresStore", () => {
  // State
  const genres = ref<IGenre[]>([]);
  const isGenresLoaded = ref<boolean>(false);

  // Actions
  const loadGenres = async () => {
    if (isGenresLoaded.value) {
      return;
    };

    const request = await fetch("https://cinemaguide.skillbox.cc/movie/genres");

    checkRequest(request, 'Не удалось загрузить список жанров! Обновите страницу и повторите попытку.');

    const data = await request.json();

    const genresImages = import.meta.glob("@/assets/images/genres/image-genre-*.jpg");
    const genresImagesMap = await Promise.all(Object.entries(genresImages).map(async ([path, importer]) => {
      const module = await importer() as { default: string };
      const imageName = path.split("/").pop()?.split(".")[0] as string;
      return { imageName, src: module.default }
    }));

    for (let index = 0; index < data.length; index++) {
      genres.value.push({
        id: index,
        name: data[index],
        image: genresImagesMap.find(image => image.imageName === `image-genre-${data[index]}`)?.src || null,
      });
    };

    isGenresLoaded.value = true;
  };

  return {
    genres,
    isGenresLoaded,

    loadGenres: errorHandler(loadGenres),
  };
});
