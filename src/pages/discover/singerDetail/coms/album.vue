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
            <h4 class="name">{{ album.name }}</h4>
            <!-- 操作 -->
            <section class="operate">
              <span class="icon i-heroicons-outline:play"></span>
              <span class="splitLine">|</span>
              <span class="icon i-heroicons-outline:folder-add"></span>
            </section>
          </header>


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
import { useRoute } from "vue-router";
const route = useRoute();
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
      let time = new Date(album.publishTime).toLocaleDateString('cn');
      albumList.push({
        songs,
        time,
        picUrl: album.picUrl,
        id: album.id,
        name: album.name,
      })
    }
  });
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

    gap: 20px;
  }
}

.songList {
  .head {
    display: flex;
    align-items: center;

    gap: 30px;

    .name {
      font-weight: 500;
      font-size: 17px;
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
}

// 提示信息
.tip {
  padding-bottom: 15px;
  color: var(--font-color);
  font-size: 17px;
}
</style>