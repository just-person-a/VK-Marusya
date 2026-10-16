import { ref } from "vue";
import { defineStore } from "pinia";
import { checkRequest } from "@/composables/checkRequest";
import { errorHandler } from "@/composables/errorHandler";
import type IRate from "@/types/Rate";

export const useRatesStore = defineStore("ratesStore", () => {
  // State
  const rates = ref<IRate[]>([]);
  const isRatesLoaded = ref<boolean>(false);

  // Actions
  const loadRates = async () => {
    if (isRatesLoaded.value) {
      return;
    };

    const request = await fetch("https://api.exchangerate-api.com/v4/latest/USD");

    checkRequest(request, 'Не удалось загрузить часть информации о фильме! Обновите страницу и повторите попытку.');

    const data = await request.json();

    for (const currency of Object.keys(data.rates)) {
      rates.value.push({
        currency: currency,
        rate: data.rates[currency],
      });
    };

    isRatesLoaded.value = true;
  };

  return {
    rates,
    isRatesLoaded,

    loadRates: errorHandler(loadRates),
  };
});
