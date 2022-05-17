<!-- 评论列表 -->
<template>
  <div>
    <!-- 标题 -->
    <h4 class="title">最新评论 ({{ total }})</h4>

    <!-- 内容 -->
    <div element-loading-text="Loading..." v-loading="loading">
      <!-- 评论列表 -->
      <ul>
        <li class="commentItem" v-for="item in result" :key="item.commentId">
          <!-- 头像 -->
          <el-image cursor="pointer" flex-none w-10 h-10 rounded-full :src="item.user.avatarUrl" fit="cover" lazy />
          <!-- 详细 -->
          <div class="detail">
            <!-- 评论人 -->
            <section class="commentator">
              <span>{{ item.user.nickname }}: </span>
              <span>{{ item.content }}</span>
            </section>

            <!-- 被回复 -->
            <section class="beReplied" v-if="item.beReplied.length">
              <span>@{{ item.beReplied[0].user.nickname }}: </span>
              <span>{{ item.beReplied[0].content }}</span>
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
            <el-divider />
          </div>
        </li>
      </ul>

      <!-- 分页 -->
      <div flex justify-center>
        <el-pagination @current-change="change" background layout="prev, pager, next" :page-size="limit"
          :total="total" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MV } from "@/api/modules/video";
let props = defineProps({
  id: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    default: 10
  }
})
let { id, limit } = toRaw(props);


// 评论加载状态
let loading = ref<boolean>(false);
// 评论总条数
let total = ref<number>(0);
// 请求到的数据
let result = reactive<any>([]);
let loadData = async (offset: number, before: number = 0) => {
  loading.value = true;
  let { code, comments, total: totalVal }: any = await MV.getComment(id, offset, limit, before);
  if (code == 200) {
    total.value = totalVal;
    result.splice(0, result.length, ...comments);
    loading.value = false;
  }
}
// 分页改变时触发
let change = (current: any) => {
  let time: number = result[limit - 1].time;
  loadData(current - 1, time);
}
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
    color: var(--theme-bg-color);
    cursor: pointer;
  }

  .beReplied {
    margin-top: 5px;
    padding: 7px 10px;
    border-radius: 5px;
    background-color: #eee;
    font-size: 14px;

    span:first-child {
      color: var(--theme-bg-color);
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
          color: var(--theme-bg-color);
        }
      }
    }
  }
}
</style>