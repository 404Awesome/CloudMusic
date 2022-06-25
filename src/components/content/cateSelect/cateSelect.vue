<!-- 分类选择组件 -->
<template>
  <div text-14px select-none flex gap-5px>
    <!-- 标题 -->
    <span v-if="title" py-3px>{{ title }}:</span>

    <!-- 类型列表 -->
    <ul flex gap-5px items-center flex-1 flex-wrap>
      <li v-for="item in typeList" :key="item" pr-5px border-r="1px solid #eee" last="pr-0 border-r-0">
        <p @click="typeSelect(item)" :class="{ active: currentType === item }" py-3px px-8px text-center
          whitespace-nowrap cursor-pointer hover:themeColor>
          {{ item }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRaw, toRefs } from "vue";
const emit = defineEmits(["selected"]);
const props = defineProps({
  title: String,
  loading: {
    type: Boolean,
    default: false
  },
  currentType: {
    type: String,
    required: true
  },
  typeList: {
    type: Array as PropType<string[]>,
    required: true,
  }
});
let { typeList, title } = toRaw(props);
let { currentType, loading } = toRefs(props);

// 类型选择事件
let typeSelect = (type: string) => {
  if (currentType.value !== type && !loading.value) {
    emit("selected", type);
  }
};
</script>

<style lang="scss" scoped>
.active {
  border-radius: 20px;
  background-color: #eee;
  color: var(--theme-color);
}
</style>