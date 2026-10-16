<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__wrapper">
        <BaseSocials></BaseSocials>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import BaseSocials from './BaseSocials.vue';
</script>

<style scoped lang="scss">
  .footer {
    &__wrapper {
      display: flex;
      justify-content: flex-end;
      padding: 40px 0;

      @include mixins.vp-767 {
        justify-content: flex-start;
        padding: 24px 0 36px;
      }
    }
  }
</style>
