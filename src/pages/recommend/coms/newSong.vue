<template>
  <!-- 个性推荐 最新音乐 -->
  <ul class="newSong">
    <li v-for="(item, index) in newSong" :key="item.id">
      <div class="frontCover">
        <el-image :src="item.picUrl" />
      </div>
      <div class="details">
        <p class="order">{{ (index + 1).toString().padStart(2, "0") }}</p>
        <div class="info">
          <p>{{ item.name }}</p>
          <p truncate>{{ getArtists(item.song.artists) }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { getNewSong } from "@/api/discover";

let newSong = reactive<any[]>([]);
onMounted(async () => {
  let { code, result }: any = await getNewSong();
  if (code == 200) newSong.push(...result);
});

// 获取演艺人
let getArtists = (artists: any[]): string => {
  if (artists.length == 1) {
    return artists[0].name;
  } else {
    return artists.map((item: any) => item.name).join("/");
  }
};
</script>

<style lang="scss" scoped>
.newSong {
  display: grid;
  margin-top: 15px;

  gap: 20px 30px;
  grid-template-columns: repeat(3, 1fr);

  li {
    display: flex;
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #f5f7fa;

      .info p:first-child {
        color: var(--theme-bg-color);
      }
    }

    .frontCover {
      display: flex;
      overflow: hidden;
      flex-basis: 30%;
      flex-grow: 0;
      flex-shrink: 0;
      border-radius: 5px;
    }

    .details {
      display: flex;
      align-items: center;
      flex: 1;

      .order {
        padding-left: 15px;
        color: rgba($color: #000000, $alpha: 0.5);
        font-size: 17px;
      }

      .info {
        display: flex;
        overflow: hidden;
        flex: 1;
        flex-flow: column nowrap;
        justify-content: space-evenly;
        padding: 0px 15px;
        height: 100%;

        p {
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          color: var(--font-color);
          text-overflow: ellipsis;

          -webkit-line-clamp: 2;

          &:first-child {
            font-size: 15px;
          }
          &:last-child {
            color: rgba($color: #000000, $alpha: 0.5);
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
