<template>
  <!-- 轮播图 -->
  <Carousel :data="banner" />

  <!-- 电台分类 -->
  <Category />

  <!-- 付费精选 -->
  <PaidBoutique />

  <!-- 渲染列表 -->
  <div v-for="item in renderList" :key="item.props.id">
    <component :is="item.component" v-bind="item.props" />
  </div>
</template>

<script setup lang="ts" name="radioStation">
import Carousel from "@/components/carousel/carousel.vue";
import Category from "./coms/category.vue";
import PaidBoutique from "./coms/paidBoutique.vue";
import RadioHot from "./coms/radioHot.vue";
import { getDjBanner } from "@/api/radioStation";

// 渲染列表
let renderList = reactive([
  {
    component: shallowRef(RadioHot),
    props: {
      title: "创作翻唱",
      path: "/haha",
      id: 2001,
    },
  },
  {
    component: shallowRef(RadioHot),
    props: {
      title: "音乐推荐",
      path: "/haha",
      id: 2,
    },
  },
  {
    component: shallowRef(RadioHot),
    props: {
      title: "情感",
      path: "/haha",
      id: 3,
    },
  },
  {
    component: shallowRef(RadioHot),
    props: {
      title: "脱口秀",
      path: "/haha",
      id: 8,
    },
  },
]);

// Banner图
let banner = reactive<any>([]);
onMounted(async () => {
  // 获取Banner图
  let bannerRes: any = await getDjBanner();
  if (bannerRes.code == 200) banner.push(...bannerRes.data);
});
</script>
