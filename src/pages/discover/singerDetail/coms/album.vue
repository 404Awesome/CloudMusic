<!-- 歌手详情 专辑 -->
<template>
  <div>
    <ul class="album" v-infinite-scroll="loadData" :infinite-scroll-disabled="disabled">
      <li v-for="album in albumList" :key="album.id">
        <!-- 专辑封面  -->
        <section>
          <el-image rounded w-40 h-40 fit="cover" lazy :src="album.picUrl" />
          <p text-sm>{{ album.time }}</p>
        </section>

        <!-- 歌单列表 -->
        <section class="songList" flex-1>
          <!-- 头部 -->
          <header class="head">
            <!-- 名字 -->
            <h4 class="name" @click.stop="showMore">{{ album.name }}</h4>
            <!-- 操作 -->
            <section class="operate">
              <span class="icon i-heroicons-outline:play"></span>
              <span class="splitLine">|</span>
              <span class="icon i-heroicons-outline:folder-add"></span>
            </section>
          </header>
          <!-- 列表 -->
          <div class="list">
            <el-table @row-dblclick="playSong" :data="album.songs" stripe :show-header="false">
              <el-table-column class-name="index" :width="35" align="center" type="index" :index="handleIndex" />
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
              <el-table-column prop="name" />
            </el-table>
          </div>
          <!-- 是否显示更多 -->
          <div class="more" v-if="album.more" @click.stop="showMore">
            <span>查看更多</span>
            <span class="icon i-eva:arrow-ios-forward-outline"></span>
          </div>
        </section>
      </li>
    </ul>

    <!-- 提示 -->
    <el-divider>
      <span class="tip">{{ disabled ? '无法加载更多!' : 'Loading...' }}</span>
    </el-divider>
  </div>
</template>

<script setup lang="ts">
import { Discover } from "@/api/modules/discover";
import { handleSongInfo } from "@/utils/tools";
import { useMainStore } from "store/index";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useMainStore();
const id = parseInt(route.query.id as string);


// 是否正在加载
let isLoading = ref(false);
// 是否禁用无限滚动
let disabled = ref(false);
// 偏移量
let offset = ref(0);
// 限制
let limit = 5;
// 专辑列表
let albumList = reactive<any>([]);
// 加载数据
let loadData = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  let { more, code, hotAlbums }: any = await Discover.getArtistAlbum(id, offset.value, limit);
  if (code == 200) {
    // 加载专辑内容
    loadAlbumData(hotAlbums);
    offset.value += limit;
    // 无法加载更多
    if (!more) disabled.value = true;
  }
  isLoading.value = false;
}
// 加载专辑内容
let loadAlbumData = (hotAlbums: any) => {
  hotAlbums.map(async (item: any) => {
    let { code, album, songs }: any = await Discover.getAlbum(item.id);
    if (code == 200) {
      // 处理时间
      let time = new Date(album.publishTime).toLocaleDateString('cn');
      // 处理歌曲列表长度
      let more;
      if (songs.length > 10) {
        songs.length = 10;
        more = true;
      } else {
        more = false;
      }
      albumList.push({
        songs,
        time,
        more,
        picUrl: album.picUrl,
        id: album.id,
        name: album.name,
      })
    }
  });
}

// 处理表格索引
let handleIndex = (index: number): any => {
  return (index + 1).toString().padStart(2, "0");
};

// 播放歌曲
let playSong = (songInfo: any) => {
  songInfo = handleSongInfo(songInfo);
  store.playSong(songInfo);
};
// 喜欢歌曲
let likeSong = (id: number) => {
  console.log(id);
}
// 下载歌曲
let download = (id: number) => {
  console.log(id);
}

// 查看更多
let showMore = () => {
  console.log("查看更多!");
}
</script>

<style lang="scss" scoped>
.album {
  display: flex;
  flex-flow: column nowrap;
  padding: 20px 0px;

  gap: 40px;

  li {
    display: flex;

    gap: 25px;

    section {
      overflow: hidden;
    }
  }
}

.songList {
  .head {
    display: flex;
    align-items: center;
    margin: 10px;

    gap: 30px;

    .name {
      font-weight: 500;
      font-size: 17px;
      cursor: pointer;
    }

    .operate {
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

  .more {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: flex-end;
    font-size: 14px;
    cursor: pointer;
    color: rgba($color: #000000, $alpha: .6);

    &:hover {
      color: var(--font-color);
    }

    .icon {
      font-size: 18px;
    }
  }
}

// 提示信息
.tip {
  padding-bottom: 15px;
  color: var(--font-color);
  font-size: 17px;
}
</style>