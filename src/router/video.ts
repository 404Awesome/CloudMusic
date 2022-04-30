import { RouteRecordRaw } from "vue-router";

let Video = () => import("@/views/video/video.vue");

let VideoDetails = () => import("@/pages/videoDetails/videoDetails.vue");
let MV = () => import("@/pages/mv/mv.vue");
let MVDetails = () => import("@/views/mvDetails/mvDetails.vue");

// 视频
const routes: RouteRecordRaw[] = [
  {
    path: "/video",
    component: Video,
    redirect: "/video/videoDetails",
    meta: {
      title: "视频",
      tablist: [
        { title: "视频", path: "/video/videoDetails" },
        { title: "MV", path: "/video/mv" },
      ]
    },
    children: [
      {
        path: "videoDetails",
        component: VideoDetails
      },
      {
        path: "mv",
        component: MV
      },
    ]
  },
  {
    path: "/mvDetails/:id",
    component: MVDetails,
    meta: { title: "MV详情" }
  }
];

export default routes;