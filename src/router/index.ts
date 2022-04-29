import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  document.title = `CloudMusic ${to.matched[0].meta.title as string}`;
  next()
})

export default router;
