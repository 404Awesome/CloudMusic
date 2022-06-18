<!-- 发现音乐 - 歌单 -->
<template>
  <!-- 占位,防止v-loading遮住阴影 -->
  <div h-4></div>
  <div element-loading-text="Loading..." v-loading="loading" pb-4 class="wrapper">
    <!-- 分类列表 -->
    <CategoryList :loading="loading" @selected="cateSelected" />

    <!-- 歌单列表 -->
    <List :songList="songList" />

    <!-- 分页 -->
    <div v-show="songList.length" flex justify-center>
      <el-pagination @current-change="loadList" background layout="prev, pager, next" :page-size="limit"
        :total="total" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CategoryList from "./coms/categoryList.vue";
import List from "./coms/list.vue";
import { SongListAPI } from "api";

// 是否正在加载
let loading = ref<boolean>(false);
// 当前类型
let currentType = ref<string>("");
// 列表总条数
let total = ref<number>(0);
// 限制请求的个数
let limit = 30;
// 歌单列表
let songList = reactive<any>([]);

// 分类选择事件
let cateSelected = (type: any) => {
  total.value = 0;
  currentType.value = type;
  loadList(1);
}

// 加载歌单列表
let loadList = async (offset: number) => {
  try {
    loading.value = true;
    songList.splice(0, songList.length);
    offset = (offset - 1) * limit;
    let { code, playlists, total: count }: any = await SongListAPI.getTop(currentType.value, offset, limit);
    if (code == 200) {
      if (!total.value) total.value = count;
      songList.splice(0, songList.length, ...playlists);
    }
  } catch (err: any) {
    ElMessage.error("加载歌单列表失败!");
  } finally {
    loading.value = false;
  }
}
</script>