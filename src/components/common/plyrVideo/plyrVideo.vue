<!-- Plyr视频组件 -->
<template>
  <div overflow-hidden rounded-md>
    <video ref="playerEl" playsinline controls>
      <source
        v-for="(url, quality) in props.source"
        :key="quality"
        :src="url"
        :size="quality"
        type="video/mp4"
      />
    </video>
  </div>
</template>

<script setup lang="ts">
import Plyr from "plyr";
let props = defineProps({
  // 视频资源
  source: {
    type: Object,
    required: true,
  },
});

// plyr实例
let plyr = ref<Plyr | null>(null);
// video元素
let playerEl = ref<HTMLElement | null>(null);
onMounted(() => {
  nextTick(() => {
    // 音质数组
    let qualityArr = Object.keys(props.source)
      .map((quality: string) => {
        return parseInt(quality);
      })
      .sort((x: any, y: any) => {
        return y - x;
      });

    plyr.value = new Plyr(playerEl.value!, {
      settings: ["speed", "quality"],
      quality: {
        default: Math.max(...qualityArr),
        options: qualityArr,
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
  });
});

// 销毁视频
onBeforeUnmount(() => {
  plyr.value?.destroy();
});
</script>
