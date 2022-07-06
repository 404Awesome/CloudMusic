<!-- 单曲 -->
<template>
  <!-- 歌曲列表 -->
  <SongList v-infinite-scroll="loadData" :infinite-scroll-disabled="disabled" :songList="songList" />

  <!-- 提示 -->
  <el-divider>
    <span tip>{{ disabled ? '已加载到底!' : 'Loading...' }}</span>
  </el-divider>
</template>

<script setup lang="ts">
import SongList from "@/components/content/songList/songList.vue";
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { SongInfo } from "store";
import { Handle } from "utils";
import { OtherAPI } from "api";
const route = useRoute();
const emit = defineEmits(["getCount"]);

// 获取歌曲数量限制
let limit = 50;
// 禁止无限滚动
let disabled = ref<boolean>(false);
// 加载状态
let loading = ref<boolean>(false);
// 歌曲列表
let songList = reactive<SongInfo[]>([]);

// 加载歌曲列表
let loadData = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    let { code, result: { songCount, songs } }: any = await OtherAPI.getCloudSearch(route.params.keyword as string, 1, songList.length, limit);
    if (code == 200) {
      if (!songList.length) emit("getCount", `找到 ${songCount} 首单曲`);
      let list = Handle.SongList(songs);
      songList.push(...list);
    }

    // 禁用无限加载
    if (songs.length < limit) {
      disabled.value = true;
    }
  } catch (err: any) {
    ElMessage.error("加载音乐列表失败!");
  } finally {
    loading.value = false;
  }
}
// 初始化歌曲列表
onMounted(() => loadData());
</script>