<!-- 歌单列表 -->
<template>
  <el-table @row-dblclick="playSong" :data="props.songList" stripe w-full h-full text-13px overflow-hidden>
    <!-- 序号 -->
    <el-table-column :width="50" type="index">
      <template v-slot="{ $index }">
        <p truncate text-center text-gray-400>{{ $index + 1 }}</p>
      </template>
    </el-table-column>

    <!-- 操作 -->
    <el-table-column :width="65">
      <template v-slot="{ row }">
        <p flex justify-between text-17px>
          <span @click.stop="Operate.likeSong(row.song.id)" i-carbon:favorite hover:i-carbon-favorite-filled
            hover:text-red-500 cursor-pointer></span>
          <span @click.stop="Operate.downloadSong(row.song.id, row.song.name)" i-carbon:cloud-download hover:themeColor
            cursor-pointer></span>
        </p>
      </template>
    </el-table-column>

    <!-- 标题 -->
    <el-table-column label="音乐标题">
      <template v-slot="{ row }">
        <p :class="{ 'themeColor': store.currentSong?.song.id == row.song.id }" truncate cursor-default select-none>
          {{ row.song.name }}
        </p>
      </template>
    </el-table-column>

    <!-- 歌手 -->
    <el-table-column label="歌手">
      <template v-slot="{ row }">
        <Artists :artists="row.artists" />
      </template>
    </el-table-column>

    <!-- 专辑 -->
    <el-table-column label="专辑">
      <template v-slot="{ row }">
        <div hover:themeColor cursor-pointer>
          <p v-if="row.album.name.length" truncate>
            <span>{{ row.album.name }}</span>
            <span v-if="row.album.tns.length">&nbsp;({{ row.album.tns.join(",") }})</span>
          </p>
          <p v-else truncate>未知专辑</p>
        </div>
      </template>
    </el-table-column>

    <!-- 空数据 -->
    <template #empty>
      <el-empty description="暂无歌曲!" />
    </template>
  </el-table>
</template>

<script setup lang="ts">
import Artists from "@/components/content/artists/artists.vue";
import { useMainStore, SongInfo } from "store";
import { Operate } from "utils";
import { PropType } from "vue";
const store = useMainStore();
const props = defineProps({
  songList: {
    type: Array as PropType<SongInfo[]>,
    required: true
  }
})

// 播放歌曲
let playSong = (song: SongInfo) => {
  store.playSong(song);
}
</script>