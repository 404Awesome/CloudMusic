<!-- 视频详情 -->
<template>
  <div pt-4 pb-8>
    <!-- 创建人 -->
    <div flex justify-between>
      <section flex gap-10px items-center>
        <el-avatar @click="goOtherInfo" :src="creator.avatarUrl" :size="45" fit="cover" cursor-pointer />
        <p @click="goOtherInfo" truncate text-15px cursor-pointer hover:themeColor>{{ creator.nickname }}</p>
      </section>
      <section flex items-center>
        <p class="followedBtn" :class="{ followed: creator.followed }">
          <span text-18px :class="creator.followed ? 'i-eva:checkmark-outline' : 'i-eva:plus-outline'"></span>
          <span>{{ creator.followed ? '已关注' : '关注' }}</span>
        </p>
      </section>
    </div>

    <!-- mv信息 -->
    <div pt-10px>
      <!-- 标题 -->
      <h4 text-20px flex items-center gap-5px truncate>
        <span max-w="7/10" truncate>{{ title }}</span>
        <span v-if="description" @click="showDesc = !showDesc" class="descIcon" :class="{ active: showDesc }"
          i-eva:arrow-up-fill></span>
      </h4>

      <!-- 元信息 -->
      <p flex py-10px text="black/50 14px" gap-15px>
        <span>发布: {{ Handle.TimeStamp(publishTime!) }}</span>
        <span>播放: {{ Handle.Count(playTime!) }}</span>
      </p>

      <!-- 简介 -->
      <p v-show="showDesc" p-10px mb-10px rounded-md bg="#f4f4f5" text-14px>{{ description }}</p>

      <!-- 操作 -->
      <div flex items-center justify-between text-14px gap-10px select-none>
        <!-- 赞 / 收藏 / 分享 -->
        <ul flex flex-wrap overflow-hidden flex-1 gap-10px>
          <li v-for="item in control" :key="item.title" flex items-center py-6px px-13px rounded-full cursor-pointer
            hover="text-white themeBgColor" border="1px solid #eee">
            <span :class="item.icon" mr-5px text-17px></span>
            <span truncate>{{ item.title }}</span>
          </li>
        </ul>

        <!-- 举报 -->
        <p truncate cursor-pointer hover:themeColor>举报</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, toRaw } from 'vue';
import { useRouter } from "vue-router";
import { Handle } from "utils";
const router = useRouter();
const props = defineProps({
  title: String,
  vid: String,
  subscribeCount: Number,
  shareCount: Number,
  praisedCount: Number,
  description: String,
  publishTime: Number,
  playTime: Number,
  creator: Object as PropType<any>
});
let { title, vid, publishTime, playTime, subscribeCount, shareCount, praisedCount, description, creator } = toRaw(props);

// 是否显示简介
let showDesc = ref(false);

// 赞 / 收藏 / 分享
let control = ([{
  title: `赞 (${praisedCount})`,
  icon: "i-heroicons-outline:thumb-up",
}, {
  title: `收藏 (${subscribeCount})`,
  icon: "i-heroicons-outline:folder-add",
}, {
  title: `分享 (${shareCount})`,
  icon: "i-heroicons-outline:external-link",
}]);

// 跳转个人主页
let goOtherInfo = () => {
  if (creator.userId) {
    router.push(`/othersInfo/${creator.userId}`);
  }
}
</script>

<style lang="scss" scoped>
// 关注按钮样式
.followedBtn {
  @apply flex items-center gap-3px cursor-pointer hover-opacity-80 themeBgColor text-white text-14px px-13px py-6px rounded-full;

  // 已关注的样式
  &.followed {
    @apply bg-gray-400 hover-opacity-80;
  }
}

// 描述图标
.descIcon {
  min-width: 25px;
  font-size: 25px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  transform: rotate(180deg);

  &.active {
    transform: rotate(0deg);
  }

  &:hover {
    color: var(--theme-color);
  }
}
</style>