import { ref, onMounted, onUnmounted } from 'vue';

export const useWindowSize = () => {
  const screenWidth = ref<number>(window.innerWidth);

  const changeScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', changeScreenWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', changeScreenWidth);
  });

  return {
    screenWidth,
  };
};
