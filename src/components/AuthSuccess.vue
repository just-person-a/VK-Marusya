<template>
  <div class="auth-success">
    <h2 class="auth-success__heading">
      Регистрация завершена
    </h2>

    <span class="auth-success__info">
      Используйте вашу электронную почту для входа
    </span>

    <BaseButton class="btn--light btn--big" text="Войти" type="button" @click="emits('changeAuthStatus', 0)"></BaseButton>
  </div>
</template>

<script setup lang="ts">
  import BaseButton from './BaseButton.vue';

  const emits = defineEmits<{
    (name: 'changeAuthStatus', statusId: number): void,
  }>();
</script>

<style scoped lang="scss">
  .auth-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;

    &__heading {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      color: vars.$color-black;
      margin: 0;
    }

    &__info {
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      text-align: center;
      color: vars.$color-black;
    }
  }
</style>
