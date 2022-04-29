<template>
  <div class="status" dark:bg-gray-600>
    <!-- 标题 -->
    <section class="title" @click="$router.push('/')">CloudMusic</section>

    <!-- 路由导航栏 -->
    <section class="nav">
      <ul v-if="$route.meta.tablist">
        <li
          @click="$router.push(item.path)"
          :key="item.path"
          :class="{ active: $route.fullPath == item.path }"
          v-for="item in ($route.meta.tablist as any)"
        >
          {{ item.title }}
        </li>
      </ul>
      <p v-else>
        {{ $route.meta.title }}
      </p>
    </section>

    <!-- 工具栏 -->
    <section class="toolbar">
      <!-- 搜索 -->
      <input dark="bg-gray-300" class="search" type="text" placeholder="搜索" />
      <span class="icon i-heroicons-outline:search"></span>
      <!-- 主题 -->
      <el-popover placement="bottom" trigger="click">
        <template #reference>
          <span class="icon i-heroicons-outline:color-swatch"></span>
        </template>
        <template #default>
          <ul class="themeSelect" @click="themeSelect">
            <li data-color="#ff3f34"></li>
            <li data-color="#575fcf"></li>
            <li data-color="#6ab04c"></li>
          </ul>
        </template>
      </el-popover>
      <!-- 通知 -->
      <span
        @click="$router.push('/notice')"
        class="icon i-heroicons-outline:bell"
      ></span>
      <!-- 暗夜模式 -->
      <span
        @click="setDark"
        class="icon i-heroicons-outline:sun dark:i-heroicons-outline:moon"
      ></span>
      <!-- 设置 -->
      <span
        @click="$router.push('/setting')"
        class="icon i-heroicons-outline:cog"
      ></span>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "store/index";
const store = useMainStore();

// 主题选择
let themeSelect = (event: Event) => {
  let color = (event.target as any).getAttribute("data-color");
  if (!color || color == store.theme) return;
  store.theme = color;
  document.documentElement.style.setProperty("--theme-bg-color", color);
};

// 黑夜模式
let setDark = () => {
  store.isDark = !store.isDark;
};
</script>

<style lang="scss" scoped>
.status {
  position: relative;
  z-index: 100;
  display: flex;
  height: 100%;
  background-color: var(--theme-bg-color);
  box-shadow: 0 2px 5px rgba($color: #000000, $alpha: 0.2);

  .title {
    flex-basis: 230px;
    color: white;
    text-align: center;
    font-size: 20px;
    line-height: 49px;
    cursor: pointer;
  }

  .nav {
    overflow: hidden;
    flex: 1;

    ul,
    p {
      display: flex;
      align-items: center;
      padding: 0px 10px 0px 30px;
      height: 100%;
      color: #fff;

      user-select: none;
    }

    ul li {
      margin-right: 20px;
      color: rgba($color: #fff, $alpha: 0.7);
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        color: #fff;
      }

      &.active {
        color: #fff;
      }
    }
  }

  .toolbar {
    display: flex;
    align-items: center;
    flex-basis: 300px;
    justify-content: flex-end;
    padding: 0 15px;
    font-size: 20px;

    .search {
      padding: 0 10px;
      height: 25px;
      outline: none;
      border: none;
      border-radius: 3px;
      color: #424242;
    }

    .icon {
      margin-left: 12px;
      color: rgba($color: #fff, $alpha: 0.7);
      cursor: pointer;

      &:hover {
        color: #fff;
      }
    }
  }
}

// 主题选择器
.themeSelect {
  display: flex;
  justify-content: center;

  gap: 20px;

  li {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;

    &:nth-child(1) {
      background-color: #ff3f34;
    }

    &:nth-child(2) {
      background-color: #575fcf;
    }

    &:nth-child(3) {
      background-color: #6ab04c;
    }
  }
}
</style>
