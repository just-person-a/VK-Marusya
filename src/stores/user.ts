import { ref } from "vue";
import { defineStore } from "pinia";
import { checkRequest } from "@/composables/checkRequest";
import { errorHandler } from "@/composables/errorHandler";
import type IUser from "@/types/User";

export const useUserStore = defineStore("userStore", () => {
  // State
  const userInfo = ref<IUser>();
  const isUserInfoLoaded = ref<boolean>(false);

  // Actions
  const updateUserInfo = async () => {
    isUserInfoLoaded.value = false;

    const request = await fetch("https://cinemaguide.skillbox.cc/profile", {
      method: "GET",
      credentials: "include",
    });

    checkRequest(request, 'Не удалось загрузить данные пользователя! Обновите страницу и повторите попытку.');

    const data = await request.json();

    userInfo.value = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      favorites: data.favorites,
    };

    isUserInfoLoaded.value = true;
  };

  const clearUserInfo = () => {
    userInfo.value = {
      name: '',
      surname: '',
      email: '',
      favorites: [],
    };

    isUserInfoLoaded.value = false;
  };

  return {
    userInfo,
    isUserInfoLoaded,

    updateUserInfo: errorHandler(updateUserInfo),
    clearUserInfo,
  };
});
