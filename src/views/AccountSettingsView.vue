<template>
  <div class="account-settings">
    <h2 class="visually-hidden">
      Настройка аккаунта
    </h2>

    <div class="account-settings__inner">
      <div class="account-settings__item">
        <div class="account-settings__icon">
          <span class="account-settings__initials">
            {{ userInitials }}
          </span>
        </div>

        <div class="account-settings__content">
          <span class="account-settings__label">
            Имя Фамилия
          </span>

          <span class="account-settings__value">
            {{ `${userInfo.name} ${userInfo.surname}` }}
          </span>
        </div>
      </div>

      <div class="account-settings__item">
        <div class="account-settings__icon">
          <svg class="account-settings__icon-svg" width="24" height="24" aria-hidden="true">
            <use :xlink:href="`${sprite}#icon-mail`"></use>
          </svg>
        </div>

        <div class="account-settings__content">
          <span class="account-settings__label">
            Электронная почта
          </span>

          <span class="account-settings__value">
            {{ userInfo.email }}
          </span>
        </div>
      </div>
    </div>

    <BaseButton class="account-settings__btn btn--light" text="Выйти из аккаунта" type="button" @click="emits('logout')" :to="'/'">
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import BaseButton from '@/components/BaseButton.vue';
  import sprite from '@/assets/images/sprite.svg';
  import type IUser from '@/types/User';

  const props = defineProps<{
    userInfo: IUser,
  }>();

  const emits = defineEmits<{
    (name: 'logout'): void,
  }>();

  const userInitials = computed(() => {
    let totalInitials = '';
    totalInitials += props.userInfo.name ? props.userInfo.name[0] : '';
    totalInitials += props.userInfo.surname ? props.userInfo.surname[0] : '';
    totalInitials = totalInitials.toLocaleUpperCase();

    return totalInitials;
  });
</script>

<style scoped lang="scss">
  .account-settings {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 0 160px;

    @include mixins.vp-767 {
      padding: 0 0 230px;
    }

    &__inner {
      display: flex;
      flex-direction: column;
      gap: 40px;
      margin: 0 0 64px;

      @include mixins.vp-767 {
        margin: 0 0 40px;
      }
    }

    &__item {
      display: flex;
      align-items: center;
      gap: 16px;

      @include mixins.vp-767 {
        align-items: flex-start;
      }
    }

    &__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      background-color: vars.$color-white-transparent-50;
      border-radius: 100%;

      @include mixins.vp-767 {
        width: 48px;
        height: 48px;
      }
    }

    &__initials {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      color: vars.$color-white;
    }

    &__icon-svg {
      width: 24px;
      height: 24px;
      color: vars.$color-white;
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    &__label {
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      color: vars.$color-white;

      @include mixins.vp-767 {
        font-size: 14px;
        line-height: 20px;
        color: vars.$color-white-transparent-50;
      }
    }

    &__value {
      font-size: 24px;
      font-weight: 700;
      line-height: 32px;
      color: vars.$color-white;

      @include mixins.vp-767 {
        font-size: 18px;
        line-height: 24px;
      }
    }

    &__btn {
      @media (max-width: 376px) {
        width: 100%;
      }
    }
  }
</style>
