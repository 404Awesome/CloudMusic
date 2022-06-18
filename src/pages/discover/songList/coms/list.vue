<!-- 歌单列表 -->
<template>
  <ul min-h-30 gap-5 lg:gap-7 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 class="list">
    <li @click="$router.push(`/songListDetal/${item.id}`)" v-for="item in props.songList" :key="item.id">
      <div class="cover">
        <el-image fit-="cover" lazy :src="item.coverImgUrl" />
        <p class="count">
          <span class="icon i-eva:arrow-right-outline"></span>
          <span>{{ Handle.Count(item.playCount) }}</span>
        </p>
        <p class="info">
          <span class="icon i-eva:smiling-face-outline"></span>
          <span class="name">{{ item.creator.nickname }}</span>
        </p>
        <div @click.stop="Operate.playSongList(item.id)" class="playIcon">
          <span class="i-eva:arrow-right-fill"></span>
        </div>
      </div>
      <p class="title">{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Handle, Operate } from "utils";
import { PropType } from "vue";
const props = defineProps({
  songList: {
    type: Array as PropType<any[]>,
    required: true
  }
});
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  margin: 20px 0px;

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