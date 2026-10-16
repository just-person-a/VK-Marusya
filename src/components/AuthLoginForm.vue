<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <h2 class="visually-hidden">
      Вход в аккаунт
    </h2>

    <div class="login-form__group">
      <BaseCustomInput v-model="form.email" type="email" id="email" name="email" iconName="icon-mail"
        placeholder="Электронная почта" :isError="isLoginError.email"></BaseCustomInput>

      <BaseCustomInput v-model="form.password" type="password" id="password" name="password" iconName="icon-key"
        placeholder="Пароль" :isError="isLoginError.password"></BaseCustomInput>
    </div>

    <BaseButton class="btn--light btn--big" text="Войти" type="submit"></BaseButton>

    <button class="login-form__link" type="button" @click="emits('changeAuthStatus', 1)">
      Регистрация
    </button>
  </form>
</template>

<script setup lang="ts">
  import { reactive, ref, watchEffect } from 'vue';
  import BaseCustomInput from './BaseCustomInput.vue';
  import BaseButton from './BaseButton.vue';
  import { useLoginFormSubmit } from '@/composables/loginFormSubmit';
  import type ILoginForm from '@/types/LoginForm';
  import type ILoginError from '@/types/LoginError';

  const props = defineProps<{
    isAuthCardShown: boolean,
  }>();

  const emits = defineEmits<{
    (name: 'changeAuthStatus', statusId: number): void,
  }>();

  const form = reactive<ILoginForm>({
    email: '',
    password: '',
  });

  const isLoginError = ref<ILoginError>({
    email: false,
    password: false,
  });

  const onSubmit = () => {
    useLoginFormSubmit(form, isLoginError);
  };

  watchEffect(() => {
    if (!props.isAuthCardShown) {
      setTimeout(() => {
        form.email = '';
        form.password = '';
        isLoginError.value = {
          email: false,
          password: false,
        };
      }, 1000);
    };
  });
</script>

<style scoped lang="scss">
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;
    width: 100%;

    &__group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;

      @include mixins.vp-767 {
        gap: 10px;
      }
    }

    &__link {
      position: relative;
      font-size: 18px;
      font-weight: 700;
      line-height: 24px;
      color: vars.$color-black;
      background-color: unset;
      border: none;
      outline: none;
      padding: 0;
      cursor: pointer;

      &:hover::before,
      &:focus-visible::before {
        transform: scaleX(1);
      }

      &::before {
        content: '';
        position: absolute;
        bottom: -4px;
        transform: scaleX(0);
        width: 100%;
        height: 1.5px;
        background-color: vars.$color-pink;
        transition: transform vars.$transition-300;
      }
    }
  }
</style>
