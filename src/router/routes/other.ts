import { RouteRecordRaw } from "vue-router";

/*
 * Setting: "设置",
 * PrivateFM: "私人FM",
 * Error: "404 Not Found",
 * Search: "搜索页面",
 */
let Setting = () => import("@/views/setting/setting.vue");
let PrivateFM = () => import("@/views/privateFM/privateFM.vue");
let Error = () => import("@/views/error/error.vue");
let Search = () => import("@/views/search/search.vue");

const routes: RouteRecordRaw[] = [
  // 搜索页面
  {
    path: "/search/:keyword",
    meta: { title: "搜索" },
    component: Search
  },
  // 私人FM
  {
    path: "/privateFM",
    meta: { title: "私人FM", auth: true },
    component: PrivateFM
  },
  // 设置
  {
    path: "/setting",
    component: Setting,
    meta: { title: "设置" },
  },
  // 404 
  {
    path: '/:pathMatch(.*)',
    component: Error,
    meta: { title: "404 Not Found" }
  }
];

export default routes;