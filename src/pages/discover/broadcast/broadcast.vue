<!-- 独家放送 -->
<template>
  <div grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 class="wrapper broadcast" v-infinite-scroll="load"
    :infinite-scroll-disabled="disabled">
    <el-card @click="$router.push(`/mvDetail/${item.id}`)" v-for="item in broadcastList" :key="item.id" shadow="never">
      <span class="icon i-heroicons-outline:play"></span>
      <el-image lazy :src="item.picUrl" fit="cover" />
      <p>{{ item.copywriter }}</p>
    </el-card>
  </div>

  <!-- 分割线 -->
  <el-divider>
    <span class="tip">{{ disabled ? '已加载到底!' : 'Loading...' }}</span>
  </el-divider>
</template>

<script setup lang="ts">
import { Discover } from "@/api/modules/discover";

// 是否正在加载
let isLoading = ref(false);
// 是否禁用无限滚动
let disabled = ref(false);
// 独家放送列表
let broadcastList = reactive<any>([]);
// 偏移量
let offset = ref(0);
// 加载
let load = async () => {
  isLoading.value = true;
  let { code, result, more }: any = await Discover.getBroadcastList(offset.value);
  if (code == 200) {
    broadcastList.push(...result);
    offset.value = broadcastList.length;
    // 无法加载更多
    if (!more) disabled.value = true;
  }
  isLoading.value = false;
};
onMounted(() => {
  if (!isLoading.value) load();
})
</script>

<style lang="scss" scoped>
.broadcast {
  padding-top: 15px;
  cursor: pointer;

  :deep(.el-card) {
    background-color: #f5f7fa;

    .el-card__body {
      position: relative;
      padding: 0;

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

// 提示信息
.tip {
  padding-bottom: 15px;
  color: var(--font-color);
  font-size: 17px;
}
</style>
