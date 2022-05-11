import { RouteRecordRaw } from "vue-router";

// {
//   Account: "账户",
//   Login: "登陆",
//   Register: "注册",
//   Following: "关注",
//   Notice: "通知",
// }
let Account = () => import("@/views/account/account.vue");
let Login = () => import("@/pages/account/login/login.vue");
let Register = () => import("@/pages/account/register/register.vue");
let Following = () => import("@/pages/account/following/following.vue");
let Notice = () => import("@/pages/account/notice/notice.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/account",
    component: Account,
    redirect: "/account/login",
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
  {
    path: "/following",
    meta: { title: "关注", auth: true },
    component: Following
  },
  {
    path: "/notice",
    component: Notice,
    meta: { title: "消息", auth: true },
  },
];

export default routes;