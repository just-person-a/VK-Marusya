<template>
  <ul class="socials">
    <li v-for="social of socials" :key="social.id" class="socials__item">
      <a class="socials__link" :href="social.href"
        :aria-label="`Ссылка на ${social.name}`">
        <svg class="socials__icon" :width="24" :height="24" aria-hidden="true">
          <use :xlink:href="`${sprite}#${social.iconName}`"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import sprite from '@/assets/images/sprite.svg';
  import type ISocial from '@/types/Social';

  const socials = ref<ISocial[]>([
    {
      id: 0,
      name: "ВКонтакте",
      href: "https://vk.com/feed",
      iconName: "icon-vk",
    },
    {
      id: 1,
      name: "YouTube",
      href: "https://www.youtube.com/",
      iconName: "icon-youtube",
    },
    {
      id: 2,
      name: "Одноклассники",
      href: "https://ok.ru/",
      iconName: "icon-ok",
    },
    {
      id: 3,
      name: "Телеграм",
      href: "https://web.telegram.org/a/",
      iconName: "icon-telegram",
    }
  ]);
</script>

<style scoped lang="scss">
  .socials {
    @include mixins.list-params-unset;
    display: flex;
    gap: 24px;

    &__item {
      display: flex;
    }

    &__link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: 1px solid vars.$color-white-transparent-80;
      border-radius: 8px;
      outline: none;
      transition: border-color vars.$transition-300;

      @include mixins.vp-767 {
        width: 24px;
        height: 24px;
      }

      &:hover,
      &:focus-visible {
        border-color: vars.$color-purple-light;

        &>.socials__icon {
          color: vars.$color-purple-light;
        }
      }

      &:active {
        border-color: vars.$color-purple;

        &>.socials__icon {
          color: vars.$color-purple;
        }
      }
    }

    &__icon {
      width: 24px;
      height: 24px;
      color: white;
      transition: color vars.$transition-300;

      @include mixins.vp-767 {
        width: 16px;
        height: 16px;
      }
    }
  }
</style>
