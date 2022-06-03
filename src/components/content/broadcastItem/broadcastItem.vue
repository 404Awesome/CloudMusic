<!-- 独家放送item -->
<template>
  <div class="broadcastItem">
    <el-card @click="$router.push(`/mvDetail/${id}`)" shadow="never">
      <span class="icon i-heroicons-outline:play"></span>
      <el-image lazy :src="picUrl" fit="cover" />
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
        font-size: 25px;
        opacity: 0.5;
      }

      p {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        margin: 10px;
        color: var(--font-color);
        text-overflow: ellipsis;
        font-size: 14px;

        -webkit-line-clamp: 2;
      }
    }

    &:hover {
      transform: translateY(-7px);

      .el-card__body {
        .icon {
          opacity: 1;
        }

        p {
          color: var(--theme-bg-color);
        }
      }
    }
  }
}
</style>