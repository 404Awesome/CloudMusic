<!-- 轮播图 -->
<template>
  <div bg-gray-100 pt-8 pb-2 h-248px>
    <el-carousel wrapBox :interval="3000" type="card" height="180px">
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