<!-- 轮播图 -->
<template>
  <!-- pc下展示轮播图 -->
  <div class="carouselCard">
    <el-carousel :interval="3000" type="card" height="200px" wrapBox>
      <el-carousel-item v-for="item in props.bannerList" :key="item.targetId">
        <el-image rounded-md h-full :src="item.imageUrl || item.pic" fit="cover" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <!-- ipad下展示轮播图 -->
  <el-carousel :interval="3000" indicator-position="none" height="200px" class="carousel">
    <el-carousel-item v-for="item in props.bannerList" :key="item.targetId">
      <el-image rounded-md h-full :src="item.imageUrl || item.pic" fit="cover" />
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

export interface BannerItem {
  imageUrl: string,
  pic: string,
  targetId: number,
  [propName: string]: any
}
const props = defineProps({
  bannerList: {
    type: Array as PropType<BannerItem[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.carouselCard {
  @apply bg-gray-100 pt-7 h-260px dark-bg-gray-300 display-none sm-block;
}

.carousel {
  @apply wrapBox pt-15px block sm-display-none;
}
</style>