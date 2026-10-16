<template>
  <div :class="['rating', `rating--${ratingColor}`]">
    <svg class="rating__icon" width="16" height="16" aria-hidden="true">
      <use xlink:href="@/assets/images/sprite.svg#icon-star"></use>
    </svg>

    <span class="rating__value">
      {{ ratingString }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  const props = defineProps<{
    rating: number,
  }>();

  const ratingString = computed(() => `${props.rating}`.slice(0, 3).replace('.', ","));

  const ratingColor = computed(() => {
    if (props.rating >= 8.6) {
      return 'gold';
    }
    else if (props.rating >= 7.5) {
      return 'green';
    }
    else if (props.rating >= 6.3) {
      return 'platinum';
    }
    else {
      return 'red';
    };
  });
</script>

<style scoped lang="scss">
  .rating {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    width: 70px;
    height: 32px;
    border-radius: 16px;

    &--gold {
      background-color: vars.$color-gold;
    }

    &--green {
      background-color: vars.$color-green;
    }

    &--platinum {
      background-color: vars.$color-platinum;
    }

    &--red {
      background-color: vars.$color-red;
    }

    &--small {
      width: 47px;
      height: 20px;

      &>.rating__icon {
        width: 10px;
        height: 10px;
      }

      &>.rating__value {
        font-size: 12px;
        line-height: 16px;
      }
    }

    &__icon {
      width: 16px;
      height: 16px;
      color: vars.$color-white;
    }

    &__value {
      font-size: 18px;
      font-weight: 700;
      line-height: 24px;
      color: vars.$color-white;
    }
  }
</style>
