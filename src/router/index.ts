import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import SchoolStats from "../components/SchoolStats.vue";
import { useAuthStore } from "../stores/auth";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: "/stats",
    name: "SchoolStats",
    component: SchoolStats,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !authStore.token
  ) {
    next("/login");
  } else if (
    to.matched.some((record) => record.meta.requiresGuest) &&
    authStore.token
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
