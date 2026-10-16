<template>
  <form class="registration-form" @submit.prevent="onSubmit">
    <h2 class="registration-form__heading">
      Регистрация
    </h2>

    <div class="registration-form__group">
      <BaseCustomInput v-model="form.email" type="email" id="email" name="email" iconName="icon-mail"
        placeholder="Электронная почта" :isError="isRegistrationError.email"></BaseCustomInput>

      <BaseCustomInput v-model="form.name" type="text" id="name" name="name" iconName="icon-person" placeholder="Имя"
        :isError="isRegistrationError.name">
      </BaseCustomInput>

      <BaseCustomInput v-model="form.surname" type="text" id="surname" name="surname" iconName="icon-person"
        placeholder="Фамилия" :isError="isRegistrationError.surname"></BaseCustomInput>

      <BaseCustomInput v-model="form.password" type="password" id="password" name="password" iconName="icon-key"
        placeholder="Пароль" :isError="isRegistrationError.password || isRegistrationError.passwordEquality">
      </BaseCustomInput>

      <BaseCustomInput v-model="form.passwordConfirmation" type="password" id="password-confirmation"
        name="password-confirmation" iconName="icon-key" placeholder="Подтвердите пароль"
        :isError="isRegistrationError.passwordConfirmation || isRegistrationError.passwordEquality"></BaseCustomInput>
    </div>

    <BaseButton class="btn--light btn--big" text="Создать аккаунт" type="submit"></BaseButton>

    <button class="registration-form__link" type="button" @click="emits('changeAuthStatus', 0)">
      У&nbsp;меня есть пароль
    </button>
  </form>
</template>

<script setup lang="ts">
  import { reactive, ref, watchEffect } from 'vue';
  import BaseCustomInput from './BaseCustomInput.vue';
  import BaseButton from './BaseButton.vue';
  import { useRegistrationFormSubmit } from '@/composables/registrationFormSubmit';
  import type IRegistrationForm from '@/types/RegistrationForm';
  import type IRegistrationError from '@/types/RegistationError';

  const props = defineProps<{
    isAuthCardShown: boolean,
  }>();

  const emits = defineEmits<{
    (name: 'changeAuthStatus', statusId: number): void,
  }>();

  const form = reactive<IRegistrationForm>({
    email: '',
    name: '',
    surname: '',
    password: '',
    passwordConfirmation: '',
  });

  const isRegistrationError = ref<IRegistrationError>({
    email: false,
    password: false,
    name: false,
    surname: false,
    passwordConfirmation: false,
    passwordEquality: false,
  });

  const onSubmit = () => {
    useRegistrationFormSubmit(form, isRegistrationError);
  };

  watchEffect(() => {
    if (!props.isAuthCardShown) {
      setTimeout(() => {
        form.email = '';
        form.name = '';
        form.surname = '';
        form.password = '';
        form.passwordConfirmation = '';

        isRegistrationError.value = {
          email: false,
          password: false,
          name: false,
          surname: false,
          passwordConfirmation: false,
          passwordEquality: false,
        };
      }, 1000);
    };
  });
</script>

<style scoped lang="scss">
  .registration-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;
    width: 100%;

    &__heading {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      color: vars.$color-black;
      margin: 0;
    }

    &__group {
      display: flex;
      flex-direction: column;
      gap: 11px;
      width: 100%;
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
