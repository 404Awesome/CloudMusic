<!-- 付费精品 -->
<template>
  <div wrapBox mb-7 mt-3>
    <!-- 导航栏 -->
    <NavBar title="付费精品" path="/" />

    <!-- 列表 -->
    <ul grid gap-5 lg:gap-7 pt-15px grid-cols-2>
      <li v-for="item in paygiftList" :key="item.id" flex gap-15px>
        <!-- 封面 -->
        <el-image rounded cursor-pointer w-25 :src="item.picUrl" fit="cover" />
        <!-- 简介 -->
        <div flex overflow-hidden flex-1 flex-col flex-nowrap justify-around cursor-default>
          <!-- 名字 -->
          <p truncate cursor-pointer hover:themeColor>{{ item.name }}</p>
          <!-- 描述 -->
          <p flex-nowrap flex-col flex overflow-hidden text="13px #8395a7">
            <span truncate>{{ item.rcmdText }}</span>
            <span truncate>{{ item.lastProgramName }}</span>
          </p>
          <!-- 价格 -->
          <p text="#d63031">{{ Handle.Price(item.originalPrice) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/common/navBar/navBar.vue";
import { reactive, onMounted } from "vue";
import { RadioAPI } from "api";
import { Handle } from "utils";

// 付费精选列表
let paygiftList = reactive<any[]>([]);
// 加载付费精选
onMounted(async () => {
  let { code, data: { list } }: any = await RadioAPI.getPaygift(0, 4);
  if (code == 200) paygiftList.push(...list);
});
</script>