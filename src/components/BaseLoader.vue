<template>
  <span class="loader"></span>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .loader {
    width: 48px;
    height: 48px;
    display: block;
    margin: 15px auto;
    position: relative;
    color: #FFF;
    box-sizing: border-box;
    animation: loaderRotate 1s linear infinite;

    &::after,
    &::before {
      content: '';
      box-sizing: border-box;
      position: absolute;
      width: 24px;
      height: 24px;
      top: 50%;
      left: 50%;
      transform: scale(0.5) translate(0, 0);
      background-color: #FFF;
      border-radius: 50%;
      animation: loaderScale 1s infinite ease-in-out;
    }

    &::before {
      background-color: #DC5DFC;
      transform: scale(0.5) translate(-48px, -48px);
    }
  }

  @keyframes loaderRotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes loaderScale {
    50% {
      transform: scale(1) translate(-50%, -50%);
    }
  }
</style>
