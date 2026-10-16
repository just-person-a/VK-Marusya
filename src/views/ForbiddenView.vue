<template>
  <section class="forbidden">
    <div class="container">
      <div class="forbidden__wrapper">
        <h1 class="forbidden__heading">
          404
        </h1>

        <p class="forbidden__description">
          Что-то пошло не&nbsp;так, или страница не&nbsp;найдена...
        </p>

        <BaseButton class="btn--light" to="/" text="На Главную"></BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/BaseButton.vue';
</script>

<style scoped lang="scss">
  .forbidden {
    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 96px - 120px);
      padding: 64px 0;
    }

    &__heading {
      font-size: 180px;
      font-weight: 700;
      line-height: 188px;
      margin: 0;
    }

    &__description {
      width: 350px;
      font-size: 24px;
      font-weight: 400;
      line-height: 32px;
      text-align: center;
      margin: 0 0 64px;
    }
  }
</style>
