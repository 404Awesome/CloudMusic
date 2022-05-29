<!-- 歌手 -->
<template>
  <div pt-4 class="wrapper">
    <!-- 分类列表 -->
    <categoryList @selected="cateSelected" />

    <!-- 歌手列表 -->
    <ul v-infinite-scroll="loadData" :infinite-scroll-disabled="disabled">
      <li></li>
    </ul>

    <!-- 分割线 -->
    <el-divider>
      <span class="tip">{{ disabled ? '已加载到底!' : 'Loading...' }}</span>
    </el-divider>
  </div>
</template>

<script setup lang="ts">
import categoryList from "./coms/categoryList.vue";
import { Discover } from "@/api/modules/discover";

// 请求偏移量
let offset = ref(0);
// 请求限制数据个数
let limit = 30;
// 是否禁用加载
let disabled = ref(false);

// 分类已选择
let cateSelected = (category: any) => {
  let { area, type, initial } = category;
  offset.value = 0;
  loadData(type, area, initial);
}

// 歌手列表
let artistsList = reactive<any>([]);
// 加载数据
let loadData = async (type: string, area: string, initial: string) => {
  console.log(123);


  let { artists, code, more }: any = await Discover.getArtistList(type, area, initial, offset.value, limit);
  if (code == 200) {
    artistsList.push(...artists);
    console.log(artistsList);

    // 无法加载更多
    if (!more) {
      disabled.value = true;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
