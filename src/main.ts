import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createHead } from '@vueuse/head';
import { useAuthStore } from './stores/auth.ts';

import App from './App.vue';
import router from './router';

import './assets/styles/_container.scss';
import './assets/styles/_fonts.scss';
import './assets/styles/_normalize.scss';
import './assets/styles/_reboot.scss';
import './assets/styles/_visually-hidden.scss';

const app = createApp(App);
const head = createHead();

app.use(createPinia());

const auth = useAuthStore();
await auth.checkAuthorization();

app.use(router);
app.use(head);

app.mount('#app');
