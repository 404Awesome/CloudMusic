<!-- 歌手详情 专辑 -->
<template>
  <div>
    <ul class="album" pb-4 v-infinite-scroll="loadAlbumData" :infinite-scroll-disabled="disabled">
      <!-- top50 -->
      <li class="hotSongs" mt-4>
        <!-- 封面 -->
        <section transition-all duration-200 ease-linear w-35 h-35 lg:w-40 lg:h-40 rounded shadow-lg class="cover">
          <span>Top</span>
          <span>50</span>
        </section>
        <!-- 歌单列表 -->
        <section flex-1>
          <!-- 歌单列表 -->
          <SongList name="热门50首" :songs="showAll ? topSongs : topSongs.slice(0, 10)" :id="id" />
          <!-- 是否显示全部 -->
          <div v-if="!showAll" class="more" @click="showAll = !showAll">
            <span>查看全部50首</span>
            <span class="icon i-eva:arrow-ios-forward-outline"></span>
          </div>
        </section>
      </li>

      <!-- 专辑列表 -->
      <li v-for="album in albumList" :key="album.id">
        <!-- 专辑封面  -->
        <section>
          <el-image transition-all duration-200 ease-linear w-35 h-35 lg:w-40 lg:h-40 rounded shadow-lg fit="cover" lazy
            :src="album.picUrl" />
          <p text-sm>{{ album.time }}</p>
        </section>

        <!-- 歌单列表 -->
        <section flex-1>
          <!-- 歌单列表 -->
          <SongList :name="album.name" :songs="album.songs" :origin="album.origin" :id="album.id" />
          <!-- 是否显示全部 -->
          <div class="more" v-if="album.more">
            <span>查看全部</span>
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
import SongList from "./songList.vue";
import { Handle } from "utils";
import { ArtistAPI } from "api";
import { useRoute } from "vue-router";
const route = useRoute();
const id = parseInt(route.query.id as string);

// 是否正在加载
let loading = ref(false);
// 是否禁用无限滚动
let disabled = ref(false);
// 偏移量
let offset = ref(0);
// 限制
let limit = 5;
// 专辑列表
let albumList = reactive<any>([]);
// 加载专辑数据
let loadAlbumData = async () => {
  try {
    if (loading.value) return;
    loading.value = true;
    let { more, code, hotAlbums }: any = await ArtistAPI.getAlbum(id, offset.value, limit);
    if (code == 200) {
      // 加载专辑信息
      loadAlbumInfo(hotAlbums);
      offset.value += limit;
      // 无法加载更多
      if (!more) disabled.value = true;
    }
  } catch (err: any) {
    ElMessage.error("加载专辑列表失败!");
  } finally {
    loading.value = false;
  }
}
// 加载专辑信息
let loadAlbumInfo = (hotAlbums: any) => {
  try {
    hotAlbums.map(async (item: any) => {
      let { code, album, songs: origin }: any = await ArtistAPI.getAlbumInfo(item.id);
      if (code == 200) {
        // 处理时间
        let time = Handle.TimeStamp(album.publishTime);
        // 处理歌曲列表长度
        let more = origin.length > 10 ? true : false;
        let songs = origin.length > 10 ? origin.slice(0, 10) : origin.slice(0);
        albumList.push({
          songs,
          time,
          more,
          origin,
          picUrl: album.picUrl,
          id: album.id,
          name: album.name,
        })
      }
    });
  } catch (err: any) {
    ElMessage.error("加载专辑内容失败!");
  }
}

// 热门歌曲列表
let topSongs = reactive<any>([]);
// 显示全部
let showAll = ref(false);
// 加载歌手热门50首歌曲
onMounted(async () => {
  try {
    loading.value = true;
    let { code, songs }: any = await ArtistAPI.getTopSong(id);
    if (code == 200) {
      topSongs.push(...songs);
    }
  } catch (err: any) {
    ElMessage.error("加载Top50失败!");
  } finally {
    loading.value = false;
  }
})
</script>

<style lang="scss" scoped>
.hotSongs,
.album li {
  display: flex;

  gap: 25px;

  &>section {
    overflow: hidden;
  }
}

.hotSongs .cover {
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  justify-content: center;
  background-image: linear-gradient(to bottom, #565760 0%, #715361 100%);

  span {
    color: #fff;
    font-weight: 600;
    font-size: 50px;

    &:last-child {
      transform: translateY(-10px);
    }
  }
}

.album {
  display: flex;
  flex-flow: column nowrap;

  gap: 40px;
}

.more {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 40px;
  color: rgba($color: #000000, $alpha: .6);
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: var(--font-color);
  }

  .icon {
    font-size: 18px;
  }
}

// 提示信息
.tip {
  padding-bottom: 15px;
  color: var(--font-color);
  font-size: 17px;
}
</style>