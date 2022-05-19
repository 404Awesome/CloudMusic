<!-- 歌单列表 -->
<template>
  <ul class="list" element-loading-text="Loading..." v-loading="isLoading">
    <li @click="$router.push(`/songListDetal/${item.id}`)" v-for="item in songList" :key="item.id">
      <div class="cover">
        <el-image :src="item.coverImgUrl" />
        <p class="count">
          <span class="icon i-eva:arrow-right-outline"></span>
          <span>{{ handleCount(item.playCount) }}</span>
        </p>
        <p class="info">
          <span class="icon i-eva:smiling-face-outline"></span>
          <span class="name">{{ item.creator.nickname }}</span>
        </p>
        <div @click.stop="addSongList(item.id)" class="playIcon">
          <span class="i-eva:arrow-right-fill"></span>
        </div>
      </div>
      <p class="title">{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Discover } from "@/api/modules/discover";
import { handleCount, handleSongList } from "@/utils/tools";
import { PropType } from "vue";
import { useMainStore } from "store/index";
const store = useMainStore();
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  },
  songList: {
    type: Array as PropType<any[]>,
    required: true
  }
});

let { isLoading, songList } = toRefs(props);

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
.list {
  display: grid;
  margin: 20px 0px;
  min-height: 200px;

  grid-template-columns: repeat(6, 1fr);
  gap: 20px;

  li {
    overflow: hidden;

    &:hover {
      cursor: pointer;

      .title {
        color: var(--theme-bg-color);
      }
    }

    .cover {
      position: relative;
      display: flex;
      overflow: hidden;
      border-radius: 7px;
      color: #fff;
      font-size: 13px;

      &:hover .playIcon {
        opacity: 1;
      }

      &::after {
        position: absolute;
        top: 0px;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: .2);
        content: '';
      }

      .count {
        position: absolute;
        top: 3px;
        right: 5px;
        z-index: 2;
        display: flex;
        align-items: center;
      }

      .info {
        position: absolute;
        bottom: 5px;
        left: 5px;
        z-index: 2;
        overflow: hidden;
        width: 70%;
        text-overflow: ellipsis;
        white-space: nowrap;
        ;
      }

      .playIcon {
        position: absolute;
        right: 7px;
        bottom: 7px;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: rgba($color: #fff, $alpha: 0.5);
        color: #d33a31;
        font-size: 30px;
        opacity: 0;
        transition: opacity 0.3s linear;

        &:hover {
          background-color: rgba($color: #fff, $alpha: 0.8);
        }
      }

      .icon {
        font-size: 20px;
      }
    }

    .title {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      margin-top: 5px;
      text-overflow: ellipsis;
      font-size: 14px;

      -webkit-line-clamp: 2;
    }
  }
}
</style>