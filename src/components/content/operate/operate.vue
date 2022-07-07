<!-- 赞 / 收藏 / 分享 / 举报 -->
<template>
  <div class="operate">
    <!-- 赞 / 收藏 / 分享 -->
    <ul class="list">
      <li v-for="item in control" :key="item.title" @click.stop="item.method" class="group listItem">
        <span :class="item.icon" mr-5px text-17px></span>
        <span truncate>{{ item.title }}</span>
      </li>
    </ul>

    <!-- 举报 -->
    <p @click="report" class="report">举报</p>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRaw } from 'vue';
const props = defineProps({
  mode: {
    type: String as PropType<'video' | 'mv'>,
    required: true
  },
  id: {
    type: [Number, String],
    required: true
  },
  likedCount: {
    type: Number,
    required: true
  },
  subCount: {
    type: Number,
    required: true
  },
  shareCount: {
    type: Number,
    required: true
  }
})
let { mode, id, likedCount, subCount, shareCount } = toRaw(props);

// 赞 / 收藏 / 分享
let control = ([{
  title: `赞 (${likedCount})`,
  icon: "i-carbon:thumbs-up group-hover:i-carbon-thumbs-up-filled",
  method() {
    console.log(id);
  }
}, {
  title: `收藏 (${subCount})`,
  icon: "i-carbon:folder-add",
  method() {
    console.log(id);
  }
}, {
  title: `分享 (${shareCount})`,
  icon: "i-carbon:link",
  method() {
    console.log(id);
  }
}]);

// 举报
let report = () => {
  console.log(id);
}
</script>

<style lang="scss" scoped>
.operate {
  @apply flex items-center justify-between text-14px gap-10px select-none;

  .list {
    @apply flex flex-wrap overflow-hidden flex-1 gap-10px;

    .listItem {
      @apply flex items-center py-6px px-13px rounded-full cursor-pointer hover-text-white hover-themeBgColor border-1px border-#eee;
    }
  }

  .report {
    @apply truncate cursor-pointer hover-themeColor;
  }
}
</style>