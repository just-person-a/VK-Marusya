import { ref } from "vue";
import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notificationStore", () => {
  // State
  const notificationText = ref<string>('');
  const notificationStatus = ref<'info' | 'error'>('info');
  const isNotificationShown = ref<boolean>(false);

  // Actions
  const showNotification = (text: string, status: 'info' | 'error') => {
    notificationText.value = text;
    notificationStatus.value = status;
    isNotificationShown.value = true;
  };

  const hideNotification = () => {
    isNotificationShown.value = false;

    setTimeout(() => {
      notificationText.value = '';
      notificationStatus.value = 'info';
    }, 1000);
  };

  return {
    notificationText,
    notificationStatus,
    isNotificationShown,

    showNotification,
    hideNotification,
  };
});
