<!-- 个性推荐 推荐歌单 -->
<template>
  <ul gap-5 lg:gap-7 grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 class="songList">
    <li v-for="item in songList" :key="item.id" @click="$router.push(`/songListDetal/${item.id}`)">
      <div class="frontCover">
        <el-image :src="item.picUrl" fit="cover" />
        <p class="playCount">
          <span class="icon i-eva:arrow-right-outline"></span>
          <span>{{ handleCount(item.playCount) }}</span>
        </p>
        <p class="playIcon">
          <span @click.stop="playSongList(item.id)" class="i-heroicons-outline:play"></span>
        </p>
      </div>
      <p class="title">{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { handleCount } from "@/utils/handle";
import { playSongList } from "@/utils/operate";
import { Discover } from "@/api/modules/discover";

// 歌单列表
let songList = reactive<any[]>([]);
onMounted(async () => {
  let { code, result }: any = await Discover.getPersonalized(12);
  if (code == 200) songList.push(...result);
});
</script>
  
<style lang="scss" scoped>
.songList {
  display: grid;
  margin-top: 15px;

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
