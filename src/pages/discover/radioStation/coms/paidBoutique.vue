<!-- 付费精品 -->
<template>
  <div class="wrapper" mb-7 mt-3>
    <!-- 导航栏 -->
    <NavBar title="付费精品" path="/123123" />

    <!-- 列表 -->
    <ul gap-5 lg:gap-7 class="content">
      <li v-for="item in paygiftList" :key="item.id">
        <!-- 封面 -->
        <el-image rounded cursor="pointer" basis="1/4" :src="item.picUrl" fit="cover" />
        <!-- 简介 -->
        <div class="info">
          <p cursor="pointer" class="name">{{ item.name }}</p>
          <p class="describe">
            <span>{{ item.rcmdText }}</span>
            <span>{{ item.lastProgramName }}</span>
          </p>
          <p class="price">{{ Handle.Price(item.originalPrice) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/common/navBar/navBar.vue";
import { RadioAPI } from "api";
import { Handle } from "utils";

// 付费精选列表
let paygiftList = reactive<any[]>([]);
// 加载付费精选
onMounted(async () => {
  let { code, data }: any = await RadioAPI.getPaygift(0, 4);
  if (code == 200) paygiftList.push(...data);
});
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.content {
  display: grid;
  padding-top: 15px;

  grid-template-columns: repeat(2, 1fr);

  li {
    display: flex;

    gap: 15px;
  }
}

.info {
  display: flex;
  overflow: hidden;
  flex: 1;
  flex-flow: column nowrap;
  justify-content: space-around;
  cursor: default;

  .name:hover {
    color: var(--theme-bg-color);
  }

  .price {
    color: #d63031;
  }

  .describe {
    display: flex;
    overflow: hidden;
    flex-flow: column nowrap;
    color: #8395a7;
    font-size: 13px;

    span {
      @include oneOmit;
    }
  }
}
</style>
