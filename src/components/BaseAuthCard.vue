<template>
  <div :class="['auth', { 'auth--shown': shownClass, 'auth--hidden': hiddenClass }]">
    <div class="container">
      <div class="auth__wrapper">
        <div class="auth__inner">
          <svg class="auth__icon" width="133" height="30" aria-hidden="true">
            <use xlink:href="@/assets/images/sprite.svg#logo-marusya-dark"></use>
          </svg>

          <AuthRegistrationForm v-if="userAuthStatus === 'reg'" :isAuthCardShown="isAuthCardShown"
            @changeAuthStatus="changeAuthStatus">
          </AuthRegistrationForm>

          <AuthLoginForm v-else-if="userAuthStatus === 'login'" :isAuthCardShown="isAuthCardShown"
            @changeAuthStatus="changeAuthStatus"></AuthLoginForm>

          <AuthSuccess v-else @changeAuthStatus="changeAuthStatus"></AuthSuccess>

          <BaseButton ref="closeButton" class="auth__close btn--close" type="button" iconName="icon-cross"
            :iconWidth="24" :iconHeight="24" aria-label="Закрыть окно авторизации"
            @click="emits('switchAuthCardSnowning')">
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import AuthLoginForm from './AuthLoginForm.vue';
  import AuthRegistrationForm from './AuthRegistrationForm.vue';
  import AuthSuccess from './AuthSuccess.vue';
  import BaseButton from './BaseButton.vue';
  import { useAuthStore } from '@/stores/auth';

  const props = defineProps<{
    isAuthCardShown: boolean,
  }>();

  const emits = defineEmits<{
    (name: 'switchAuthCardSnowning'): void,
  }>();

  const auth = useAuthStore()
  const userAuthStatus = ref<string>('login');
  const shownClass = ref<boolean>(false);
  const hiddenClass = ref<boolean>(false);
  const closeButton = ref<InstanceType<typeof BaseButton> | null>(null);

  const changeAuthStatus = (statusId: number) => {
    switch (statusId) {
      case 0:
        userAuthStatus.value = 'login';
        break;
      case 1:
        userAuthStatus.value = 'reg';
        break;
      case 2:
        userAuthStatus.value = 'success';
        break;
    };
  };

  watch(() => props.isAuthCardShown, () => {
    if (props.isAuthCardShown) {
      closeButton.value?.focus();

      shownClass.value = true;
    }
    else {
      shownClass.value = false;
      hiddenClass.value = true;

      setTimeout(() => {
        hiddenClass.value = false;

        changeAuthStatus(0);
      }, 1000);
    };
  });

  watch(() => auth.isRegestrationSuccess, () => {
    changeAuthStatus(2);
  });
</script>

<style scoped lang="scss">
  .auth {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    opacity: 0;
    z-index: 10;

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      content: '';
      width: 100vw;
      height: 100vh;
      background-color: transparent;
    }

    &--shown {
      pointer-events: all;
      opacity: 1;
      transition: opacity vars.$transition-100;

      &::before {
        background-color: vars.$color-black-transparent-50;
        transition: background-color vars.$transition-800 0.1s;
      }

      & .auth__inner {
        transform: translateY(0);
        transition: transform vars.$transition-800 0.1s;
      }
    }

    &--hidden {
      pointer-events: none;
      opacity: 0;
      transition: opacity vars.$transition-100 0.8s;

      &::before {
        background-color: transparent;
        transition: background-color vars.$transition-800;
      }

      & .auth__inner {
        transform: translateY(100vh);
        transition: transform vars.$transition-800;
      }
    }

    &__wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100vh;
    }

    &__inner {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 420px;
      background-color: vars.$color-white;
      border-radius: 24px;
      padding: 64px 40px;
      transform: translateY(-100vh);

      @include mixins.vp-767 {
        width: 335px;
        padding: 64px 20px 32px;
      }
    }

    &__icon {
      margin: 0 0 40px;

      @include mixins.vp-767 {
        margin: 0 0 30px;
      }
    }

    &__close {
      position: absolute;
      top: 0;
      right: -72px;

      @include mixins.vp-767 {
        top: 8px;
        right: 8px;
      }
    }
  }
</style>
