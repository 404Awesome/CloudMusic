<!-- 歌曲列表 -->
<template>
  <div class="songList no-select">
    <el-table @row-dblclick="Operate.playSong" :data="songList" stripe style="width: 100%">
      <el-table-column class-name="index" :width="50" align="center" type="index" :index="(index) => index + 1" />
      <el-table-column :width="50">
        <template v-slot="{ row }">
          <!-- eva:heart-fill -->
          <!-- eva:heart-outline -->
          <p flex justify-between>
            <span @click.stop="Operate.likeSong(row.id)" class="icon i-eva:heart-outline"></span>
            <span @click.stop="Operate.downloadSong(row.id)" class="icon i-eva:cloud-download-outline"></span>
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" />
      <el-table-column label="歌手">
        <template v-slot="{ row }">
          <Artists :artists="row.ar" />
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
import Artists from "@/components/content/artists/artists.vue";
import { Operate } from "utils";
import { SongListAPI } from "api";
import { useRoute } from "vue-router";
const route = useRoute();
let id = parseInt(route.params.id as string);

// 歌曲列表
let songList = reactive<any>([]);
onMounted(async () => {
  try {
    let bool: boolean = true;
    let offset: number = 0;
    let limit: number = 100;
    while (bool) {
      let { code, songs }: any = await SongListAPI.getTrackAll(id, offset, limit);
      if (code == 200 && songs.length) {
        songList.push(...songs);
        songs.length < limit ? (bool = false) : (offset += limit);
      } else {
        bool = false;
      }
    }
  } catch (err) {
    ElMessage.error("加载音乐列表失败!");
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

    .cell {
      padding: 0px 5px;
      white-space: nowrap;
      font-size: 13px;
      cursor: default;

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }

      .special:hover {
        color: var(--theme-bg-color);
      }
    }
  }
}
</style>
