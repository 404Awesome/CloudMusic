<!-- 个性推荐 最新音乐 -->
<template>
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

<script setup lang="ts">
import Artists from "@/components/content/artists/artists.vue";
import { reactive, onMounted } from "vue";
import { Operate } from "utils";
import { SongAPI } from "api";

// 新歌列表
let newSongList = reactive<any[]>([]);
// 加载新歌列表
onMounted(async () => {
  let { code, result }: any = await SongAPI.getNewSong();
  if (code == 200) {
    if (result.length > 6) result.length = 6;
    newSongList.push(...result);
  };
});

// 播放歌曲
let playSong = async (id: number) => {
  let { code, songs }: any = await SongAPI.getDetail(id);
  if (code == 200) Operate.playSong(songs[0]);
};
</script>