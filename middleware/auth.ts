//navigation guard to check is admin

export default defineNuxtRouteMiddleware((to, from) => {
  return navigateTo("/");
});
