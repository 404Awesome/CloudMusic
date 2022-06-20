import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  // 更改标题
  document.title = `CloudMusic ${to.matched[0].meta.title as string}`;
  // 判断有没有权限
  if (to.meta.auth) {
    let auth = localStorage.getItem("auth");
    auth ? next() : next("/account/login");
  } else {
    next();
  }
});

export default router;
