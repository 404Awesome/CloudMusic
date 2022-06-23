<!-- 个性推荐 主播电台 -->
<template>
  <ul grid3Cols mt-15px pb-30px>
    <li v-for="item in data" :key="item.id" class="group" flex overflow-hidden rounded-md bg="#f5f7fa" cursor-pinter>
      <!-- 电台封面 -->
      <el-image h-20 w-20 grow-0 shrink-0 :src="item.picUrl" fit="cover" lazy />

      <!-- 电台信息 -->
      <div flex overflow-hidden flex-1 flex-col flex-nowrap justify-evenly p-10px>
        <p truncate text-15px group-hover:themeColor>{{ item.copywriter }}</p>
        <p truncate text="13px black/50">{{ item.name }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { RadioAPI } from "api";

let data = reactive<any>([]);
onMounted(async () => {
  let { djRadios, code }: any = await RadioAPI.getHot(0, 6);
  if (code == 200) data.push(...djRadios);
});
</script>