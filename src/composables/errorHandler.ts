import { useNotificationStore } from '@/stores/notification';

export const errorHandler = <T extends (...args: never[]) => Promise<void>>(func: T) => {
  return async (...args: Parameters<T>) => {
    const { showNotification } = useNotificationStore();

    try {
      return await func(...args);
    } catch (error) {
      if (error instanceof TypeError) {
        showNotification('Не удалось подключиться к сети! Проверьте подключение к интернету и повторите попытку.', 'error');
      } else if (error instanceof Error) {
        showNotification(error.message, 'error');
      } else {
        showNotification('Неизвестная ошибка! Обновите страницу и повторите попытку.', 'error');
      };

      return;
    };
  };
};
