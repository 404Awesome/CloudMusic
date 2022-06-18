<!-- 个性推荐 最新音乐 -->
<template>
  <ul gap-5 lg:gap-x-7 grid-cols-2 lg:grid-cols-3 class="newSong">
    <li v-for="({ song, id, picUrl }, index) in newSongList" :key="id">
      <!-- 封面 -->
      <el-image @click="playSong(song.id)" cursor="pointer" w-18 h-18 rounded :src="picUrl" />

      <!-- 详情 -->
      <div class="details">
        <!-- 排名 -->
        <p class="order">{{ (index + 1).toString().padStart(2, "0") }}</p>
        <!-- 信息 -->
        <div class="info">
          <!-- 歌名 -->
          <p class="songName">{{ song.name }}</p>
          <!-- 艺术家 -->
          <Artists :artists="song.artists" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Artists from "@/components/content/artists/artists.vue";
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

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.newSong {
  display: grid;
  margin-top: 15px;

  li {
    display: flex;
    overflow: hidden;
    border-radius: 5px;

    &:hover {
      background-color: #f5f7fa;

      .info .songName {
        color: var(--theme-bg-color);
      }
    }

    .details {
      display: flex;
      overflow: hidden;
      align-items: center;
      flex: 1;

      .order {
        padding-left: 10px;
        color: rgba($color: #000000, $alpha: 0.5);
        font-size: 16px;
      }

      .info {
        display: flex;
        overflow: hidden;
        flex: 1;
        flex-flow: column nowrap;
        justify-content: center;
        padding: 0px 10px;
        height: 100%;

        .songName {
          font-size: 15px;

          @include oneOmit;
        }
      }
    }
  }
}
</style>
