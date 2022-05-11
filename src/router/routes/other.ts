import { RouteRecordRaw } from "vue-router";

// {
//   Setting: "设置",
//   PrivateFM: "私人FM",
//   Error: "404 Not Found",
// }
let Setting = () => import("@/views/setting/setting.vue");
let PrivateFM = () => import("@/views/privateFM/privateFM.vue");
let Error = () => import("@/views/error/error.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/privateFM",
    meta: { title: "私人FM" },
    component: PrivateFM
  },
  {
    path: "/setting",
    component: Setting,
    meta: { title: "设置" },
  },
  {
    path: '/:pathMatch(.*)',
    component: Error,
    meta: { title: "404 Not Found" }
  }
];

export default routes;