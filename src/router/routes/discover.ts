import { RouteRecordRaw } from "vue-router";

/*
 * Discover: "发现音乐",
 * Recommend: "个性推荐",
 * PlayList: "歌单",
 * Ranking: "排行榜",
 * Singer: "歌手",
 * NewSong: "最新音乐",
 * RadioStation: "主播电台",
 * DailySongs: "每日歌曲推荐",
 * Broadcast: "独家放送",
 * PlayListDetail: "歌单详情",
 */
let Discover = () => import("@/views/discover/discover.vue");
let Recommend = () => import("@/pages/discover/recommend/recommend.vue");
let SongList = () => import("@/pages/discover/songList/songList.vue");
let Ranking = () => import("@/pages/discover/ranking/ranking.vue");
let Singer = () => import("@/pages/discover/singer/singer.vue");
let NewSong = () => import("@/pages/discover/newSong/newSong.vue");
let RadioStation = () => import("@/pages/discover/radioStation/radioStation.vue");
let DailySongs = () => import("@/pages/discover/dailySongs/dailySongs.vue")
let Broadcast = () => import("@/pages/discover/broadcast/broadcast.vue");
let SongListDetail = () => import("@/pages/discover/songListDetail/songListDetail.vue");
let SingerDetail = () => import("@/pages/discover/singerDetail/singerDetail.vue");


// 默认为发现音乐
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/discover"
  },
  {
    path: "/discover",
    component: Discover,
    redirect: "/discover/recommend",
    meta: {
      title: "发现音乐",
      tablist: [
        { title: "个性推荐", path: "/discover/recommend" },
        { title: "歌单", path: "/discover/songList" },
        { title: "排行榜", path: "/discover/ranking" },
        { title: "歌手", path: "/discover/singer" },
        { title: "最新音乐", path: "/discover/newSong" },
        { title: "主播电台", path: "/discover/radioStation" },
      ]
    },
    children: [{
      path: "recommend",
      component: Recommend,
    }, {
      path: "songList",
      component: SongList,
    }, {
      path: "ranking",
      component: Ranking
    }, {
      path: "singer",
      component: Singer
    }, {
      path: "newSong",
      component: NewSong
    }, {
      path: "radioStation",
      component: RadioStation
    }]
  },
  // 每日推荐
  {
    path: "/dailySongs",
    component: DailySongs,
    meta: { title: "每日推荐", auth: true }
  },
  // 歌单详情
  {
    path: "/songListDetal/:id",
    meta: { title: "歌单详情" },
    component: SongListDetail
  },
  // 独家放送
  {
    path: "/broadcast",
    meta: { title: "独家放送" },
    component: Broadcast
  },
  // 歌手详情
  {
    path: "/singerDetail",
    meta: { title: "歌手详情" },
    component: SingerDetail
  }
];

export default routes;  