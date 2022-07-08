<!-- mv列表item -->
<template>
  <div :class="{ flex: isFlex }" class="group mvItem">
    <section @click="goMVDetailPage" class="cover">
      <!-- 封面 -->
      <el-image fit="cover" lazy :src="cover" class="img" />

      <!-- 播放次数 -->
      <p class="count">
        <span text-21px i-eva:arrow-right-outline></span>
        <span>{{ Handle.Count(playCount) }}</span>
      </p>

      <!-- hover:播放图标 -->
      <p class="playIcon">
        <span i-eva:arrow-right-fill></span>
      </p>
    </section>

    <!-- 详情 -->
    <section class="detail">
      <!-- 标题 -->
      <p @click="goMVDetailPage" class="title" truncate group-hover:themeColor group-hover-dark-text-orange-400>
        {{ name }}
      </p>

      <!-- 艺术家 -->
      <Artists :artists="artists" />
    </section>
  </div>
</template>

<script setup lang="ts">
import Artists from "@/components/content/artists/artists.vue";
import { PropType, toRaw } from "vue";
import { useRouter } from "vue-router";
import { Handle } from "utils";
const router = useRouter();
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  artists: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  playCount: {
    type: Number,
    required: true,
  },
  isFlex: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String as PropType<"push" | "replace">,
    default: "push"
  }
});
let { id, cover, artists, name, playCount, isFlex, mode } = toRaw(props);

// 跳转MV详情页面
let goMVDetailPage = () => {
  if (mode == "push") {
    router.push(`/mvDetail/${id}`);
  } else if (mode == "replace") {
    router.replace(`/mvDetail/${id}`);
  } else {
    router.push(`/`);
  }
}
</script>

<style lang="scss" scoped>
.mvItem {
  @apply w-full text-15px cursor-pointer;

  .cover {
    @apply relative flex overflow-hidden;

    .img {
      @apply rounded-md brightness-85 w-full h-35;
    }

    .count {
      @apply text-white absolute top-2px right-6px z-2 flex items-center;
    }
  }

  .detail {
    @apply mt-5px overflow-hidden;
  }
}

// 横向布局
.flex {
  gap: 10px;

  .cover,
  .detail {
    flex: 1;
  }

  .title {
    margin-bottom: 5px;
    white-space: normal;

    @apply twoLineOmit;
  }
}
</style>
