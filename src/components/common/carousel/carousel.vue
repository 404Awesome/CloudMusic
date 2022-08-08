<!-- 轮播图 -->
<template>
  <div class="carousel">
    <el-carousel :interval="3000" type="card" height="200px" wrapBox>
      <el-carousel-item v-for="item in props.bannerList" :key="item.targetId">
        <el-image rounded-md h-full :src="item.imageUrl || item.pic" fit="cover" />
      </el-carousel-item>
    </el-carousel>
  </div>
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
.carousel {
  @apply bg-gray-100 pt-7 h-260px dark-bg-gray-300 display-none sm-block;
}
</style>