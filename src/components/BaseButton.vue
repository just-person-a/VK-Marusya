<template>
  <component ref="button" v-bind="$attrs"  :is="to ? 'RouterLink' : 'button'" class="btn" :to="to">
    <span v-if="text" class="btn__text">
      {{ text }}
    </span>

    <svg v-else class="btn__icon" :width="iconWidth" :height="iconHeight" aria-hidden="true">
      <use :xlink:href="`${sprite}#${iconName}`"></use>
    </svg>
  </component>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import sprite from '@/assets/images/sprite.svg';

  const button = ref<HTMLElement | null>(null);

  defineProps<{
    text?: string,
    iconName?: string,
    iconWidth?: number,
    iconHeight?: number,
    to?: string,
  }>();

  defineExpose({
    focus() {
      button.value?.focus();
    },
  });
</script>

<style scoped lang="scss">
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: vars.$color-gray;
    border: 1px solid vars.$color-black-transparent-40;
    border-radius: 28px;
    outline: none;
    transition: border-color vars.$transition-300;
    padding: 16px 48px;
    cursor: pointer;

    &:hover,
    &:focus-visible {
      border-color: vars.$color-purple-light;

      &>.btn__text,
      &>.btn__icon {
        color: vars.$color-purple-light;
      }
    }

    &:active {
      border-color: vars.$color-purple;

      &>.btn__text,
      &>.btn__icon {
        color: vars.$color-purple;
      }
    }

    &--light {
      background-color: vars.$color-blue;
      border-color: vars.$color-blue;
      transition: background-color vars.$transition-300, border-color vars.$transition-300;

      &>.btn__text {
        color: vars.$color-white;
      }

      &:hover,
      &:focus-visible {
        background-color: vars.$color-purple-light;
        border-color: vars.$color-purple-light;

        &>.btn__text {
          color: vars.$color-gray;
        }
      }

      &:active {
        background-color: vars.$color-purple;
        border-color: vars.$color-purple;

        &>.btn__text {
          color: vars.$color-gray;
        }
      }
    }

    &--small {
      padding: 16px 22px;
    }

    &--big {
      width: 100%;
    }

    &--colored-icon {
      .btn__icon {
        color: vars.$color-purple-light;
      }
    }

    &--close {
      background-color: vars.$color-white;
      border: none;
      border-radius: 24px;
      transition: color vars.$transition-300;
      padding: 12px;

      &>.btn__icon {
        color: vars.$color-black;
      }
    }

    &--remove {
      background-color: vars.$color-white;
      border: none;
      border-radius: 30px;
      transition: color vars.$transition-300;
      padding: 8px;

      &>.btn__icon {
        color: vars.$color-black;
      }
    }

    &--play {
      background-color: vars.$color-white;
      border: none;
      border-radius: 40px;
      transition: color vars.$transition-300;
      padding: 20px;

      &>.btn__icon {
        width: 40px;
        height: 40px;
        color: vars.$color-black;

        @include mixins.vp-1023 {
          width: 24px;
          height: 24px;
        }
      }
    }

    &__text {
      font-size: 18px;
      font-weight: 700;
      line-height: 24px;
      color: vars.$color-white;
      transition: color vars.$transition-300;
    }

    &__icon {
      width: 24px;
      height: 24px;
      color: vars.$color-white;
      transition: color vars.$transition-300;
    }
  }
</style>
