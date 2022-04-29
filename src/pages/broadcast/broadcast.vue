<template>
  <!-- 独家放送 -->
  <div
    grid-cols-2
    gap-4
    lg:grid-cols-3
    xl:grid-cols-4
    xl:gap-6
    class="broadcast"
    v-infinite-scroll="load"
    :infinite-scroll-delay="1000"
    :infinite-scroll-disabled="disabled"
  >
    <el-card v-for="item in broadcastList" :key="item.id" shadow="never">
      <el-image :src="item.picUrl" fit="cover" />
      <p>{{ item.copywriter }}</p>
    </el-card>
  </div>

  <el-divider>
    <span class="tip">{{ tipMsg }}</span>
  </el-divider>
</template>

<script setup lang="ts">
import { getBroadcastList } from "@/api/discover";

// 提示文本
let tipMsg = ref("Loading...");
// 是否禁用无限滚动
let disabled = ref(false);
// 独家放送列表
let broadcastList = reactive<any>([]);
// 偏移量
let offset = ref(0);
// 加载
let load = async () => {
  let { code, result, more }: any = await getBroadcastList(offset.value);
  if (code == 200) {
    broadcastList.push(...result);
    offset.value = broadcastList.length;

    // 无法加载更多
    if (!more) {
      disabled.value = true;
      tipMsg.value = "已加载到底!";
    }
  }
};
</script>

<style lang="scss" scoped>
.broadcast {
  display: grid;
  padding: 15px 30px;

  gap: 30px;
  grid-template-columns: repeat(4, 1fr);

  :deep(.el-card) {
    background-color: #f5f7fa;
    cursor: pointer;

    .el-card__body {
      padding: 0;

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

// 提示信息
.tip {
  color: var(--font-color);
  font-size: 17px;
}
</style>
