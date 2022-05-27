<!-- 电台 -->
<template>
  <div>
    <!-- 轮播图 -->
    <Carousel :data="banner" />

    <!-- 电台分类 -->
    <CateList />

    <!-- 付费精选 -->
    <PaidBoutique />

    <!-- 渲染列表 -->
    <div v-for="item in renderList" :key="item.cateId">
      <component :is="CateRadio" v-bind="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from "@/components/common/carousel/carousel.vue";
import CateList from "./coms/cateList.vue";
import PaidBoutique from "./coms/paidBoutique.vue";
import CateRadio from "./coms/cateRadio.vue";
import { RadioStation } from "@/api/modules/radioStation";

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

// Banner图
let banner = reactive<any>([]);
onMounted(async () => {
  // 获取Banner图
  let bannerRes: any = await RadioStation.getBanner();
  if (bannerRes.code == 200) banner.push(...bannerRes.data);
});
</script>
