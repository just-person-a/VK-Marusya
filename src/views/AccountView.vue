<template>
  <section classs="account">
    <div class="container">
      <div class="account__wrapper">
        <h1 class="account__heading">
          Мой аккаунт
        </h1>

        <div class="account__nav">
          <RouterLink class="account__link" to="/account">
            <svg class="account__link-icon" width="24" height="24" aria-hidden="true">
              <use :xlink:href="`${sprite}#icon-favorite`"></use>
            </svg>

            <span class="account__link-text account__link-text--full">
              Избранные фильмы
            </span>

            <span class="account__link-text account__link-text--short">
              Избранное
            </span>
          </RouterLink>

          <RouterLink class="account__link" to="/account/settings">
            <svg class="account__link-icon" width="24" height="24" aria-hidden="true">
              <use :xlink:href="`${sprite}#icon-person`"></use>
            </svg>

            <span class="account__link-text account__link-text--full">
              Настройка аккаунта
            </span>

            <span class="account__link-text account__link-text--short">
              Настройки
            </span>
          </RouterLink>
        </div>

        <RouterView :userInfo="user.userInfo" class="account__inner" @logout="logout"></RouterView>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useAuthStore } from '@/stores/auth';
  import { useUserStore } from '@/stores/user';
  import sprite from '@/assets/images/sprite.svg';

  const auth = useAuthStore();
  const user = useUserStore();

  const logout = () => {
    auth.logout();
  };
</script>

<style scoped lang="scss">
  .account {
    &__wrapper {
      display: flex;
      flex-direction: column;
      padding: 64px 0 0;

      @include mixins.vp-1023 {
        padding: 40px 0 0;
      }

      @include mixins.vp-767 {
        padding: 16px 0 0;
      }
    }

    &__heading {
      font-size: 48px;
      font-weight: 700;
      line-height: 56px;
      color: vars.$color-white;
      margin: 0 0 71px;

      @include mixins.vp-1359 {
        font-size: 36px;
        line-height: 42px;
      }

      @include mixins.vp-1023 {
        font-size: 30px;
        line-height: 36px;
      }

      @include mixins.vp-767 {
        font-size: 24px;
        line-height: 32px;
        margin: 0 0 48px;
      }
    }

    &__nav {
      display: flex;
      gap: 64px;
      margin: 0 0 71px;

      @include mixins.vp-767 {
        gap: 24px;
        margin: 0 0 48px;
      }
    }

    &__link {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;


      &:hover::before,
      &:focus-visible::before {
        transform: scaleX(1);
      }

      &::before {
        content: '';
        position: absolute;
        bottom: -8px;
        transform: scaleX(0);
        width: 100%;
        height: 1.5px;
        background-color: vars.$color-pink;
        transition: transform vars.$transition-300;
      }
    }

    &__link-icon {
      width: 24px;
      height: 24px;
      color: vars.$color-white;
    }

    &__link-text {
      font-size: 24px;
      font-weight: 400;
      line-height: 32px;
      color: vars.$color-white;

      &--full {
        @include mixins.vp-767 {
          display: none;
        }
      }

      &--short {
        display: none;

        @include mixins.vp-767 {
          display: inline;
        }
      }
    }
  }

  .router-link-exact-active::before {
    transform: scaleX(1);
  }
</style>
