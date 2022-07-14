<!-- 粉丝 -->
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
      <ul v-show="followedList.length" class="list">
        <li v-for="item in followedList" :key="item.id">
          <!-- 头像 -->
          <el-image @click="$router.push(`/personalPage/${item.id}`)" :src="item.avatarUrl" fit="cover"
            class="avatar" />
          <div class="detail">
            <!-- 名称 -->
            <p class="nickname" @click="$router.push(`/personalPage/${item.id}`)">{{ item.nickname }}</p>
            <div>
              <!-- 个性签名 -->
              <p v-if="item.signature" class="signature">{{ item.signature }}</p>
              <!-- 数量 -->
              <p flex gap-10px>
                <span truncate>歌单: {{ item.playlistCount }}</span>
                <span truncate>粉丝: {{ item.followeds }}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>

      <!-- 空状态 -->
      <el-empty v-show="!followedList.length" description="暂无粉丝!" />
    </template>
  </el-skeleton>

  <!-- 分页 -->
  <div v-show="!loading && !(total < limit)" flex justify-center mb-15px>
    <el-pagination @current-change="change" background layout="prev, pager, next" :page-size="limit" :total="total" />
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { AccountAPI } from 'api';
const route = useRoute();

// 限制获取数量
let limit = 30;
// 数据总条数
let total = ref<number>(0);
// 加载状态
let loading = ref<boolean>(false);
// 粉丝列表
interface FollowedInfo {
  id: number,
  avatarUrl: string,
  nickname: string,
  signature: string,
  playlistCount: number,
  followeds: number
}
let followedList = reactive<FollowedInfo[]>([]);

// 分页发生改变
let change = (page: number) => {
  // 清空数组
  followedList.splice(0, followedList.length);
  let offset = (page - 1) * limit;
  loadData(offset);
}

// 加载粉丝列表
let loadData = async (offset: number = 0) => {
  if (loading.value) return;
  loading.value = true;
  try {
    let id = route.params.uid;
    let { code, size, followeds }: any = await AccountAPI.getUserFolloweds(parseInt(id as string), offset, limit);
    if (code == 200) {
      // 数据总条数
      if (!total.value) total.value = size;
      // 处理粉丝列表
      let list: FollowedInfo[] = followeds.map((item: any): FollowedInfo => {
        let { userId, avatarUrl, nickname, signature, playlistCount, followeds } = item;
        return { id: userId, avatarUrl, nickname, signature, playlistCount, followeds };
      });
      followedList.push(...list);
    }
  } catch (err: any) {
    ElMessage.error("加载关注列表失败!");
  } finally {
    loading.value = false;
  }
}

//  初始化粉丝列表
onMounted(() => loadData());
</script>

<style lang="scss" scoped>
.list {
  @apply wrapBox grid3Cols py-15px;

  li {
    @apply py-15px px-20px flex gap-10px items-center hover-bg-gray-100;
  }
}

.avatar {
  @apply w-17 min-w-17 rounded-full border-1px border-gray-200 cursor-pointer;
}

.detail {
  @apply flex-1 flex flex-col h-full justify-around text-13px text-gray-500 overflow-hidden cursor-default;

  .nickname {
    @apply truncate text-16px fontColor cursor-pointer hover-themeColor;
  }

  .signature {
    @apply truncate pb-3px;
  }
}
</style>