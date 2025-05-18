export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token").value;
  const user = useCookie("user").value;

  if (to.path === "/" || to.path.startsWith("/blogs")) return;

  if (token) {
    if (user?.role !== "Admin") {
      return navigateTo("/login");

    } else {
      if (to.path === "/login") {
        return navigateTo("/admin");

      }
    } 
  } else {
    if (to.path.startsWith("/admin")) {
      return navigateTo("/login");

    }
  }
});
