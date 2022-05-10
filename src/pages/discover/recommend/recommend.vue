<!-- 个性推荐 -->
<template>
  <div>
    <!-- 轮播图 -->
    <Carousel :data="banner" />

    <!-- 渲染列表 -->
    <div class="renderList" v-for="item in renderList" :key="item.path">
      <!-- 导航栏 -->
      <NavBar :path="item.path" :title="item.title" />
      <!-- 动态组件 -->
      <component :is="item.component" />
    </div>
  </div>
</template>

<script setup lang="ts" name="recommend">
import Carousel from "@/components/common/carousel/carousel.vue";
import NavBar from "@/components/common/navBar/navBar.vue";
import SongList from "./coms/songList.vue";
import Broadcast from "./coms/broadcast.vue";
import NewSong from "./coms/newSong.vue";
import Radio from "./coms/radio.vue";
import MV from "./coms/mv.vue";
import { Discover } from "@/api/modules/discover";

// 渲染列表
let renderList = reactive([
  {
    title: "推荐歌单",
    path: "/discover/playList",
    component: shallowRef(SongList),
  },
  {
    title: "独家放送",
    path: "/discover/broadcast",
    component: shallowRef(Broadcast),
  },
  {
    title: "最新音乐",
    path: "/discover/newSong",
    component: shallowRef(NewSong),
  },
  {
    title: "推荐MV",
    path: "/video/mvList",
    component: shallowRef(MV),
  },
  {
    title: "主播电台",
    path: "/discover/radioStation",
    component: shallowRef(Radio),
  },
]);

// 获取 banner
let banner: any = reactive([]);
onMounted(async () => {
  let { banners }: any = await Discover.getBanner();
  banner.push(...banners);
});
</script>

<style lang="scss" scoped>
.renderList {
  margin: 30px auto 0px;
  width: 80%;
}
</style>
