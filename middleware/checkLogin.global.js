export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token").value;
  const user = useCookie("user").value;

  if (to.path === "/login" || to.path.startsWith("/blogs")) return;

  if (token) {
    if (user?.role !== "Admin") {
      return navigateTo("/login");
    }
  } else if (to.path === "/") {
    return;
  } else {
    return navigateTo("/login");
  }
});
