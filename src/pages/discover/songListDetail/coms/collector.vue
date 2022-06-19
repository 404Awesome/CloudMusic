<!-- 歌单收藏者 -->
<template>
  <!-- 提示 -->
  <el-alert v-if="!store.auth && collectorList.length" mt-2 title="登陆后查看全部" type="warning" :closable="false" />

  <!-- 收藏者列表 -->
  <div py-4 mt-1>
    <!-- 列表 -->
    <ul class="list" min-h-30 grid-cols-2 lg:grid-cols-3 element-loading-text="Loading..." v-loading="loading">
      <li v-for="item in collectorList" :key="item.userId">
        <!-- 头像 -->
        <el-avatar @click="$router.push(`/otherHomePage/${item.userId}`)" cursor="pointer" :size="70"
          :src="item.avatarUrl" />
        <!-- 信息 -->
        <div class="info">
          <!-- 标题 -->
          <div class="title">
            <p class="nickname" @click="$router.push(`/otherHomePage/${item.userId}`)">{{ item.nickname }}</p>
            <span v-if="item.gender" :class="item.gender == 1 ? 'boy' : 'girl'"
              class="gender i-eva:smiling-face-fill"></span>
          </div>
          <!-- 签名 -->
          <p v-if="item.signature" class="desc">{{ item.signature }}</p>
        </div>
      </li>
    </ul>

    <!-- 分页 -->
    <div v-show="collectorList.length" flex justify-center mt-7>
      <el-pagination @current-change="change" background layout="prev, pager, next" :page-size="limit" :total="total" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SongListAPI } from "api";
import { useMainStore } from "store";
import { useRoute } from "vue-router";
const route = useRoute();
const store = useMainStore();
const id = parseInt(route.params.id as string);
const props = defineProps(['activeComs']);

// 是否正在加载
let loading = ref(false);
// 限制请求数据个数
let limit = 12;
// 总条数
let total = ref<number>(0);
// 收藏者列表
let collectorList = reactive<any>([]);
// 加载数据
let loadData = async (offset: number = 0) => {
  loading.value = true;
  let { code, subscribers, total: totalVal }: any = await SongListAPI.getSubscribers(id, offset, limit);
  if (code == 200) {
    if (!total.value) total.value = totalVal;
    collectorList.push(...subscribers);
  }
  loading.value = false;
};
// 监听当前组件的激活状态并加载数据
watch(() => props.activeComs, (newVal) => {
  if (newVal == "Collector" && collectorList.length == 0) loadData();
})

// 分页发生变化
let change = (page: number) => {
  collectorList.splice(0, collectorList.length);
  loadData((page - 1) * limit);
}
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.list {
  display: grid;

  gap: 30px;

  li {
    display: flex;
    overflow: hidden;

    gap: 10px;


  }
}

.info {
  display: flex;
  overflow: hidden;
  flex: 1;
  flex-flow: column nowrap;
  justify-content: center;

  gap: 5px;

  &:hover .nickname {
    color: var(--theme-bg-color)
  }

  .nickname,
  .desc {
    @include oneOmit;
  }

  .title {
    display: flex;
    align-items: center;

    gap: 5px;

    .nickname {
      font-size: 15px;
      cursor: pointer;
    }

    .gender {
      flex-shrink: 0;
      font-size: 18px;

      &.boy {
        color: #3a9dd0;
      }

      &.girl {
        color: #e3357b;
      }
    }
  }

  .desc {
    color: rgba($color: #000000, $alpha: .45);
    font-size: 13px;
  }
}
</style>