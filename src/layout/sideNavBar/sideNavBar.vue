<!-- 侧边导航栏 -->
<template>
  <main select-none p-10px h-full bg-gray-300>
    <!-- 登陆 / 注册 / 账号信息 -->
    <header>
      <!-- 已登陆 -->
      <section v-if="store.auth" @click="$router.push('/personalInfo')" class="profile">
        <!-- 头像 -->
        <el-avatar :src="profileInfo.avatarUrl" :size="45" grow-0 shrink-0 />

        <!-- 信息 -->
        <div flex flex-col flex-nowrap justify-around text-13px w-full overflow-hidden>
          <!-- 昵称 -->
          <p truncate themeColor text-15px>{{ profileInfo.nickname }}</p>
          <!-- 签名 -->
          <p truncate>{{ profileInfo.signature }}</p>
        </div>
      </section>

      <!-- 未登陆 -->
      <section v-else @click="$router.push('/account/login')" class="listItem" py-15px rounded>
        <span i-carbon:login></span>
        <p>未登陆</p>
      </section>
    </header>

    <!-- 列表 -->
    <ul class="navList">
      <li @click="$router.push(item.path)" :class="{ active: $route.matched[0]?.path == item.path }"
        v-for="item in navList" :key="item.title">
        <span :class="item.icon"></span>
        <p>{{ item.title }}</p>
      </li>
    </ul>
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
.profile {
  display: flex;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba($color: #ffffff, $alpha: 0);
  cursor: pointer;

  gap: 10px;

  &:hover {
    background-color: rgba($color: #ffffff, $alpha: .7);
  }
}

.navList {
  overflow: hidden;
  margin-top: 10px;
  border-radius: 5px;

  .active {
    background: var(--theme-color);
    color: #fff;
  }
}

.navList li,
.listItem {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  cursor: pointer;

  gap: 5px;

  p {
    white-space: nowrap;
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
</style>
