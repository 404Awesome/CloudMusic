import { RouteRecordRaw } from "vue-router";
let Video = () => import("@/views/video/video.vue");

// {
//   VideoList: "视频列表",
//   VideoDetail: "视频详情",
//   MVList: "mv列表",
//   MVDetail: "mv详情",
//   AllMV: "全部mv",
//   RankingList: "MV排行榜",
// }
let VideoList = () => import("@/pages/video/videoList/videoList.vue");
let MVList = () => import("@/pages/video/mvList/mvList.vue");
let MVDetail = () => import("@/pages/video/mvDetail/mvDetail.vue");
let VideoDetail = () => import("@/pages/video/videoDetail/videoDetail.vue");
let AllMV = () => import("@/pages/video/allMV/allMV.vue");
let RankingList = () => import("@/pages/video/rankingList/rankingList.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/video",
    component: Video,
    redirect: "/video/videoList",
    meta: {
      title: "视频",
      tablist: [
        { title: "视频", path: "/video/videoList" },
        { title: "MV", path: "/video/mvList" },
      ]
    },
    children: [{
      path: "videoList",
      component: VideoList
    }, {
      path: "mvList",
      component: MVList
    }]
  },
  {
    path: "/mvDetail/:id",
    component: MVDetail,
    meta: { title: "MV详情" }
  },
  {
    path: "/videoDetail",
    component: VideoDetail,
    meta: { title: "视频详情" }
  },
  {
    path: "/allMV",
    component: AllMV,
    meta: { title: "全部MV" }
  },
  {
    path: "/mvRankingList",
    component: RankingList,
    meta: { title: "MV排行榜" }
  }
];

export default routes;