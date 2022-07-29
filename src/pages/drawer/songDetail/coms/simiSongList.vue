<!-- 相似歌曲 -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <ul ref="skeletonEl" flex flex-col gap-15px>
        <li v-for="item in 5" flex gap-10px>
          <!-- 封面 -->
          <el-skeleton-item variant="image" h-70px w-70px rounded-md />
          <!-- 歌曲信息 -->
          <div flex-1 flex flex-col justify-around>
            <!-- 标题 -->
            <el-skeleton-item variant="text" w="7/10" />
            <!-- 艺术家 -->
            <el-skeleton-item variant="text" w="2/10" />
          </div>
        </li>
      </ul>
    </template>
    <template #default>
      <ul flex flex-col gap-15px>
        <li v-for="item in simiList" :key="item.song.id" class="group" flex gap-10px>
          <!-- 封面 -->
          <div relative>
            <el-image @click="store.playSong(item)" :src="item.album.picUrl" class="cover" />
            <span class="coverIcon" i-eva:arrow-right-fill></span>
          </div>

          <!-- 歌曲信息 -->
          <div class="songInfo">
            <!-- 歌曲名称 -->
            <p @click="store.playSong(item)" class="title">{{ item.song.name }}</p>
            <!-- 艺术家 -->
            <Artists @jump="() => store.songDetailDrawer = false" :artists="item.artists" />
          </div>
        </li>
      </ul>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import Artists from "@/components/content/artists/artists.vue";
import { useIntersectionObserver } from "@vueuse/core";
import { onMounted, reactive, ref } from "vue";
import { useMainStore, SongInfo } from "store";
import { ElMessage } from "element-plus";
import { Handle } from "utils";
import { SongAPI } from "api";
const store = useMainStore();
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

// 骨架屏容器元素
let skeletonEl = ref<HTMLElement | null>(null);
// 加载状态
let loading = ref(true);
// 相似歌曲列表
let simiList = reactive<SongInfo[]>([]);
// 获取相似歌曲列表
let loadSimiSong = async () => {
  try {
    loading.value = true;
    let { code, songs }: any = await SongAPI.getSimi(props.id);
    if (code == 200) {
      // 处理歌曲列表
      let list = Handle.SongList(songs);
      simiList.push(...list);
    }
  } catch (err: any) {
    ElMessage.error("加载相似歌曲列表失败!");
  } finally {
    loading.value = false;
  }
}

// 监听容器元素是否显示在页面上
onMounted(() => {
  const { stop } = useIntersectionObserver(skeletonEl.value, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadSimiSong();
      stop();
    }
  })
});
</script>

<style lang="scss" scoped>
// 封面
.cover {
  @apply w-70px min-w-70px h-70px rounded-md cursor-pointer brightness-85;
}

// 封面播放图标
.coverIcon {
  @apply group-hover-opacity-100 cursor-pointer absolute bottom-3px right-0px text-white text-27px opacity-0;
}

// 歌曲信息
.songInfo {
  @apply flex flex-1 flex-col justify-around overflow-hidden;

  // 歌曲名称
  .title {
    @apply text-15px truncate cursor-pointer hover-themeColor;
  }
}
</style>