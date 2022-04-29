import { RouteRecordRaw } from "vue-router";

let Discover = () => import("@/views/discover/discover.vue");

let Recommend = () => import("@/pages/recommend/recommend.vue");
let PlayList = () => import("@/pages/playlist/playlist.vue");
let Ranking = () => import("@/pages/ranking/ranking.vue");
let Singer = () => import("@/pages/singer/singer.vue");
let NewMusic = () => import("@/pages/newMusic/newMusic.vue");
let RadioStation = () => import("@/pages/radioStation/radioStation.vue");

// 发现音乐
const routes: RouteRecordRaw[] = [
  {
    path: "/discover",
    component: Discover,
    redirect: "/discover/recommend",
    meta: {
      title: "发现音乐",
      tablist: [
        { title: "个性推荐", path: "/discover/recommend" },
        { title: "歌单", path: "/discover/playlist" },
        { title: "排行榜", path: "/discover/ranking" },
        { title: "歌手", path: "/discover/singer" },
        { title: "最新音乐", path: "/discover/newMusic" },
        { title: "主播电台", path: "/discover/radioStation" },
      ]
    },
    children: [
      // 个人推荐
      {
        path: "recommend",
        component: Recommend,
      },
      // 歌单
      {
        path: "playlist",
        component: PlayList
      },
      // 排行榜
      {
        path: "ranking",
        component: Ranking
      },
      // 歌手
      {
        path: "singer",
        component: Singer
      },
      // 最新音乐
      {
        path: "newmusic",
        component: NewMusic
      },
      // 主播电台
      {
        path: "radioStation",
        component: RadioStation
      }
    ]
  }
];

export default routes;