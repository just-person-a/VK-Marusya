<template>
  <div :class="['custom-input', { 'custom-input--search': type === 'search', 'custom-input--error': isError }]">
    <input class="custom-input__field" :type="type" :id="id" :name="name" :placeholder="placeholder" :value="modelValue"
      @input="onInput">

    <svg class="custom-input__icon" width="24" height="24" aria-hidden="true">
      <use :xlink:href="`${sprite}#${props.iconName}`"></use>
    </svg>

    <button v-if="type === 'search'" class="custom-input__clear-btn" type="button" @click="emits('clearForm')"
      aria-label="Очистить поиск">
      <svg class="custom-input__clear-icon" width="24" height="24" aria-hidden="true">
        <use xlink:href="@/assets/images/sprite.svg#icon-cross-small"></use>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
  import sprite from "@/assets/images/sprite.svg";

  const props = defineProps<{
    iconName: string,
    type: string,
    id: string,
    name: string,
    placeholder: string,
    modelValue: string,
    isError?: boolean,
  }>();

  const emits = defineEmits<{
    (name: "clearForm"): void,
    (name: "update:modelValue", value: string): void,
  }>();

  const onInput = (event: InputEvent) => {
    emits("update:modelValue", (event.target as HTMLInputElement).value);
  };
</script>

<style scoped lang="scss">
  .custom-input {
    position: relative;
    display: flex;

    &--search {
      & .custom-input__field {
        min-width: 656px;
        color: vars.$color-white;
        background-color: vars.$color-gray;
        border-color: vars.$color-gray;
        padding: 12px 52px;

        @include mixins.vp-1359 {
          min-width: 450px;
        }

        @media (max-width: 1109px) {
          min-width: 350px;
        }

        @include mixins.vp-767 {
          min-width: calc(100vw - 40px);
          padding: 16px 52px;
        }

        &:hover,
        &:focus-visible {
          background-color: vars.$color-gray;
          border-color: vars.$color-purple-light;
        }

        &:not(:placeholder-shown) {
          background-color: vars.$color-gray;

          &~.custom-input__icon {
            color: vars.$color-white;
          }

          &~.custom-input__clear-btn {
            display: flex;
            animation: buttonSlideFadeIn vars.$transition-300 forwards;
          }
        }

        &:placeholder-shown {
          &~.custom-input__clear-btn {
            display: none;
            animation: buttonSlideFadeOut vars.$transition-300 forwards;
          }
        }

        &::placeholder {
          color: vars.$color-white-transparent-50;
        }
      }

      & .custom-input__icon {
        color: vars.$color-white-transparent-50;
      }
    }

    &--error {
      & .custom-input__field {
        background-color: vars.$color-white-transparent-15;
        border-color: vars.$color-error;
      }

      &.custom-input--search .custom-input__field {
        background-color: vars.$color-gray;
      }

      & .custom-input__icon {
        color: vars.$color-error;
      }
    }

    &__field {
      min-width: 280px;
      width: 100%;
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      color: vars.$color-black;
      background-color: vars.$color-white;
      border: 1px solid vars.$color-black-transparent-40;
      border-radius: 8px;
      outline: none;
      padding: 16px 16px 16px 52px;
      transition: border-color vars.$transition-300, background-color vars.$transition-300;

      &:hover,
      &:focus-visible {
        border-color: vars.$color-purple-light;
        background-color: vars.$color-white-transparent-15;

        &~.custom-input__icon {
          color: vars.$color-purple-light;
        }
      }

      &:not(:placeholder-shown) {
        background-color: vars.$color-white-transparent-15;
      }

      &::placeholder {
        color: vars.$color-black-transparent-40;
      }
    }

    &__icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: vars.$color-black-transparent-40;
      pointer-events: none;
      transition: color vars.$transition-300;
    }

    &__clear-btn {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translate(100%, -50%);
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 0;

      &:hover .custom-input__clear-icon,
      &:focus-visible .custom-input__clear-icon {
        color: vars.$color-purple-light;
      }
    }

    &__clear-icon {
      color: vars.$color-white-transparent-50;
      transition: color vars.$transition-300;
    }

    @keyframes buttonSlideFadeIn {
      0% {
        display: none;
        opacity: 0;
        transform: translate(100%, -50%);
      }

      1% {
        display: flex;
        opacity: 0;
        transform: translate(100%, -50%);
      }

      100% {
        display: flex;
        opacity: 1;
        transform: translate(0, -50%);
      }
    }

    @keyframes buttonSlideFadeOut {
      0% {
        display: flex;
        opacity: 1;
        transform: translate(0, -50%);
      }

      99% {
        display: flex;
        opacity: 0;
        transform: translate(100%, -50%);
      }

      100% {
        display: none;
        opacity: 0;
        transform: translate(100%, -50%);
      }
    }
  }
</style>
