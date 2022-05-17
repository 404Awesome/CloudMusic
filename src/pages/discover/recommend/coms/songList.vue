<!-- 个性推荐 推荐歌单 -->
<template>
  <ul class="songList">
    <li v-for="item in songList" :key="item.id" @click="$router.push(`/songListDetal/${item.id}`)">
      <div class="frontCover">
        <el-image :src="item.picUrl" fit="cover" />
        <p class="playCount">
          <span class="icon i-eva:arrow-right-outline"></span>
          <span>{{ handleCount(item.playCount) }}</span>
        </p>
        <p class="playIcon">
          <span @click.stop="addSongList(item.id)" class="i-heroicons-outline:play"></span>
        </p>
      </div>
      <p class="title">{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { handleCount, handleSongList } from "@/utils/tools";
import { Discover } from "@/api/modules/discover";
import { useMainStore } from "@/store";
const store = useMainStore();

let songList = reactive<any[]>([]);
onMounted(async () => {
  let { code, result }: any = await Discover.getPersonalized(12);
  if (code == 200) songList.push(...result);
});


// 添加歌单列表到播放列表
let addSongList = async (id: number) => {
  let { code, songs }: any = await Discover.getPlayListTrackAll(id, 20, 0);
  if (code == 200) {
    let songList = handleSongList(songs);
    store.addPlayList(songList);
  }
};
</script>
  
<style lang="scss" scoped>
.songList {
  display: grid;
  margin-top: 15px;

  gap: 30px;
  grid-template-columns: repeat(6, 1fr);

  li {
    cursor: pointer;

    &:hover {
      .title {
        color: var(--theme-bg-color);
      }

      .playIcon {
        opacity: 1 !important;
      }
    }

    .frontCover {
      position: relative;
      display: flex;
      overflow: hidden;
      border-radius: 5px;

      &::after {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.2);
        content: "";
      }

      .playCount {
        position: absolute;
        top: 2px;
        right: 6px;
        z-index: 2;
        color: #fff;
        font-size: 14px;

        .icon {
          font-size: 18px;
        }
      }

      .playIcon {
        position: absolute;
        right: 6px;
        bottom: 2px;
        z-index: 2;
        color: rgba($color: #fff, $alpha: 0.7);
        font-size: 26px;
        opacity: 0;
        transition: opacity 0.3s linear;

        &:hover {
          color: #fff;
        }
      }
    }

    .title {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      margin-top: 5px;
      color: var(--font-color);
      text-overflow: ellipsis;
      font-size: 14px;

      -webkit-line-clamp: 2;
    }
  }
}
</style>
