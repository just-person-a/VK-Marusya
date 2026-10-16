<template>
  <section class="info">
    <div class="container">
      <div class="info__wrapper">
        <h2 class="info__heading">
          О фильме
        </h2>

        <ul v-if="movie && isMovieInfoExist" class="info__list">
          <li v-if="movie.language" class="info__item">
            <div class="info__param">
              <span>Язык оригинала</span><span></span>
            </div>

            <span class="info__value">{{ fullLanguageName }}</span>
          </li>

          <li v-if="movie.budget && rates.isRatesLoaded" class="info__item">
            <div class="info__param">
              <span>Бюджет</span><span></span>
            </div>

            <span class="info__value">
              {{ `${localeMovieBudget} руб.` }}
            </span>
          </li>

          <li v-if="movie.revenue && rates.isRatesLoaded" class="info__item">
            <div class="info__param">
              <span>Выручка</span><span></span>
            </div>

            <span class="info__value">
              {{ `${localeMovieRevenue} руб.` }}
            </span>
          </li>

          <li v-if="movie.director" class="info__item">
            <div class="info__param">
              <span>Режиссёр</span><span></span>
            </div>

            <span class="info__value">{{ movie.director }}</span>
          </li>

          <li v-if="movie.production" class="info__item">
            <div class="info__param">
              <span>Продакшен</span><span></span>
            </div>

            <span class="info__value">{{ movie.production }}</span>
          </li>

          <li v-if="movie.awardsSummary" class="info__item">
            <div class="info__param">
              <span>Награды</span><span></span>
            </div>

            <span class="info__value">{{ movie.awardsSummary }}</span>
          </li>
        </ul>

        <span v-else class="info__empty">
          Информация о фильме отсутствует.
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue';
  import { useRatesStore } from '@/stores/rates';
  import type IMovie from '@/types/Movie';

  const props = defineProps<{
    movie: IMovie | undefined,
  }>();

  const rates = useRatesStore();

  const isMovieInfoExist = computed(() => {
    if (props.movie) {
      return !!props.movie.language || !!props.movie.budget || !!props.movie.revenue || !!props.movie.director
        || !!props.movie.production || !!props.movie.awardsSummary;
    };
    return false;
  });

  const fullLanguageName = computed(() => {
    if (props.movie?.language) {
      const intlNames = new Intl.DisplayNames(['ru'], { type: 'language' });
      const languageName = intlNames.of(props.movie.language);

      return `${languageName?.slice(0, 1).toLocaleUpperCase()}${languageName?.slice(1)}`;
    };
    return props.movie?.language;
  });

  const rubRate = computed(() => rates.rates.find(rate => rate.currency === 'RUB')?.rate);

  const localeMovieBudget = computed(() => {
    if (props.movie?.budget && rubRate.value) {
      const currentLocaleBudget = +props.movie?.budget * rubRate.value;

      return new Intl.NumberFormat('ru', {
        style: 'decimal',
        maximumFractionDigits: 0,
      }).format(currentLocaleBudget);
    };

    return "";
  });

  const localeMovieRevenue = computed(() => {
    if (props.movie?.revenue && rubRate.value) {
      const currentLocaleRevenue = +props.movie?.revenue * rubRate.value;

      return new Intl.NumberFormat('ru', {
        style: 'decimal',
        maximumFractionDigits: 0,
      }).format(currentLocaleRevenue);
    };

    return "";
  });

  onMounted(() => {
    rates.loadRates();
  });
</script>

<style scoped lang="scss">
  .info {
    &__wrapper {
      padding: 40px 0 120px;

      @include mixins.vp-1023 {
        padding: 56px 0 80px;
      }

      @include mixins.vp-767 {
        padding: 56px 0 32px;
      }
    }

    &__heading {
      font-size: 40px;
      font-weight: 700;
      line-height: 48px;
      color: vars.$color-white;
      margin: 0 0 64px;

      @include mixins.vp-1359 {
        font-size: 36px;
        line-height: 42px;
      }

      @include mixins.vp-1023 {
        font-size: 30px;
        line-height: 36px;
        margin: 0 0 40px;
      }

      @include mixins.vp-767 {
        font-size: 24px;
        line-height: 32px;
      }
    }

    &__list {
      @include mixins.list-params-unset;
      display: flex;
      flex-direction: column;
      gap: 24px;

      @include mixins.vp-767 {
        gap: 12px;
      }
    }

    &__item {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      color: vars.$color-white;

      @include mixins.vp-767 {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
    }

    &__param {
      display: flex;
      gap: 8px;
      width: 320px;

      @include mixins.vp-1023 {
        width: 220px;
      }

      @include mixins.vp-767 {
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        color: vars.$color-white-transparent-50;

        &>span:last-child {
          display: none;
        }
      }

      &>span:last-child {
        position: relative;
        flex-grow: 1;

        &::after {
          content: '';
          position: absolute;
          bottom: 6px;
          width: 100%;
          height: 100%;
          border-bottom: 1px dashed vars.$color-white-transparent-50;
        }
      }
    }

    &__empty {
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      color: vars.$color-white;
    }
  }
</style>
