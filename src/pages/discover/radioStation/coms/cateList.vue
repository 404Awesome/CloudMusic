<!-- 电台分类列表 -->
<template>
  <div v-if="cateList.length" flex mt-15px select-none>
    <!-- 左移动按钮 -->
    <div class="moveBtn">
      <span @click="leftMove" relative text="#ced6e0 30px" cursor-pointer hover:themeColor
        i-heroicons-outline:chevron-left></span>
    </div>

    <el-scrollbar ref="scrollbar" :height="80" flex-1>
      <ul ref="innerEl" flex gap-20px>
        <li v-for="item in cateList" :key="item.id" class="group" w-55px shrink-0 grow-0 cursor-pointer>
          <!-- 图标 -->
          <div mx-auto w-50px h-50px p-10px rounded-full bg="#fdf6f5" group-hover:bg="#fdeded">
            <div :style="{ backgroundImage: `url(${item.picMacUrl})` }" w-full h-full bg="center right cover no-repeat">
            </div>
          </div>

          <!-- 标题 -->
          <p text="center 13px">{{ item.name }}</p>
        </li>
      </ul>
    </el-scrollbar>

    <!-- 右移动按钮 -->
    <div class="moveBtn">
      <span @click="rightMove" relative text="#ced6e0 30px" cursor-pointer hover:themeColor
        i-heroicons-outline:chevron-right></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { RadioAPI } from "api";

// 分类列表
let cateList = reactive<any>([]);
// 加载电台分类
onMounted(async () => {
  let { code, categories }: any = await RadioAPI.getCatelist();
  if (code == 200) cateList.push(...categories);
});

let scrollbar = ref<any>();
let innerEl = ref<HTMLElement>();
// 向左移动
let leftMove = () => {
  let left = scrollbar.value.wrap$.scrollLeft;
  if (left <= 0) return;
  let callback = () => {
    if (left <= 0) return;
    left -= 20;
    scrollbar.value.setScrollLeft(left);
    requestAnimationFrame(callback);
  };
  requestAnimationFrame(callback);
};
// 向右移动
let rightMove = () => {
  let left = scrollbar.value.wrap$.scrollLeft;
  let scrollWidth = innerEl.value!.scrollWidth;
  if (left + innerEl.value?.clientWidth >= scrollWidth) return;
  let callback = () => {
    if (left >= scrollWidth) {
      return;
    }
    left += 20;
    scrollbar.value.setScrollLeft(left);
    requestAnimationFrame(callback);
  };
  requestAnimationFrame(callback);
};
</script>

<style lang="scss" scoped>
.moveBtn {
  @apply flex self-center justify-center pb-16px w-1/10;
}
</style>