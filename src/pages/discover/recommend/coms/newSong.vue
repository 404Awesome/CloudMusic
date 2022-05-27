<!-- 个性推荐 最新音乐 -->
<template>
  <ul gap-5 lg:gap-7 grid-cols-2 lg:grid-cols-3 class="newSong">
    <li @dblclick="playSong(item)" v-for="(item, index) in newSong" :key="item.id">
      <div class="frontCover">
        <el-image :src="item.picUrl" />
      </div>
      <div class="details">
        <p class="order">{{ (index + 1).toString().padStart(2, "0") }}</p>
        <div class="info">
          <p>{{ item.name }}</p>
          <p v-html="handleArtists(item.song.artists)"></p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Discover } from "@/api/modules/discover";
import { handleArtists } from "@/utils/tools";
import { useMainStore } from "store/index";
const store = useMainStore();

let newSong = reactive<any[]>([]);
onMounted(async () => {
  let { code, result }: any = await Discover.getNewSong();
  if (result.length > 6) result.length = 6;
  if (code == 200) newSong.push(...result);
});

// 播放歌曲
let playSong = async (songInfo: any) => {
  let { code, songs }: any = await Discover.getSongDetail(songInfo.id);
  if (code == 200) {
    let { ar, al, id, name, tns = [] } = toRaw(songs[0]);
    let artist = ar;
    let album = al;
    let song = { id, name, tns };
    store.playSong({ artist, album, song });
  }
};
</script>

<style lang="scss" scoped>
.newSong {
  display: grid;
  margin-top: 15px;

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
      overflow: hidden;
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
          overflow: hidden;
          color: var(--font-color);
          text-overflow: ellipsis;

          &:first-child {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            font-size: 15px;

            -webkit-line-clamp: 2;
          }

          &:last-child {
            color: rgba($color: #000000, $alpha: 0.5);
            white-space: nowrap;
            font-size: 14px;

            :deep(.name):hover {
              color: var(--theme-bg-color);
            }
          }
        }
      }
    }
  }
}
</style>
