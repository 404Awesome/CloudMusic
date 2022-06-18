<!-- MV详情 -->
<template>
  <div pt-4 pb-8 v-if="props.artists">
    <!-- 艺术家 -->
    <div flex items-center>
      <!-- <el-image :src="" fit="cover" /> -->
      <Artists :artists="props.artists!" />
    </div>

    <!-- mv信息 -->
    <div class="mvInfo">
      <!-- 标题 -->
      <h4 class="title">
        <span>{{ props.name }}</span>
        <span v-if="props.desc" @click="showDesc = !showDesc" :class="{ active: showDesc }"
          class="icon i-eva:arrow-up-fill"></span>
      </h4>

      <!-- 元信息 -->
      <p class="metaInfo">
        <span>发布: {{ publishTime }}</span>
        <span>播放: {{ Handle.Count(playCount!) }}</span>
      </p>

      <!-- 简介 -->
      <p class="describe" v-show="showDesc">{{ props.desc }}</p>

      <!-- 操作 -->
      <div class="operate">
        <!-- 赞 / 收藏 / 分享 -->
        <ul class="control">
          <li v-for="item in control" :key="item.title">
            <span class="icon" :class="item.icon"></span>
            <span>{{ item.title }}</span>
          </li>
        </ul>

        <!-- 举报 -->
        <p class="report">举报</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Artists from "@/components/content/artists/artists.vue";
import { ArtistAPI } from "api";
import { Handle } from "utils";
const props = defineProps({
  artists: Array,
  publishTime: String,
  playCount: Number,
  desc: String,
  name: String,
  subCount: Number,
  likedCount: Number,
  shareCount: Number
});

// 赞 / 收藏 / 分享
let control = reactive([
  {
    title: `赞 (${props.likedCount})`,
    icon: "i-heroicons-outline:thumb-up",
  },
  {
    title: `收藏 (${props.subCount})`,
    icon: "i-heroicons-outline:folder-add",
  },
  {
    title: `转发 (${props.shareCount})`,
    icon: "i-heroicons-outline:external-link",
  },
]);

// 是否显示简介
let showDesc = ref(false);

// 歌手详情
let singerDetail = reactive({});
// 加载歌手详情
onMounted(async () => {
  // try {
  //   let { code, data: { artist } }: any = await ArtistAPI.getDetail(detail.artists[0].id);
  //   if (code == 200) Object.assign(singerDetail, artist);
  // } catch (err: any) {
  //   ElMessage.error("加载歌手详情失败!");
  // }
})
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.mvInfo {
  margin-top: 10px;

  .title {
    margin: 0;
    color: var(--font-color);
    font-weight: 400;
    font-size: 20px;

    .icon {
      font-size: 25px;
      cursor: pointer;
      transition: transform 0.3s ease-in-out;
      transform: rotate(180deg);

      &.active {
        transform: rotate(0deg);
      }

      &:hover {
        color: var(--theme-bg-color);
      }
    }
  }

  .metaInfo {
    display: flex;
    margin: 10px 0px;
    color: rgba($color: #000000, $alpha: 0.5);
    font-size: 14px;

    gap: 15px;
  }

  .describe {
    padding: 10px;
    border-radius: 5px;
    background-color: #f4f4f5;
    color: var(--font-color);
    font-size: 14px;
  }

  .operate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 14px;

    gap: 10px;
    user-select: none;

    .control li,
    .report {
      @include oneOmit;
    }

    .control {
      display: flex;
      overflow: hidden;
      flex: 1;

      gap: 10px;

      li {
        padding: 5px 10px;
        border: 1px solid #eee;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: #f5f7fa;
          color: var(--theme-bg-color);
        }

        .icon {
          margin-right: 5px;
          font-size: 17px;
        }
      }
    }

    .report {
      cursor: pointer;

      &:hover {
        color: var(--theme-bg-color);

      }
    }
  }
}
</style>
