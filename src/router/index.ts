import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  document.title = `CloudMusic ${to.matched[0].meta.title as string}`;
  next()
})

export default router;
