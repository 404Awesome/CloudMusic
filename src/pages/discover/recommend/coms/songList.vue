<!-- 个性推荐 推荐歌单 -->
<template>
  <ul grid6Cols mt-15px>
    <li v-for="item in songList" :key="item.id" @click="$router.push(`/songListDetal/${item.id}`)" class="group"
      cursor-pointer>
      <div relative flex overflow-hidden rounded-md>
        <!-- 封面 -->
        <el-image brightness-80 :src="item.picUrl" fit="cover" />

        <!-- 播放次数 -->
        <p absolute top-2px right-6px z-2 text="white 15px">
          <span text-22px i-eva:arrow-right-outline></span>
          <span>{{ Handle.Count(item.playCount) }}</span>
        </p>

        <!-- 播放图标 -->
        <p absolute right-5px bottom-5px z-2 text="white/70 28px" opacity-0 transition-opacity hover:text-white
          group-hover:opacity-100>
          <span @click.stop="Operate.playSongList(item.id)" i-heroicons-outline:play></span>
        </p>
      </div>

      <!-- 名字 -->
      <p mt-5px text-14px twoLineOmit group-hover:themeColor>{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { Handle, Operate } from "utils";
import { SongListAPI } from "api";

// 推荐歌单列表
let songList = reactive<any[]>([]);
// 加载推荐歌单列表
onMounted(async () => {
  let { code, result }: any = await SongListAPI.getPersonalized(12);
  if (code == 200) songList.push(...result);
});
</script>