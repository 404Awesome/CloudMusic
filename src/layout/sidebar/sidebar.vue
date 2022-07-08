<!-- 侧边导航栏 -->
<template>
  <main class="sidebar">
    <!-- 登陆 / 注册 / 账号信息 -->
    <header>
      <!-- 已登陆 -->
      <section v-if="store.auth" @click="$router.push('/personalInfo')" class="profile">
        <!-- 头像 -->
        <el-avatar :src="profileInfo.avatarUrl" :size="45" flex-none />

        <!-- 信息 -->
        <div class="info">
          <!-- 昵称 -->
          <p truncate themeColor text-15px dark:text-orange-400>{{ profileInfo.nickname }}</p>
          <!-- 签名 -->
          <p truncate dark:text-gray-200>{{ profileInfo.signature }}</p>
        </div>
      </section>

      <!-- 未登陆 -->
      <section v-else @click="$router.push('/account/login')" class="listItem" py-15px rounded>
        <span i-carbon:login></span>
        <p>未登陆</p>
      </section>
    </header>

    <!-- 导航列表 / 版权声明 -->
    <div flex flex-col flex-1 justify-between>
      <!-- 列表 -->
      <ul class="navList">
        <li @click="$router.push(item.path)" :class="{ active: $route.matched[0]?.path == item.path }"
          v-for="item in navList" :key="item.title">
          <span :class="item.icon"></span>
          <p>{{ item.title }}</p>
        </li>
      </ul>

      <!-- 版权声明 -->
      <div class="copyright">
        <p class="title">
          <span class="icon" i-carbon:information-filled></span>
          <a href="https://github.com/404Awesome/CloudMusic" target="_blank" class="content">本项目为开源项目!</a>
        </p>
        <p>本项目仅用于学习用途!</p>
        <p>资源版权都属于网易云音乐!</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { useMainStore } from "store";
import { AccountAPI } from "api";
const store = useMainStore();

// 个人信息
let profileInfo = reactive<any>({});
// 导航列表
interface ListItem {
  icon: string,
  title: string,
  path: string
}
// 导航列表
let navList = reactive<ListItem[]>([]);
// 无需登陆列表
let noLogin: ListItem[] = [
  {
    icon: "i-carbon:music",
    title: "发现音乐",
    path: "/discover",
  },
  {
    icon: "i-carbon:media-library",
    title: "视频",
    path: "/video",
  },
];
// 需要登陆列表
let needLogin: ListItem[] = [
  {
    icon: "i-carbon:user-multiple",
    title: "关注",
    path: "/following",
  },
  {
    icon: "i-carbon:radar",
    title: "私人FM",
    path: "/privateFM",
  }
];

// 监视store中的auth状态
watch(() => store.auth, async (newVal) => {
  navList.splice(0, navList.length);
  if (newVal) {
    // 已登陆
    navList.push(...noLogin, ...needLogin);
    // 请求个人信息
    let { code, profile }: any = await AccountAPI.getUserAccount();
    if (code == 200) {
      Object.assign(profileInfo, {
        nickname: profile.nickname,
        signature: profile.signature,
        avatarUrl: profile.avatarUrl,
      });
    }
  } else {
    // 未登陆
    navList.push(...noLogin);
  }
}, { immediate: true });
</script>

<style lang="scss" scoped>
// 侧边栏容器
.sidebar {
  @apply flex flex-col select-none p-10px h-full overflow-hidden bg-gray-300 dark-bg-gray-500;
}

// 版权声明
.copyright {
  @apply bg-white/80 p-10px rounded-md text-14px text-gray-500 dark-bg-gray-600 dark-text-gray-400;

  // 标题
  .title {
    @apply mb-5px flex items-center gap-3px;

    // 图标
    .icon {
      @apply text-20px themeColor dark-text-orange-400;
    }

    // 内容
    .content {
      @apply text-16px themeColor decoration-none hover-decoration-underline dark-text-orange-400;
    }
  }
}

// 个人信息
.profile {
  @apply transition duration-200 ease-in-out flex gap-10px p-10px rounded-md bg-white/0 cursor-pointer;

  &:hover {
    @apply bg-white dark-bg-gray-400;
  }

  // 个人信息
  .info {
    @apply flex flex-col flex-nowrap justify-around text-13px w-full overflow-hidden;
  }
}

.navList {
  @apply overflow-hidden mt-10px rounded-md;

  .active {
    @apply text-white themeBgColor dark-bg-gray-600 dark-text-gray-200;
  }
}

.navList li,
.listItem {
  @apply flex items-center p-10px bg-white cursor-pointer gap-5px dark-bg-gray-300;

  p {
    @apply whitespace-nowrap text-14px;
  }

  &:hover {
    @apply themeBgColor text-white dark-bg-gray-600 dark-text-gray-200;
  }
}
</style>
