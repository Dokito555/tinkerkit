import { defineNuxtRouteMiddleware, useFetch, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return;

  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);

  try {
    const { data, error } = await useFetch("/api/auth/me");

    if (error.value && authRequired) {
      return navigateTo("/login");
    }

  } catch (error) {
    if (authRequired) {
      return navigateTo("/login");
    }
  }
});
