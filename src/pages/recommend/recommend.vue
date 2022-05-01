<template>
  <div>
    <!-- 轮播图 -->
    <Carousel :data="banner" />

    <!-- 渲染列表 -->
    <div class="renderList" v-for="item in renderList" :key="item.path">
      <nav class="nav">
        <h4 @click="$router.push(item.path)">{{ item.title }}</h4>
        <span class="i-heroicons-outline:chevron-right"></span>
      </nav>

      <component :is="item.component" />
    </div>
  </div>
</template>

<script setup lang="ts" name="recommend">
import Carousel from "@/components/carousel/carousel.vue";
import PlayList from "./coms/playlist.vue";
import Broadcast from "./coms/broadcast.vue";
import NewMusic from "./coms/newmusic.vue";
import Radio from "./coms/radio.vue";
import MV from "./coms/mv.vue";
import { getBanner } from "@/api/discover";

// 渲染列表
let renderList = reactive([
  {
    title: "推荐歌单",
    path: "/discover/playlist",
    component: shallowRef(PlayList),
  },
  {
    title: "独家放送",
    path: "/broadcast",
    component: shallowRef(Broadcast),
  },
  {
    title: "最新音乐",
    path: "/discover/newmusic",
    component: shallowRef(NewMusic),
  },
  {
    title: "主播电台",
    path: "/discover/radioStation",
    component: shallowRef(Radio),
  },
  {
    title: "推荐MV",
    path: "/video/mv",
    component: shallowRef(MV),
  },
]);

// 获取 banner
let banner: any = reactive([]);
onMounted(async () => {
  let { banners }: any = await getBanner();
  banner.push(...banners);
});
</script>

<style lang="scss" scoped>
.renderList {
  margin: 30px 0px;
  width: 100%;

  // 头部
  nav.nav {
    display: flex;
    align-items: center;
    padding: 0px 30px;
    color: var(--font-color);

    h4 {
      margin: 0;
      margin-right: 5px;
      font-weight: 400;
      font-size: 17px;
      cursor: pointer;

      &:hover {
        color: var(--theme-bg-color);

        & + span {
          color: var(--theme-bg-color);
          transform: translateX(5px);
        }
      }
    }

    span {
      font-size: 20px;
      transition: transform 0.2s ease-in-out;
    }
  }
}
</style>
