<!-- 关注的人 -->
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <ul ref="skeletonEl" wrapBox grid3Cols pt15px>
        <li v-for="item in 3" flex gap-10px items-center py-15px px-20px>
          <el-skeleton-item variant="image" h-17 w-17 min-w-17 rounded-full />
          <div flex-1 h-full>
            <el-skeleton-item variant="text" w="1/3" />
            <el-skeleton-item variant="text" w="3/4" mt-10px />
            <el-skeleton-item variant="text" w="2/5" />
          </div>
        </li>
      </ul>
    </template>
    <template #default>
      <ul v-infinite-scroll="loadData" :infinite-scroll-disabled="disabled" v-show="followList.length" class="list">
        <li v-for="item in followList" :key="item.nickname">
          <!-- 头像 -->
          <el-image @click="$router.push(`/othersInfo/${item.id}`)" :src="item.avatarUrl" fit="cover" class="avatar" />
          <div class="detail">
            <!-- 名称 -->
            <p class="nickname" @click="$router.push(`/othersInfo/${item.id}`)">{{ item.nickname }}</p>
            <!-- 签名 -->
            <p class="signature">{{ item.signature }}</p>
            <!-- 数量 -->
            <p class="count">
              <span>歌单: {{ item.playlistCount }}</span>
              <span>粉丝: {{ item.followeds }}</span>
            </p>
          </div>
        </li>
      </ul>

      <!-- 空状态 -->
      <el-empty v-show="!followList.length" description="未关注任何人!" />
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";
import { AccountAPI } from 'api';
const route = useRoute();

// 禁用无限加载
let disabled = ref<boolean>(false);
// 加载状态
let loading = ref<boolean>(false);
// 关注列表
interface FollowInfo {
  id: number,
  nickname: string,
  signature: string,
  playlistCount: number,
  followeds: number,
  avatarUrl: string
}
let followList = reactive<FollowInfo[]>([]);

// 加载关注列表
let loadData = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    let id = route.params.uid;
    let { code, more, follow }: any = await AccountAPI.getUserFollows(parseInt(id as string), followList.length);
    if (code == 200) {
      // 是否禁用无限加载
      if (!more) disabled.value = true;
      // 处理关注列表
      let list: FollowInfo[] = follow.map((item: any): FollowInfo => {
        let { userId, nickname, signature, playlistCount, followeds, avatarUrl } = item;
        return { id: userId, nickname, signature, playlistCount, followeds, avatarUrl };
      });
      followList.push(...list);
    }
  } catch (err: any) {
    ElMessage.error("加载关注列表失败!");
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.list {
  @apply wrapBox grid3Cols pt-15px important-gap-0px;

  li {
    @apply py-15px px-20px flex gap-10px items-center hover-bg-gray-100;
  }
}

.avatar {
  @apply rounded-full w-1/4 min-w-1/4 border-1px border-gray-200 cursor-pointer;
}

.detail {
  @apply text-13px text-gray-500 overflow-hidden cursor-default;

  .nickname {
    @apply truncate fontColor text-16px pb-10px cursor-pointer hover-themeColor;
  }

  .signature {
    @apply truncate pb-3px;
  }

  .count {
    @apply flex gap-10px;
  }
}
</style>