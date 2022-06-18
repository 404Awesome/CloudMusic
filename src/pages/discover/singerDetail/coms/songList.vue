<!-- album 歌单列表 -->
<template>
  <!-- 头部 -->
  <header class="head">
    <!-- 标题 -->
    <h4 class="title">{{ name }}</h4>
    <!-- 操作 -->
    <section class="operate">
      <span @click="Operate.addPlayList(origin || songs, id)" class="icon i-heroicons-outline:play"></span>
      <span v-if="id" class="splitLine">|</span>
      <span v-if="id" @click="Operate.collectAlbum(id)" class="icon i-heroicons-outline:folder-add"></span>
    </section>
  </header>
  <!-- 列表 -->
  <div class="list no-select">
    <el-table @row-dblclick="Operate.playSong" :data="songs" stripe :show-header="false">
      <el-table-column class-name="index" :width="35" align="center" type="index" :index="(index) => index + 1" />
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
      <el-table-column prop="name" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { Operate } from "utils";

const props = defineProps({
  origin: Array,
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  songs: {
    type: Array,
    required: true
  }
})
let songs = toRef(props, "songs");
let { origin, id, name } = toRaw(props);
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  gap: 20px;

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
    font-size: 17px;
    cursor: pointer;
  }

  .operate {
    flex-grow: 0;
    flex-shrink: 0;

    .icon {
      color: rgba($color: #000000, $alpha: .5);
      font-size: 22px;
      cursor: pointer;

      &:hover {
        color: var(--theme-bg-color);
      }
    }

    .splitLine {
      margin: 0px 7px;
      color: rgba($color: #000000, $alpha: .3);
    }
  }
}

.list {

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

    .cell {
      padding: 0px 5px;
      color: var(--font-color);
      white-space: nowrap;
      cursor: default;
    }

    td.el-table__cell,
    th.el-table__cell.is-leaf {
      border-bottom: none;
    }

    .el-table__inner-wrapper::before {
      height: 0px;
    }
  }
}
</style>