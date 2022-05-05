<!-- 个性推荐 独家放送 -->
<template>
  <div class="broadcast">
    <el-card @click="$router.push(`/mvDetail/${item.id}`)" shadow="never" v-for="item in broadcastData" :key="item.id">
      <span class="icon i-heroicons-outline:play"></span>
      <el-image :src="item.picUrl" fit="cover" />
      <p>{{ item.copywriter }}</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Discover } from "@/api/modules/discover";

let broadcastData = reactive<any>([]);
onMounted(async () => {
  let { code, result }: any = await Discover.getBroadcastList(0, 4);
  // 获取成功
  if (code == 200) {
    broadcastData.push(...result);
  }
});
</script>

<style lang="scss" scoped>
.broadcast {
  display: flex;
  margin-top: 15px;

  gap: 30px;

  :deep(.el-card) {
    background-color: #f5f7fa;
    cursor: pointer;

    .el-card__body {
      position: relative;
      padding: 0px;

      .icon {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 99;
        color: #fff;
        font-size: 20px;
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
