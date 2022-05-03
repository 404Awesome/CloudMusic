<!-- 电台分类列表 -->
<template>
  <div class="category" v-if="categories.length">
    <div class="left">
      <span @click="leftMove" class="i-heroicons-outline:chevron-left"></span>
    </div>

    <el-scrollbar ref="scrollbar" flex-1 pb-4>
      <ul class="list" ref="innerEl">
        <li v-for="item in categories" :key="item.id">
          <div class="icon">
            <div :style="{ backgroundImage: `url(${item.picMacUrl})` }"></div>
          </div>
          <p class="title">{{ item.name }}</p>
        </li>
      </ul>
    </el-scrollbar>

    <div class="right">
      <span @click="rightMove" class="i-heroicons-outline:chevron-right"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RadioStation } from "@/api/modules/radioStation";

let categories = reactive<any>([]);
onMounted(async () => {
  // 获取电台分类
  let catelistRes: any = await RadioStation.getCatelist();
  if (catelistRes.code == 200) categories.push(...catelistRes.categories);
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
.category {
  display: flex;
  margin-top: 15px;

  user-select: none;

  .left,
  .right {
    display: flex;
    align-self: center;
    justify-content: center;
    padding-bottom: 16px;
    width: 10%;

    span {
      position: relative;
      color: #ced6e0;
      font-size: 30px;
      cursor: pointer;

      &:hover {
        color: var(--theme-bg-color);
      }
    }
  }
}

.list {
  display: flex;
  width: 100%;

  gap: 20px;

  li {
    flex-basis: 55px;
    flex-shrink: 0;
    flex-wrap: 0;
    cursor: pointer;

    &:hover .icon {
      background-color: #fdeded;
    }

    .icon {
      margin: 0 auto;
      padding: 10px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #fdf6f5;

      div {
        width: 100%;
        height: 100%;
        background-position: center right;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }

    .title {
      margin-top: 5px;
      color: var(--font-color);
      text-align: center;
      font-size: 13px;
    }
  }
}
</style>
