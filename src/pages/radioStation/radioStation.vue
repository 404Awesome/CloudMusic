<template>
  <div>
    <!-- 轮播图 -->
    <Carousel :data="banner" />

    <!-- 电台分类 -->
    <Category />
  </div>
</template>

<script setup lang="ts" name="radioStation">
import Carousel from "@/components/carousel/carousel.vue";
import Category from "./coms/category.vue";
import { getDjBanner } from "@/api/radioStation";

// Banner图
let banner = reactive<any>([]);
onMounted(async () => {
  // 获取Banner图
  let bannerRes: any = await getDjBanner();
  if (bannerRes.code == 200) banner.push(...bannerRes.data);
});
</script>

<style lang="scss" scoped></style>
