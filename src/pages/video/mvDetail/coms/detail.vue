<!-- MV详情 -->
<template>
  <div class="detail">
    <!-- 艺术家信息 -->
    <div class="artistsInfo">
      <!-- <el-image :src="" fit="cover" /> -->
      <p class="artists" v-html="handleArtists(detail.artists)"></p>
    </div>

    <!-- mv信息 -->
    <div class="mvInfo">
      <!-- 标题 -->
      <h4 class="title">
        <span>{{ detail.name }}</span>
        <span v-if="detail.desc" @click="showDesc = !showDesc" :class="{ active: showDesc }"
          class="icon i-eva:arrow-up-fill"></span>
      </h4>

      <!-- 元信息 -->
      <p class="metaInfo">
        <span>发布: {{ detail.publishTime }}</span>
        <span>播放: {{ handleCount(detail.playCount) }}</span>
      </p>

      <!-- 简介 -->
      <p class="describe" v-show="showDesc">{{ detail.desc }}</p>

      <!-- 操作 -->
      <div class="operate">
        <!-- 赞 / 收藏 / 分享 / 举报 -->
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
import { handleArtists, handleCount } from "@/utils/tools";
let props = defineProps({
  detail: {
    type: Object,
    required: true,
  },
});
let detail = toRef(props, "detail");

// 赞 / 收藏 / 分享
let control = reactive([
  {
    title: `赞 (${detail.value.likedCount})`,
    icon: "i-heroicons-outline:thumb-up",
  },
  {
    title: `收藏 (${detail.value.subCount})`,
    icon: "i-heroicons-outline:folder-add",
  },
  {
    title: `转发 (${detail.value.shareCount})`,
    icon: "i-heroicons-outline:external-link",
  },
]);

// 是否显示简介
let showDesc = ref(false);
</script>

<style lang="scss" scoped>
.detail {
  margin: 15px 0px 30px;
}

.artistsInfo {
  display: flex;
  align-items: center;
  cursor: pointer;

  p.artists {
    color: var(--font-color);
    font-size: 14px;

    :deep(.name):hover {
      color: var(--theme-bg-color);
    }
  }
}

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
    background-color: #eee;
    color: var(--font-color);
    font-size: 14px;
  }

  .operate {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    .control {
      display: flex;
      flex: 1;

      gap: 10px;

      li {
        padding: 5px 10px;
        border: 1px solid #eee;
        border-radius: 5px;
        color: var(--font-color);
        font-size: 14px;
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
      color: var(--font-color);
      font-size: 14px;
      cursor: pointer;

      &:hover {
        color: var(--theme-bg-color);
      }
    }
  }
}
</style>
