<template>
  <!-- 个性推荐 - 独家放送 -->
  <div gap-4 xl:gap-6 class="broadcast">
    <el-card shadow="never" v-for="item in broadcastData" :key="item.id">
      <el-image :src="item.picUrl" fit="cover" />
      <p>{{ item.copywriter }}</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getBroadcast } from "@/api/discover";

let broadcastData = reactive<any>([]);
onMounted(async () => {
  let { code, result }: any = await getBroadcast();
  // 获取成功
  if (code == 200) {
    broadcastData.push(...result);
  }
});
</script>

<style lang="scss" scoped>
.broadcast {
  display: flex;
  margin: 0 auto;
  margin-top: 15px;
  width: 80%;

  :deep(.el-card) {
    background-color: #f5f7fa;
    cursor: pointer;

    .el-card__body {
      padding: 0px;

      p {
        padding: 15px;
        color: var(--font-color);
      }
    }

    &:hover {
      transform: translateY(-7px);

      .el-card__body p {
        color: var(--theme-bg-color);
      }
    }
  }
}
</style>
