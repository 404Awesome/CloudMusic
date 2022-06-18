<!-- Plyr视频组件 -->
<template>
  <div overflow-hidden rounded-md>
    <video ref="playerEl" playsinline controls>
      <source v-for="item in props.source" :key="item.r" :src="item.url" :size="item.r" type="video/mp4" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useMitt } from "utils";
import Plyr from "plyr";
const props = defineProps({
  source: {
    type: Array as PropType<{ r: number, url: string }[]>,
    required: true,
  },
});

// plyr实例
let videoPlyr = ref<Plyr>();
// video元素
let playerEl = ref<HTMLElement | null>(null);
onMounted(() => {
  // 音质数组
  let qualityArr = props.source.map(item => item.r);
  videoPlyr.value = new Plyr(playerEl.value!, {
    settings: ["speed", "quality"],
    quality: {
      default: Math.max(...qualityArr),
      options: qualityArr.reverse(),
    },
    controls: [
      "play",
      "volume",
      "progress",
      "settings",
      "fullscreen",
      "current-time",
    ],
    speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
    i18n: {
      speed: "速度",
      normal: "标准",
      quality: "画质",
      qualityBadge: {
        1080: "超清",
        720: "高清",
        480: "标清",
      },
    },
  });

  // 视频播放 -> 暂停歌曲播放
  videoPlyr.value.on("play", () => useMitt.emit("audioPause"));
});

// 销毁视频组件
onBeforeUnmount(() => videoPlyr.value?.destroy());
// 暂停视频播放
useMitt.on("videoPause", () => {
  if (videoPlyr.value?.playing) {
    videoPlyr.value.pause();
  }
})
</script>
