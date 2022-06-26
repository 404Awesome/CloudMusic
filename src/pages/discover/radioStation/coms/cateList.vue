<!-- 电台分类列表 -->
<template>
  <div flex mt-15px select-none>
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div w-full flex justify-center>
          <el-skeleton-item wrapBox h-80px rounded-md />
        </div>
      </template>
      <template #default>
        <!-- 左移动按钮 -->
        <div class="moveBtn">
          <span @click="leftMove" class="moveIcon" i-heroicons-outline:chevron-left></span>
        </div>

        <!-- 类型列表 -->
        <el-scrollbar ref="scrollbar" :height="80" flex-1>
          <ul ref="innerEl" flex gap-20px>
            <li v-for="item in cateList" :key="item.id" class="group" w-55px shrink-0 grow-0 cursor-pointer>
              <!-- 图标 -->
              <div mx-auto w-50px h-50px p-10px rounded-full bg="#fdf6f5" group-hover:bg="#fdeded">
                <div :style="{ backgroundImage: `url(${item.picMacUrl})` }" w-full h-full
                  bg="center right cover no-repeat">
                </div>
              </div>

              <!-- 标题 -->
              <p text="center 13px" mt-5px>{{ item.name }}</p>
            </li>
          </ul>
        </el-scrollbar>

        <!-- 右移动按钮 -->
        <div class="moveBtn">
          <span @click="rightMove" class="moveIcon" i-heroicons-outline:chevron-right></span>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import { RadioAPI } from "api";
import { ElMessage } from "element-plus";

// 加载状态
let loading = ref(true);
// 分类列表
let cateList = reactive<any>([]);
// 加载电台分类
onMounted(async () => {
  try {
    let { code, categories }: any = await RadioAPI.getCatelist();
    if (code == 200) cateList.push(...categories);
  } catch (err: any) {
    ElMessage.error("加载电台分类失败!");
  } finally {
    loading.value = false;
  }
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

.moveIcon {
  @apply relative text-#ced6e0 text-30px cursor-pointer hover-themeColor;
}
</style>