<!-- 顶部导航栏 -->
<template>
  <div class="topNavBar">
    <!-- 标题 -->
    <h1 class="title" hidden md:block @click="$router.push('/')">CloudMusic</h1>

    <!-- 导航栏 -->
    <nav class="nav">
      <!-- 路由 -->
      <section class="router">
        <p v-if="$route.meta.tablist">
          <span v-for="item in ($route.meta.tablist as any)" :class="{ active: $route.fullPath == item.path }"
            @click="$router.push(item.path)">
            {{ item.title }}
          </span>
        </p>
        <p v-else>
          <span class="active">{{ $route.meta.title }}</span>
        </p>
      </section>

      <!-- 功能 -->
      <section class="function">
        <!-- 搜索 -->
        <el-popover width="200px" placement="bottom-start" trigger="click">
          <template #reference>
            <span class="i-heroicons-outline:search"></span>
          </template>
          <template #default>
            <div class="search">
              <!-- 表单 -->
              <div class="form">
                <input type="text" placeholder="搜索" />
                <button>搜索</button>
              </div>

              <!-- 热搜榜 -->
              <div class="trending">
                <el-divider>
                  <h4>热搜榜</h4>
                </el-divider>
                <el-scrollbar height="200px" :always="true">
                  <p class="trendingList" v-for="(item, index) in searchHot" :key="item.searchWord">
                    <span :style="{ 'color': index < 3 ? '#ff3f34' : '' }">{{ index + 1 }}</span>
                    <span>{{ item.searchWord }}</span>
                    <span>{{ item.score }}</span>
                  </p>
                </el-scrollbar>
              </div>
            </div>
          </template>
        </el-popover>

        <!-- 主题 -->
        <el-popover placement="bottom" trigger="click">
          <template #reference>
            <span class="i-heroicons-outline:color-swatch"></span>
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
        <span @click="$router.push('/notice')" class="i-heroicons-outline:bell"></span>

        <!-- 暗夜模式 -->
        <span @click="setDark" class="i-heroicons-outline:sun dark:i-heroicons-outline:moon"></span>

        <!-- 设置 -->
        <span @click="$router.push('/setting')" class="i-heroicons-outline:cog"></span>
      </section>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { Operate } from "@/api/modules/operate";
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

let searchHot = reactive<any>([]);
onMounted(async () => {
  // 获取搜索热搜
  let { code, data }: any = await Operate.getSearchHot();
  if (code == 200) searchHot.push(...data);
})
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.topNavBar {
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  height: 100%;
  background-color: var(--theme-bg-color);
  box-shadow: 0 2px 5px rgba($color: #000000, $alpha: 0.2);

  user-select: none;

  // 标题
  h1.title {
    color: #fff;
    text-align: center;
    font-weight: 400;
    font-size: 20px;
    cursor: pointer;

    @include flexBasis(var(--sideNavBarWidth), 0, 0);
  }

  span {
    color: rgba($color: #fff, $alpha: .7);
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }

  // 导航栏
  .nav {
    display: flex;
    overflow: hidden;
    flex: 1;
    justify-content: space-between;
    padding: 0px 15px;

    gap: 15px;
  }
}

.router {
  flex: 1;

  p {
    display: flex;
    color: rgba($color: #fff, $alpha: 0.7);

    gap: 10px;

    span {
      font-size: 15px;
      cursor: pointer;

      &.active {
        color: #fff;
      }
    }
  }
}

.function {
  display: flex;
  align-items: center;

  gap: 10px;

  span {
    flex: 1;
    font-size: 19px;
  }
}

.search {

  .form {
    display: flex;

    gap: 5px;

    input {
      box-sizing: border-box;
      padding: 5px 10px;
      width: 130px;
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: #eee;
      color: var(--font-color);
      font-size: 14px;
    }

    button {
      flex: 1;
      border: none;
      border-radius: 5px;
      background-color: var(--theme-bg-color);
      color: #fff;
      white-space: nowrap;
      cursor: pointer;
    }
  }

  .trending {
    margin-top: 10px;

    h4 {
      color: var(--font-color);
    }

    .trendingList {
      display: flex;
      overflow: hidden;
      margin-bottom: 5px;
      color: var(--font-color);
      font-size: 14px;
      cursor: pointer;


      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:nth-child(1) {
          width: 25px;
          text-align: center;
        }

        &:nth-child(2) {
          margin-right: 5px;
        }

        &:nth-child(3) {
          color: rgba($color: #000000, $alpha: .3);
        }
      }

      &:hover {
        color: #ff3f34;
      }
    }
  }
}

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
