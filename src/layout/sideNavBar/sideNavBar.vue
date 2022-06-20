<!-- 侧边导航栏 -->
<template>
  <main class="navbar">
    <header class="loginStatus">
      <!-- 已登陆 -->
      <section v-if="store.auth" @click="$router.push('/myHomePage')">
        <!-- <img class="avatar" src="" /> -->
        <!-- <p></p> -->
      </section>

      <!-- 未登陆 -->
      <section v-else @click="$router.push('/account/login')">
        <span class="i-heroicons-outline:login"></span>
        <p>未登陆</p>
      </section>
    </header>

    <!-- 列表 -->
    <ul class="list">
      <li @click="$router.push(item.path)" :class="{ active: $route.matched[0]?.path == item.path }"
        v-for="item in navList" :key="item.title">
        <span :class="item.icon"></span>
        <p>{{ item.title }}</p>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { useMainStore } from "store";
import { reactive, watch } from "vue";
const store = useMainStore();

// 导航列表
interface ListItem {
  icon: string,
  title: string,
  path: string
}
let navList = reactive<ListItem[]>([]);
// 无需登陆列表
let noLogin: ListItem[] = [
  {
    icon: "i-heroicons-outline:music-note",
    title: "发现音乐",
    path: "/discover",
  },
  {
    icon: "i-heroicons-outline:play",
    title: "视频",
    path: "/video",
  },
];
// 需要登陆列表
let needLogin: ListItem[] = [
  {
    icon: "i-heroicons-outline:users",
    title: "关注",
    path: "/following",
  },
  {
    icon: "i-heroicons-outline:status-online",
    title: "私人FM",
    path: "/privateFM",
  }
];
// 监视store中的auth状态
watch(() => store.auth, (newVal) => {
  navList.splice(0, navList.length);
  if (newVal) {
    // 已登陆
    navList.push(...noLogin, ...needLogin);
  } else {
    // 未登陆
    navList.push(...noLogin);
  }
}, { immediate: true });
</script>

<style lang="scss" scoped>
// 继承
.extend {
  display: flex;
  align-items: center;
  color: var(--font-color);
  cursor: pointer;

  span {
    margin-right: 5px;
  }

  p {
    font-size: 14px;
  }

  &:hover {
    background-color: var(--theme-color);

    p,
    span {
      color: #fff;
    }
  }
}

.navbar {
  padding: 10px;
  height: 100%;
  background-color: #dcdde1;

  user-select: none;

  .loginStatus {
    overflow: hidden;
    height: 50px;
    border-radius: 5px;
    background-color: #fff;

    section {
      padding: 5px 10px;
      height: 100%;

      @extend .extend;

      .avatar {
        flex-basis: 40px;
        border-radius: 50%;
        font-size: 25px;
      }
    }
  }

  .list {
    overflow: hidden;
    margin-top: 10px;
    border-radius: 5px;
    background-color: #fff;

    li {
      padding: 10px;

      @extend .extend;

      &.active {
        background: var(--theme-color);
        color: #fff;
      }
    }
  }
}
</style>
