<!-- 个性推荐 推荐歌单 -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <ul grid6Cols mt-15px min-h-300px>
        <li v-for="item in 12">
          <el-skeleton-item variant="image" w-full h-33 rounded-md />
          <el-skeleton-item variant="text" mt-6px />
          <el-skeleton-item variant="text" w="5/10" />
        </li>
      </ul>
    </template>
    <template #default>
      <ul class="songList">
        <li v-for="item in songList" :key="item.id" @click="$router.push(`/songListDetail/${item.id}`)" cursor-pointer>
          <div class="cover">
            <!-- 封面 -->
            <el-image :src="item.picUrl" fit="cover" brightness-85 />

            <!-- 播放次数 -->
            <PlayCount :playCount="item.playCount" />

            <!-- 播放图标 -->
            <p class="icon">
              <span @click.stop="Operate.playSongList(item.id)" i-eva:play-circle-outline></span>
            </p>
          </div>

          <!-- 名字 -->
          <p class="name">{{ item.name }}</p>
        </li>
      </ul>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import PlayCount from "@/components/content/playCount/playCount.vue";
import { reactive, ref, onActivated } from "vue";
import { ElMessage } from "element-plus";
import { SongListAPI } from "api";
import { Operate } from "utils";

// 加载状态
let loading = ref<boolean>(false);
// 推荐歌单列表
interface SongInfo {
  picUrl: string,
  id: number,
  name: string,
  playCount: number
}
let songList = reactive<SongInfo[]>([]);

// 加载推荐歌单列表
let loadData = async () => {
  try {
    loading.value = true;
    let { code, result }: any = await SongListAPI.getPersonalized(12);
    if (code == 200) {
      // 处理歌单
      let list = result.map((item: any) => {
        let { picUrl, id, name, playCount } = item;
        return { picUrl, id, name, playCount }
      })
      songList.push(...list);
    };
  } catch (err: any) {
    ElMessage.error("加载推荐列表失败!");
  } finally {
    loading.value = false;
  }
}

// 如果没有请求到数据,重新发起请求
onActivated(() => {
  if (!loading.value && !songList.length) {
    loadData();
  }
})
</script>

<style lang="scss" scoped>
.songList {
  @apply grid6Cols mt-15px min-h-300px;
}

.cover {
  @apply relative flex overflow-hidden rounded-md;

  &:hover .icon {
    @apply opacity-100;
  }

  .icon {
    @apply absolute right-5px bottom-5px z-2 text-white/70 text-28px opacity-0 transition-opacity hover-text-white;
  }
}

.name {
  @apply mt-5px text-14px twoLineOmit hover-themeColor hover-dark-text-orange-400;
}
</style>