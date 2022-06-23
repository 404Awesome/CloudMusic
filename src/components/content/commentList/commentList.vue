<!-- 评论列表 -->
<template>
  <div>
    <!-- 标题 -->
    <h4 mb-10px text-18px>最新评论 ({{ total }})</h4>

    <!-- 评论列表 -->
    <ul element-loading-text="Loading..." v-loading="loading" min-h-30>
      <li class="group" flex gap-15px v-for="(item, index) in commentList" :key="item.commentId">
        <!-- 头像 -->
        <el-image @click="$router.push(`/otherHomePage/${item.user.userId}`)" cursor-pointer flex-none w-10 h-10
          rounded-full :src="item.user.avatarUrl" fit="cover" lazy />
        <!-- 详细 -->
        <div flex-1 text-15px>
          <!-- 评论人 -->
          <section>
            <span themeColor cursor-pointer @click="$router.push(`/otherHomePage/${item.user.userId}`)">
              {{ item.user.nickname }}:
            </span>
            <span>{{ item.content }}</span>
          </section>

          <!-- 被回复 -->
          <section v-if="item.beReplied.length">
            <p v-if="item.beReplied[0].status == -5" py-7px px-10px text-14px mt-5px rounded bg="#f4f4f5" text-center>
              <span>该评论已删除</span>
            </p>
            <p v-else py-7px px-10px text-14px mt-5px rounded bg="#f4f4f5">
              <span themeColor cursor-pointer @click="$router.push(`/otherHomePage/${item.beReplied[0].user.userId}`)">
                @{{ item.beReplied[0].user.nickname }}:
              </span>
              <span>{{ item.beReplied[0].content }}</span>
            </p>
          </section>

          <!-- 功能-->
          <section flex justify-between mt-5px text-13px text="black/60">
            <p>{{ item.timeStr }}</p>
            <div flex items-center gap-10px>
              <span cursor-pointer hover:themeColor opacity-0 group-hover:opacity-100>举报</span>
              <span cursor-pointer hover:themeColor flex>
                <span text-18px i-heroicons-outline:thumb-up></span>
                <span text-13px>{{ item.likedCount || " " }}</span>
              </span>
              <span cursor-pointer text-18px hover:themeColor i-heroicons-outline:folder-add></span>
              <span cursor-pointer text-18px hover:themeColor i-heroicons-outline:external-link></span>
            </div>
          </section>

          <!-- 分割线 -->
          <el-divider v-show="(index + 1) !== commentList.length" />
        </div>
      </li>
    </ul>

    <!-- 分页 -->
    <div v-show="commentList.length" flex justify-center mt-7>
      <el-pagination @current-change="change" background layout="prev, pager, next" :page-size="limit" :total="total" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRaw, ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    default: 20
  },
  RequestData: {
    type: Function,
    required: true
  }
})
let { id, limit, RequestData } = toRaw(props);

// 评论加载状态
let loading = ref<boolean>(false);
// 评论总条数
let total = ref<number>(0);
// 请求到的数据
let commentList = reactive<any>([]);
let loadData = async (offset: number) => {
  try {
    loading.value = true;
    let { code, comments, total: totalVal }: any = await RequestData(id, offset, limit);
    if (code == 200) {
      total.value = totalVal;
      commentList.splice(0, commentList.length, ...comments);
    }
  } catch (err: any) {
    ElMessage.error("加载评论失败!");
  } finally {
    loading.value = false;
  }
}
// 分页改变时触发
let change = (current: any) => {
  // 清空数组
  commentList.splice(0, commentList.length);
  // 加载数据
  loadData((current - 1) * limit);
}
// 初始化评论数据
onMounted(() => loadData(0));
</script>