<!-- 个性推荐 MV -->
<template>
  <ul class="mv">
    <li v-for="item in mvList" :key="item.id" @click="$router.push(`/mvDetail/${item.id}`)">
      <!-- 封面 -->
      <div class="frontCover">
        <el-image :src="item.picUrl" fit="cover" w-full h-30 lazy />
        <p class="playCount">
          <span class="icon i-eva:arrow-right-outline"></span>
          <span>{{ handleCount(item.playCount) }}</span>
        </p>
      </div>

      <!-- 描述 -->
      <div class="details">
        <p>{{ item.name }}</p>
        <p class="artist" v-html="handleArtists(item.artists)"></p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { handleCount, handleArtists } from "@/utils/tools";
import { MV } from "@/api/modules/video";

let mvList = reactive<any[]>([]);
onMounted(async () => {
  let { code, result }: any = await MV.getPersonalized();
  if (code == 200) mvList.push(...result);
});
</script>

<style lang="scss" scoped>
.mv {
  display: grid;
  padding-top: 15px;

  gap: 30px;
  grid-template-columns: repeat(4, 1fr);

  li {
    overflow: hidden;
    cursor: pointer;

    &:hover .details p:first-child {
      color: var(--theme-bg-color);
    }

    .frontCover {
      position: relative;
      display: flex;
      overflow: hidden;
      border-radius: 5px;

      &::after {
        position: absolute;
        top: 0px;
        left: 0;
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

    .details {
      margin-top: 5px;

      p {
        &:first-child {
          overflow: hidden;
          color: var(--font-color);
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 15px;
        }

        &.artist {
          overflow: hidden;
          color: var(--font-color);
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;

          :deep(.name) {
            color: rgba(0, 0, 0, 0.5);

            &:hover {
              color: var(--theme-bg-color);
            }
          }
        }
      }
    }
  }
}
</style>
