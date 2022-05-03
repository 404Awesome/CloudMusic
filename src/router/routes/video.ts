import { RouteRecordRaw } from "vue-router";
let Video = () => import("@/views/video/video.vue");

// 列表
let VideoList = () => import("@/pages/video/videoList/videoList.vue");
let MVList = () => import("@/pages/video/mvList/mvList.vue");

// 详情
let MVDetails = () => import("@/pages/video/mvDetails/mvDetails.vue");
let VideoDetails = () => import("@/pages/videoDetails/VideoDetails.vue");

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
    children: [
      {
        path: "videoList",
        component: VideoList
      },
      {
        path: "mvList",
        component: MVList
      },
    ]
  },
  {
    path: "/mvDetails/:id",
    component: MVDetails,
    meta: { title: "MV详情" }
  },
  {
    path: "/videoDetails",
    component: VideoDetails,
    meta: { title: "视频详情" }
  }
];

export default routes;