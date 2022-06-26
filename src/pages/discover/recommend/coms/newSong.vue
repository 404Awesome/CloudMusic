<!-- 个性推荐 最新音乐 -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <ul grid3Cols mt-15px ref="skeletonEl">
        <li v-for="item in 6" flex gap-20px>
          <el-skeleton-item variant="image" h-20 w-20 rounded-md />
          <div flex-1 flex flex-col justify-center>
            <el-skeleton-item variant="text" w="7/10" />
            <el-skeleton-item variant="text" w="2/10" mt-10px />
          </div>
        </li>
      </ul>
    </template>
    <template #default>
      <ul grid3Cols mt-15px>
        <li v-for="({ song, id, picUrl }, index) in newSongList" :key="id" class="group" hover:bg="#f5f7fa" flex
          overflow-hidden rounded-md>
          <!-- 封面 -->
          <el-image @click="playSong(song.id)" :src="picUrl" cursor-pointer h-20 w-20 rounded-md />

          <!-- 详情 -->
          <div flex overflow-hidden items-center flex-1>
            <!-- 排名 -->
            <p pl-10px text="black/50 16px">{{ (index + 1).toString().padStart(2, "0") }}</p>
            <!-- 信息 -->
            <div flex overflow-hidden flex-1 flex-col flex-nowrap justify-center p="0px 10px" h-full>
              <!-- 歌名 -->
              <p truncate text-15px group-hover:themeColor>{{ song.name }}</p>
              <!-- 艺术家 -->
              <Artists :artists="song.artists" />
            </div>
          </div>
        </li>
      </ul>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import Artists from "@/components/content/artists/artists.vue";
import { reactive, onMounted, ref, onActivated } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { Operate } from "utils";
import { SongAPI } from "api";

// 骨架屏容器元素
let skeletonEl = ref<HTMLElement | null>(null);
// 加载状态
let loading = ref<boolean>(true);
// 新歌列表
let newSongList = reactive<any[]>([]);
// 加载新歌列表
let loadData = async () => {
  try {
    let { code, result }: any = await SongAPI.getNewSong();
    if (code == 200) {
      if (result.length > 6) result.length = 6;
      newSongList.push(...result);
    };
  } catch (err: any) {
    ElMessage.error("加载最新音乐失败!");
  } finally {
    loading.value = false;
  }
}

// 播放歌曲
let playSong = async (id: number) => {
  let { code, songs }: any = await SongAPI.getDetail(id);
  if (code == 200) Operate.playSong(songs[0]);
};

// 监听容器元素是否显示在页面上
onMounted(() => {
  const { stop } = useIntersectionObserver(skeletonEl.value, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadData();
      stop();
    }
  })
});

// 如果没有请求到数据,重新发起请求
onActivated(() => {
  if (!loading.value && !newSongList.length) {
    loadData();
  }
})
</script>