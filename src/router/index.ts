import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: "main",
      path: "/",
      component: () => import("@/views/MainPageView.vue"),
      meta: {
        title: "Главная страница",
      },
    },
    {
      path: "/genres",
      children: [
        {
          name: "genres",
          path: "",
          component: () => import("@/views/GenresView.vue"),
        },
        {
          name: "genre",
          path: ":name",
          component: () => import("@/views/GenreView.vue"),
        },
      ],
      meta: {
        title: "Жанры фильмов",
      },
    },
    {
      path: "/account",
      children: [
        {
          name: "favorites",
          path: "",
          component: () => import("@/views/FavoritesView.vue"),
        },
        {
          name: "settings",
          path: "settings",
          component: () => import("@/views/AccountSettingsView.vue"),
        },
      ],
      component: () => import("@/views/AccountView.vue"),
      meta: {
        title: "Мой аккаунт",
        requiresAuth: true,
      },
    },
    {
      name: "movie",
      path: "/movie/:id",
      component: () => import("@/views/MovieView.vue"),
      meta: {
        title: "О фильме",
      },
    },
    {
      name: "forbidden",
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/ForbiddenView.vue"),
      meta: {
        title: "404",
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthorized) {
    return "/";
  };
});

export default router
