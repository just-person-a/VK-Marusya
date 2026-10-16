import { ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useNotificationStore } from "./notification";
import { checkRequest } from "@/composables/checkRequest";
import { errorHandler } from "@/composables/errorHandler";

export const useAuthStore = defineStore("authStore", () => {
  // State
  const isAuthorized = ref<boolean>(false);
  const isRegestrationSuccess = ref<boolean>(false);
  const isLoginRequested = ref<boolean>(false);
  const userStore = useUserStore()
  const { showNotification } = useNotificationStore();

  // Actions
  const login = async (email: string, password: string) => {
    const request = await fetch("https://cinemaguide.skillbox.cc/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!request.ok && request.status !== 400) {
      throw new Error('Не удалось войти в аккаунт! Обновите страницу и повторите попытку.');
    };

    const data = await request.json();

    if (data.result) {
      isAuthorized.value = true;
      await userStore.updateUserInfo();

      showNotification('Вход выполнен успешно. С возвращением!', 'info');
    }
    else {
      showNotification(
        'Неверный адрес электронной почты или пароль. Проверьте корректность данных и повторите попытку!',
        'error');
    };
  };

  const logout = async () => {
    const request = await fetch("https://cinemaguide.skillbox.cc/auth/logout", {
      method: "GET",
      credentials: "include",
    });

    checkRequest(request, 'Не удалось выйти из аккаунта! Обновите страницу и повторите попытку.');

    isAuthorized.value = false;
    userStore.clearUserInfo();

    showNotification('Вы вышли из аккаунта. Ждём Вас снова!', 'info');
  };

  const register = async (email: string, password: string, name: string, surname: string) => {
    isRegestrationSuccess.value = false;

    const request = await fetch("https://cinemaguide.skillbox.cc/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        name,
        surname,
      }),
    });

    if (!request.ok && request.status !== 409) {
      throw new Error('Не удалось выполнить регистрацию! Обновите страницу и повторите попытку.');
    };

    const data = await request.json();

    if (Object.keys(data).includes("success") && data.success) {
      isRegestrationSuccess.value = true;
    }
    else {
      showNotification(
        'Пользователь с таким адресом электронной почтый уже существует! Войдите в аккаунт или создайте новый.',
        'error');
    };
  };

  const checkAuthorization = async () => {
    const request = await fetch("https://cinemaguide.skillbox.cc/profile", {
      method: "GET",
      credentials: "include",
    });

    if (request.ok) {
      isAuthorized.value = true;
    };
  };

  const requestLogin = () => {
    isLoginRequested.value = true;

    setTimeout(() => {
      isLoginRequested.value = false;
    }, 0);
  };

  return {
    isAuthorized,
    isRegestrationSuccess,
    isLoginRequested,

    login: errorHandler(login),
    logout: errorHandler(logout),
    register: errorHandler(register),
    checkAuthorization,
    requestLogin,
  };
});
