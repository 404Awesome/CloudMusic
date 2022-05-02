<template>
  <!-- 个性推荐 推荐歌单 -->
  <ul class="playlist">
    <li v-for="item in playlist" :key="item.id">
      <div class="frontCover">
        <el-image :src="item.picUrl" fit="cover" />
        <p class="playCount">
          <span class="icon i-eva:arrow-right-outline"></span>
          <span>{{ handleCount(item.playCount) }}</span>
        </p>
      </div>
      <p class="title">{{ item.name }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { handleCount } from "@/utils/tools";
import { getPersonalized } from "@/api/discover";

let playlist = reactive<any[]>([]);
onMounted(async () => {
  let { code, result }: any = await getPersonalized(12);
  if (code == 200) playlist.push(...result);
});
</script>

<style lang="scss" scoped>
.playlist {
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
