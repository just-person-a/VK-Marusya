<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <RouterLink class="header__logo" to="/" aria-label="Перейти на главную страницу">
          <svg width="144" height="32" aria-hidden="true">
            <use :xlink:href="`${sprite}#logo-marusya-light`"></use>
          </svg>
        </RouterLink>

        <RouterLink class="header__link header__link-main" to="/">Главная</RouterLink>

        <RouterLink class="header__link" to="/genres">
          <span class="header__link-text">
            Жанры
          </span>

          <svg class="header__link-icon" width="24" height="24" aria-label="Жанры фильмов">
            <use :xlink:href="`${sprite}#icon-genres`"></use>
          </svg>
        </RouterLink>

        <BaseSearch
          :class="['header__search', { 'header__search--shown': isSearchFormShown, 'header__search--hidden': !isSearchFormShown }]"
          @hideSearch="switchSearchFormShowing">
        </BaseSearch>

        <div
          :class="['header__search-backdrop', { 'header__search-backdrop--shown': isSearchFormShown, 'header__search-backdrop--hidden': !isSearchFormShown }]"
          @click="switchSearchFormShowing">
        </div>

        <button class="header__search-btn" @click="switchSearchFormShowing">
          <svg width="24" height="24" aria-label="Поиск фильма">
            <use :xlink:href="`${sprite}#icon-search`"></use>
          </svg>
        </button>

        <RouterLink ref="authButton" v-if="auth.isAuthorized" class="header__link header__account" to="/account">
          <span class="header__link-text">
            {{ shortSurname }}
          </span>

          <svg class="header__link-icon" width="24" height="24" aria-label="Аккаунт пользователя">
            <use :xlink:href="`${sprite}#icon-person`"></use>
          </svg>
        </RouterLink>

        <button ref="authButton" v-else class="header__link header__account" @click="switchAuthCardSnowning">
          <span class="header__link-text">
            Войти
          </span>

          <svg class="header__link-icon" width="24" height="24" aria-label="Аккаунт пользователя">
            <use :xlink:href="`${sprite}#icon-person`"></use>
          </svg>
        </button>
      </div>

      <BaseAuthCard :isAuthCardShown="isAuthCardShown" @switchAuthCardSnowning="switchAuthCardSnowning">
      </BaseAuthCard>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { RouterLink } from 'vue-router'
  import BaseSearch from './BaseSearch.vue';
  import BaseAuthCard from './BaseAuthCard.vue';
  import { useAuthStore } from '@/stores/auth';
  import { useUserStore } from '@/stores/user.ts';
  import sprite from '@/assets/images/sprite.svg';

  const auth = useAuthStore();
  const user = useUserStore();

  const authButton = ref<HTMLElement | null>(null);
  const isAuthCardShown = ref<boolean>(false);
  const isSearchFormShown = ref<boolean>(false);

  const shortSurname = computed(() => {
    if (user.userInfo) {
      if (user.userInfo.surname.length > 10) {
        return user.userInfo.surname.slice(0, 10);
      };

      return user.userInfo.surname;
    };

    return 'Зритель';
  });

  const switchAuthCardSnowning = () => {
    isAuthCardShown.value = !isAuthCardShown.value;

    if (!isAuthCardShown.value) {
      authButton.value?.focus();
    };
  };

  const switchSearchFormShowing = () => {
    isSearchFormShown.value = !isSearchFormShown.value;
  };

  watch(() => auth.isAuthorized, () => {
    if (auth.isAuthorized && isAuthCardShown.value === true) {
      switchAuthCardSnowning();
    };
  });

  watch(() => auth.isLoginRequested, () => {
    if (auth.isLoginRequested) {
      switchAuthCardSnowning();
    };
  });
</script>

<style scoped lang="scss">
  .header {
    position: relative;

    &__wrapper {
      display: flex;
      align-items: center;
      gap: 40px;
      padding: 24px 0;

      @include mixins.vp-1023 {
        gap: 40px;
      }

      @include mixins.vp-767 {
        gap: 20px;
        padding: 16px 0;
      }
    }

    &__logo {
      display: flex;
      align-items: center;
      margin: 0 auto 0 0;

      @media (max-width: 500px) {
        width: 81px;
        height: 32px;
      }
    }

    &__link {
      position: relative;
      font-size: 24px;
      font-weight: 400;
      line-height: 32px;
      background-color: unset;
      color: vars.$color-white;
      border: none;
      outline: none;
      padding: 0;
      cursor: pointer;

      &:hover::before,
      &:focus-visible::before {
        transform: scaleX(1);

        @include mixins.vp-1023 {
          transform: scaleX(0);
        }
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

    &__link-main,
    &__link-text {
      @include mixins.vp-1023 {
        display: none;
      }
    }

    &__link-icon {
      display: none;

      @include mixins.vp-1023 {
        display: block;
      }
    }

    &__search {
      @include mixins.vp-767 {
        position: absolute;
        top: 16px;
        left: 20px;
        right: 20px;
        display: none;
        opacity: 0;
        z-index: 10;
        transform: translateY(-100%);
      }

      &--shown {
        @include mixins.vp-767 {
          display: flex;
          animation: searchSlideInDown vars.$transition-300 forwards;
        }
      }

      &--hidden {
        @include mixins.vp-767 {
          animation: searchSlideOutUp vars.$transition-300 forwards;
        }
      }
    }

    &__search-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      display: none;
      width: 100vw;
      height: 100vh;
      background-color: vars.$color-black-transparent-50;
      opacity: 0;
      z-index: 5;

      &--shown {
        @include mixins.vp-767 {
          display: block;
          animation: backdropFadeIn vars.$transition-300 forwards;
        }
      }

      &--hidden {
        @include mixins.vp-767 {
          animation: backdropFadeOut vars.$transition-300 forwards;
        }
      }
    }

    &__search-btn {
      display: none;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      color: vars.$color-white;
      border: none;
      background-color: transparent;
      padding: 0;
      cursor: pointer;

      @include mixins.vp-767 {
        display: flex;
      }
    }

    &__account {
      margin: 0 0 0 auto;

      @include mixins.vp-1023 {
        margin: 0;
      }
    }
  }

  .router-link-active::before,
  .router-link-exact-active::before {
    transform: scaleX(1);

    @include mixins.vp-1023 {
      transform: scaleX(0);
    }
  }

  @keyframes searchSlideInDown {
    0% {
      display: none;
      opacity: 0;
      transform: translateY(-100%);
    }

    10% {
      display: flex;
      opacity: 0;
      transform: translateY(-100%);
    }

    100% {
      display: flex;
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @keyframes backdropFadeIn {
    0% {
      display: none;
      opacity: 0;
    }

    10% {
      display: block;
      opacity: 0;
    }

    100% {
      display: block;
      opacity: 1;
    }
  }

  @keyframes searchSlideOutUp {
    0% {
      display: flex;
      opacity: 1;
      transform: translateY(0);
    }

    90% {
      display: flex;
      opacity: 0;
      transform: translateY(-100%);
    }

    100% {
      display: none;
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  @keyframes backdropFadeOut {
    0% {
      display: block;
      opacity: 1;
    }

    90% {
      display: block;
      opacity: 0;
    }

    100% {
      display: none;
      opacity: 0;
    }
  }
</style>
