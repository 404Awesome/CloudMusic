<!-- 电台 -->
<template>
  <!-- 轮播图 -->
  <Carousel :bannerList="bannerList" />

  <!-- 电台分类 -->
  <CateList />

  <!-- 付费精选 -->
  <PaidBoutique />

  <!-- 渲染列表 -->
  <div v-for="item in renderList" :key="item.cateId">
    <component :is="CateRadio" v-bind="item" />
  </div>
</template>

<script setup lang="ts">
import Carousel, { BannerItem } from "@/components/common/carousel/carousel.vue";
import CateList from "./coms/cateList.vue";
import PaidBoutique from "./coms/paidBoutique.vue";
import CateRadio from "./coms/cateRadio.vue";
import { reactive, onMounted } from "vue";
import { RadioAPI } from "api";

// 渲染列表
let renderList = reactive([{
  title: "创作翻唱",
  path: "/haha",
  cateId: 2001,
}, {
  title: "音乐推荐",
  path: "/haha",
  cateId: 2,
}, {
  title: "情感",
  path: "/haha",
  cateId: 3,
}, {
  title: "脱口秀",
  path: "/haha",
  cateId: 8,
}]);

// banner列表
let bannerList = reactive<BannerItem[]>([]);
// 加载banner列表
onMounted(async () => {
  let { code, data }: any = await RadioAPI.getBanner();
  if (code == 200) bannerList.push(...data);
});
</script>
