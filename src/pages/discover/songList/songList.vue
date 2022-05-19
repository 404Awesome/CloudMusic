<!-- 发现音乐 - 歌单 -->
<template>
  <div class="songList">
    <!-- 分类列表 -->
    <CategoryList :isLoading="isLoading" @selected="cateSelected" />

    <!-- 歌单列表 -->
    <List :isLoading="isLoading" :songList="songList" />

    <!-- 分页 -->
    <div element-loading-spinner="null" v-loading="isLoading" flex justify-center>
      <el-pagination @current-change="loadList" background layout="prev, pager, next" :page-size="limit"
        :total="total" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryList from "./coms/categoryList.vue";
import List from "./coms/list.vue";
import { Discover } from "@/api/modules/discover";

let isLoading = ref<boolean>(false);
let currentType = ref<string>("");
let total = ref<number>(0);
let limit = ref<number>(30);
let songList = reactive<any>([]);
let cateSelected = (type: any) => {
  total.value = 0;
  currentType.value = type;
  loadList(1);
}

// 加载歌单列表
let loadList = async (offset: number) => {
  isLoading.value = true;
  offset = (offset - 1) * limit.value;
  let { code, playlists, total: count }: any = await Discover.getTopPlaylist(currentType.value, offset, limit.value);
  if (code == 200) {
    if (!total.value) total.value = count;
    songList.splice(0, songList.length, ...playlists);
  }
  isLoading.value = false;
}
</script>

<style lang="scss" scoped>
.songList {
  margin: 0 auto;
  padding: 15px 0px 30px;
  width: 80%;
}
</style>
