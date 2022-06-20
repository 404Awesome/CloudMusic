<!-- 独家放送item -->
<template>
  <div class="broadcastItem">
    <el-card @click="$router.push(`/mvDetail/${id}`)" shadow="never">
      <!-- 播放图标 -->
      <span class="icon i-heroicons-outline:play"></span>

      <!-- 封面 -->
      <el-image w-full h-26 lazy :src="picUrl" fit="cover" />

      <!-- 描述 -->
      <p>{{ copywriter }}</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  picUrl: {
    type: String,
    required: true
  },
  copywriter: {
    type: String,
    required: true
  },
});
let { id, picUrl, copywriter } = toRaw(props);
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.broadcastItem {
  :deep(.el-card) {
    background-color: #f5f7fa;
    cursor: pointer;

    .el-card__body {
      position: relative;
      padding: 0px;

      .icon {
        position: absolute;
        top: 7px;
        left: 7px;
        z-index: 99;
        color: #fff;
        font-size: 27px;
        opacity: 0;
        transition: opacity .3s ease-in-out;
      }

      p {
        margin: 10px;
        font-size: 14px;

        @include multilineOmit(2);
      }
    }

    &:hover {
      transform: translateY(-7px);

      .el-card__body {
        .icon {
          opacity: 1;
        }

        p {
          color: var(--theme-color);
        }
      }
    }
  }
}
</style>