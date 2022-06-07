<!-- 歌曲列表 -->
<template>
  <div class="songList">
    <el-table @row-dblclick="playSong" :data="songList" stripe style="width: 100%">
      <el-table-column class-name="index" :width="50" align="center" type="index" :index="handleIndex" />
      <el-table-column :width="50">
        <template v-slot="{ row }">
          <!-- eva:heart-fill -->
          <!-- eva:heart-outline -->
          <p flex justify-between>
            <span @click.stop="likeSong(row.id)" class="icon i-eva:heart-outline"></span>
            <span @click.stop="download(row.id)" class="icon i-eva:cloud-download-outline"></span>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" />
      <el-table-column class-name="artists" label="歌手">
        <template v-slot="{ row }">
          <p class="artists" v-html="handleArtists(row.ar)"></p>
        </template>
      </el-table-column>
      <el-table-column label="专辑">
        <template v-slot="{ row }">
          <p v-if="row.al.name.length" class="special">
            <span>{{ row.al.name }}</span>
            <span v-if="row.al.tns.length">&nbsp;({{ row.al.tns.join(",") }})</span>
          </p>
          <p v-else>未知专辑</p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { handleArtists, handleSongInfo } from "@/utils/tools";
import { Discover } from "@/api/modules/discover";
import { useMainStore } from "store/index";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useMainStore();
let id = parseInt(route.params.id as string);

// 播放歌曲
let playSong = (songInfo: any) => {
  songInfo = handleSongInfo(songInfo);
  store.playSong(songInfo);
};

// 处理表格索引
let handleIndex = (index: number): any => {
  return (index + 1).toString().padStart(2, "0");
};

// 喜欢歌曲
let likeSong = (id: number) => {
  console.log("喜欢的歌曲", id);
};

// 下载歌曲
let download = (id: number) => {
  console.log(id);
};

// 歌曲列表
let songList = reactive<any>([]);
onMounted(async () => {
  try {
    let bool: boolean = true;
    let offset: number = 0;
    let litmit: number = 100;
    while (bool) {
      let { code, songs }: any = await Discover.getPlayListTrackAll(
        id,
        litmit,
        offset
      );
      if (code == 200 && songs.length) {
        songList.push(...songs);
        songs.length < litmit ? (bool = false) : (offset += litmit);
      } else {
        bool = false;
      }
    }
  } catch (err) {
    ElMessage.error("获取音乐列表失败!");
  }
});
</script>

<style lang="scss" scoped>
.songList {
  .icon {
    display: flex;
    font-size: 17px;
    cursor: pointer;

    &:hover {
      color: var(--theme-bg-color);
    }

    &.liked {
      color: #f74e40;
    }
  }

  :deep(.el-table) {
    .index .cell {
      color: rgba($color: #000000, $alpha: 0.4);
    }

    .is-leaf {
      color: rgba($color: #000000, $alpha: 0.4);
      font-weight: 500;
      font-size: 14px;
    }

    .artists.is-leaf .cell {
      padding: 0px 25px;
    }

    .cell {
      padding: 0px 5px;
      color: var(--font-color);
      white-space: nowrap;
      font-size: 13px;
      cursor: default;

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }

      .artists {
        padding: 0px 20px;

        .name:hover {
          color: var(--theme-bg-color);
        }
      }

      .special:hover {
        color: var(--theme-bg-color);
      }
    }
  }
}
</style>
