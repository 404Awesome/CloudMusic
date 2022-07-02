import { RouteRecordRaw } from "vue-router";
import { useMainStore } from "store";

/*
 * Account: "账户",
 * Login: "登陆",
 * Register: "注册",
 * Following: "关注",
 * Notice: "通知",
 * MyHomePage: "我的主页",
 * OtherHomePage: "他人主页",
 * EditPersonalInfo: "编辑个人信息",
 * Dynamic: "个人动态",
 * Follows: "个人关注",
 * Followeds: "个人粉丝",
 */
let Account = () => import("@/views/account/account.vue");
let Login = () => import("@/pages/account/login/login.vue");
let Register = () => import("@/pages/account/register/register.vue");
let Following = () => import("@/pages/account/following/following.vue");
let Notice = () => import("@/pages/account/notice/notice.vue");
let PersonalInfo = () => import("@/pages/account/personalInfo/personalInfo.vue");
let OthersInfo = () => import("@/pages/account/othersInfo/othersInfo.vue");
let EditPersonalInfo = () => import("@/pages/account/editPersonalInfo/editPersonalInfo.vue");
let Dynamic = () => import("@/pages/account/dynamic/dynamic.vue");
let Follows = () => import("@/pages/account/follows/follows.vue");
let Followeds = () => import("@/pages/account/followeds/followeds.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/account",
    component: Account,
    redirect: "/account/login",
    beforeEnter() {
      const store = useMainStore();
      if (store.auth) {
        return "/personalInfo"
      } else {
        return true;
      }
    },
    meta: {
      title: "账户",
      tablist: [
        { title: "登陆", path: "/account/login" },
        { title: "注册", path: "/account/register" },
      ],
    },
    children: [{
      path: "login",
      component: Login,
    }, {
      path: "register",
      component: Register,
    }]
  },
  // 关注
  {
    path: "/following",
    meta: { title: "关注", auth: true },
    component: Following
  },
  // 消息
  {
    path: "/notice",
    component: Notice,
    meta: { title: "消息", auth: true },
  },
  // 我的主页
  {
    path: "/personalInfo",
    component: PersonalInfo,
    meta: { title: "我的主页", auth: true },
  },
  // 个人主页
  {
    path: "/othersInfo/:uid",
    component: OthersInfo,
    meta: { title: "个人主页", auth: true },
  },
  // 编辑个人信息
  {
    path: "/editPersonalInfo",
    component: EditPersonalInfo,
    meta: { title: "编辑个人信息", auth: true },
  },
  // 个人动态
  {
    path: "/dynamic/:uid",
    component: Dynamic,
    meta: { title: "个人动态", auth: true },
  },
  // 个人关注
  {
    path: "/follows/:uid",
    component: Follows,
    meta: { title: "个人关注", auth: true },
  },
  // 个人粉丝
  {
    path: "/followeds/:uid",
    component: Followeds,
    meta: { title: "个人粉丝", auth: true },
  },
];

export default routes;