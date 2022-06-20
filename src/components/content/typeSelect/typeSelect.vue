<!-- 类型选择组件 -->
<template>
  <div class="typeSelect">
    <!-- 标题 -->
    <span class="title">{{ title.length ? `${title}:` : '' }}</span>
    <!-- 类型列表 -->
    <ul class="list">
      <li v-for="item in typeList" :key="item">
        <p @click="selectType(item)" :class="{ active: currentType === item }">
          {{ item }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, toRaw, toRef, watch } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  typeList: {
    type: Array as PropType<string[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  currentType: String
});
let loading = toRef(props, "loading");
let { typeList, title } = toRaw(props);

// 当前类型
let currentType = ref<string>(props.currentType || typeList[0]);
// 事件
let emit = defineEmits(["selected"]);
// 选择类型
let selectType = (type: string) => {
  if (currentType.value !== type && loading.value == false) {
    currentType.value = type;
    emit("selected", type);
  }
};
// 监听 props.currentType 的变动
watch(() => props.currentType, (newVal) => {
  currentType.value = newVal!;
})
</script>

<style lang="scss" scoped>
.typeSelect,
.list {
  display: flex;

  user-select: none;
  gap: 5px;
}

.typeSelect {
  color: var(--font-color);
  font-size: 14px;

  .title {
    padding-top: 3px;
  }
}

.list {
  align-items: center;
  flex: 1;
  flex-flow: row wrap;


  li {
    padding-right: 5px;
    border-right: 1px solid #eee;

    &:last-child {
      padding-right: 0px;
      border-right: none;
    }

    p {
      padding: 3px 6px;
      text-align: center;
      white-space: nowrap;
      cursor: pointer;

      &.active {
        border-radius: 20px;
        background-color: #fdf6f5;
        color: #b82712;
      }
    }
  }
}
</style>
