<!-- mv列表item -->
<template>
  <div :class="{ flex: isFlex }" class="group" text-15px cursor-pointer min-h-35>
    <section @click="goMVDetailPage" class="cover" relative flex overflow-hidden>
      <!-- 封面 -->
      <el-image fit="cover" lazy :src="cover" rounded-md brightness-85 w-full h-35 />
      <!-- 播放次数 -->
      <p text-white absolute top-2px right-6px z-2>
        <span text-22px i-eva:arrow-right-outline></span>
        <span>{{ Handle.Count(playCount) }}</span>
      </p>
      <!-- hover:播放图标 -->
      <p class="playIcon">
        <span i-eva:arrow-right-fill></span>
      </p>
    </section>

    <!-- 详情 -->
    <section mt-5px overflow-hidden>
      <!-- 标题 -->
      <p @click="goMVDetailPage" truncate group-hover:themeColor>{{ name }}</p>
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
@import "@/scss/mixins.scss";

.cover {
  .playIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba($color: #fff, $alpha: 0.5);
    color: #d33a31;
    font-size: 30px;
    opacity: 0;
    transition: opacity 0.3s linear;
    transform: translate(-50%, -50%);

    &:hover {
      background-color: rgba($color: #fff, $alpha: 0.8);
    }
  }

  &:hover .playIcon {
    opacity: 1;
  }
}

.flex {
  gap: 10px;
  flex: 1;

  &>section {
    width: 50%;

    &:last-child>p:first-child {
      white-space: normal;

      @include multilineOmit(2);
    }
  }
}
</style>
