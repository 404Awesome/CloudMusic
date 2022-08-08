<!-- 用户歌单 -->
<template>
  <div v-if="props.uid">
    <h3 truncate>创建的歌单</h3>

    <ul class="list">
      <li v-for="item in songList" :key="item.id" @click="$router.push(`/songListDetail/${item.id}`)">
        <!-- 封面 -->
        <div relative>
          <el-image :src="item.coverImgUrl" fit="cover" :draggable="false" rounded-md brightness-90 />
          <PlayCount :playCount="item.playCount" />
          <PlayIcon @playClick="Operate.playSongList(item.id)" position="bottom-right" />
        </div>

        <!-- 名字 -->
        <p class="name">{{ item.name }}</p>

        <!-- 多少首歌曲 -->
        <p class="trackCount">{{ item.trackCount }}首</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import PlayCount from "@/components/content/playCount/playCount.vue";
import PlayIcon from "@/components/content/playIcon/playIcon.vue";
import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import { SongListAPI } from "api";
import { Operate } from "utils";
const props = defineProps({
  uid: {
    type: Number,
    required: true
  }
})

// 用户歌单
interface SongInfo {
  coverImgUrl: string,
  id: number,
  name: string,
  playCount: number,
  trackCount: number
}
let songList = reactive<SongInfo[]>([]);

// 加载用户歌单
onMounted(async () => {
  try {
    let { code, playlist }: any = await SongListAPI.getUserPlaylist(props.uid);
    if (code == 200) {
      let reg = /.*喜欢的音乐$/g;
      playlist = playlist.map((item: any) => {
        let { coverImgUrl, id, name, playCount, trackCount } = item;
        if (reg.test(name)) name = "我喜欢的音乐";
        return { coverImgUrl, id, name, playCount, trackCount };
      });
      songList.push(...playlist)
    };
  } catch (err: any) {
    ElMessage.error("加载用户歌单失败!");
  }
})
</script>

<style lang="scss" scoped>
.list {
  @apply grid grid-cols-3 gap-10px pt-10px;

  li {
    @apply cursor-pointer;

    &:hover .name {
      @apply themeColor;
    }

    .name {
      @apply truncate text-15px pt-5px pb-2px;
    }

    .trackCount {
      @apply truncate text-gray-400 text-13px;
    }
  }
}
</style>