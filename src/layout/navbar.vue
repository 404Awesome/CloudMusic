<template>
  <main class="navbar">
    <!-- 登陆状态 -->
    <header class="loginStatus">
      <section v-if="store.status">
        <img class="avatar" src="" />
        <p></p>
      </section>
      <section v-else @click="$router.push('/login')">
        <span class="i-heroicons-outline:login"></span>
        <p>未登陆</p>
      </section>
    </header>

    <!-- 列表 -->
    <ul class="list">
      <li
        @click="$router.push(item.path)"
        :class="{ active: $route.matched[0]?.path == item.path }"
        v-for="item in list"
        :key="item.title"
      >
        <span :class="item.icon"></span>
        <p>{{ item.title }}</p>
      </li>
    </ul>
  </main>
</template>

<script setup lang="ts">
import { useMainStore } from "store/index";
const store = useMainStore();

// 列表
let list = reactive([
  {
    icon: "i-heroicons-outline:music-note",
    title: "发现音乐",
    path: "/discover",
  },
  {
    icon: "i-heroicons-outline:status-online",
    title: "私人FM",
    path: "/privateFM",
  },
  {
    icon: "i-heroicons-outline:play",
    title: "视频",
    path: "/video",
  },
  {
    icon: "i-heroicons-outline:users",
    title: "关注",
    path: "/following",
  },
]);
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
    font-size: 15px;
  }

  &:hover {
    background-color: var(--theme-bg-color);

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
        background: var(--theme-bg-color);
        color: #fff;
      }
    }
  }
}
</style>
