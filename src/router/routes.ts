import { RouteRecordRaw } from "vue-router";
import discover from "./discover";
import video from "./video";

let Login = () => import("@/views/login/login.vue");
let Error = () => import("@/views/error/error.vue");
let PrivateFM = () => import("@/views/privateFM/privateFM.vue");
let Following = () => import("@/views/following/following.vue");
let Broadcast = () => import("@/pages/broadcast/broadcast.vue");
let DailySongs = () => import("@/views/dailySongs/dailySongs.vue");
let Setting = () => import("@/views/setting/setting.vue");
let Notice = () => import("@/views/notice/notice.vue");

const routes: RouteRecordRaw[] = [
  // 路由默认发现音乐
  {
    path: "/",
    redirect: "/discover"
  },
  // 登陆
  {
    path: "/login",
    component: Login,
    meta: { title: "登陆" }
  },
  // 错误收集页 404
  {
    path: '/:pathMatch(.*)',
    component: Error,
    meta: { title: "404 Not Found" }
  },
  // 关注
  {
    path: "/following",
    meta: { title: "关注" },
    component: Following
  },
  // 私人FM 
  {
    path: "/privateFM",
    meta: { title: "私人FM" },
    component: PrivateFM
  },
  // 独家放送
  {
    path: "/broadcast",
    meta: { title: "独家放送" },
    component: Broadcast
  },
  // 每日歌曲推荐
  {
    path: "/dailySongs",
    component: DailySongs,
    meta: { title: "每日歌曲推荐" }
  },
  // 设置
  {
    path: "/setting",
    component: Setting,
    meta: { title: "设置" }
  },
  // 通知
  {
    path: "/notice",
    component: Notice,
    meta: { title: "消息" }
  },
  // 发现音乐
  ...discover,
  // 视频
  ...video,
];

export default routes;