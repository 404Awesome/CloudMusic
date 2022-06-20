<!-- 评论列表 -->
<template>
  <div>
    <!-- 标题 -->
    <h4 class="title">最新评论 ({{ total }})</h4>

    <!-- 评论列表 -->
    <ul element-loading-text="Loading..." v-loading="loading" min-h-30>
      <li class="commentItem" v-for="(item, index) in commentList" :key="item.commentId">
        <!-- 头像 -->
        <el-image @click="$router.push(`/otherHomePage/${item.user.userId}`)" cursor="pointer" flex-none w-10 h-10
          rounded-full :src="item.user.avatarUrl" fit="cover" lazy />
        <!-- 详细 -->
        <div class="detail">
          <!-- 评论人 -->
          <section class="commentator">
            <span @click="$router.push(`/otherHomePage/${item.user.userId}`)">{{ item.user.nickname }}: </span>
            <span>{{ item.content }}</span>
          </section>

          <!-- 被回复 -->
          <section class="beReplied" v-if="item.beReplied.length">
            <p class="delete" v-if="item.beReplied[0].status == -5">
              <span>该评论已删除</span>
            </p>
            <p class="exist" v-else>
              <span @click="$router.push(`/otherHomePage/${item.beReplied[0].user.userId}`)">
                @{{ item.beReplied[0].user.nickname }}:
              </span>
              <span>{{ item.beReplied[0].content }}</span>
            </p>
          </section>

          <!-- 功能-->
          <section class="function">
            <p class="time">{{ item.timeStr }}</p>
            <div class="operate">
              <span class="report">举报</span>
              <span flex>
                <span class="icon i-heroicons-outline:thumb-up"></span>
                <span>{{ item.likedCount || " " }}</span>
              </span>
              <span class="icon i-heroicons-outline:folder-add"></span>
              <span class="icon i-heroicons-outline:external-link"></span>
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

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
  color: var(--font-color);
  font-size: 18px;
}

.commentItem {
  display: flex;

  gap: 15px;

  &:hover .detail .function .operate .report {
    opacity: 1;
  }
}

.commentItem .detail {
  flex: 1;
  color: var(--font-color);
  font-size: 15px;

  .commentator span:first-child {
    color: var(--theme-color);
    cursor: pointer;
  }

  .beReplied>p {
    margin-top: 5px;
    padding: 7px 10px;
    border-radius: 5px;
    background-color: #f4f4f5;
    font-size: 14px;

    &.delete {
      text-align: center;
    }

    &.exist span:first-child {
      color: var(--theme-color);
      cursor: pointer;
    }
  }

  .function {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    color: rgba($color: #000000, $alpha: .4);
    font-size: 13px;

    .operate {
      display: flex;
      align-items: center;

      gap: 10px;

      span {
        cursor: pointer;

        &.report {
          opacity: 0;
        }

        &.icon {
          font-size: 18px;
        }

        &:hover {
          color: var(--theme-color);
        }
      }
    }
  }
}
</style>