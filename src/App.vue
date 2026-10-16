<template>
  <TheHeader v-if="isInfoLoaded"></TheHeader>

  <TheMain v-if="isInfoLoaded"></TheMain>

  <TheFooter v-if="isInfoLoaded"></TheFooter>

  <BaseSplashScreen :isInfoLoaded="isInfoLoaded"></BaseSplashScreen>

  <BaseNotification></BaseNotification>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useHead } from '@vueuse/head';
  import { useAuthStore } from './stores/auth.ts';
  import { useUserStore } from './stores/user.ts';
  import TheHeader from './components/TheHeader.vue';
  import TheMain from './components/TheMain.vue';
  import TheFooter from './components/TheFooter.vue';
  import BaseSplashScreen from '@/components/BaseSplashScreen.vue';
  import BaseNotification from './components/BaseNotification.vue';

  const route = useRoute();
  const title = computed(() => route.meta?.title ? `VK Маруся – ${route.meta.title}` : "VK Маруся");

  const auth = useAuthStore();
  const user = useUserStore();

  const isInfoLoaded = ref<boolean>(false);

  useHead({
    title: title,
  });

  onMounted(async () => {
    document.body.classList.add('app-loaded');

    if (auth.isAuthorized) {
      await user.updateUserInfo();
    };

    isInfoLoaded.value = true;
  });
</script>

<style scoped lang="scss"></style>
