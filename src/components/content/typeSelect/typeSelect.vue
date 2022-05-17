<!-- 类型选择组件 -->
<template>
  <ul class="typeSelect">
    <li v-for="item in typeList" :key="item">
      <p @click="selectType(item)" :class="{ active: currentType === item }">
        {{ item }}
      </p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { PropType } from "vue";
let props = defineProps({
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
let typeList = toRaw(props.typeList);
let loading = toRef(props, "loading");

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
</script>

<style lang="scss" scoped>
.typeSelect {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  user-select: none;
  gap: 10px;

  li {
    flex: 1;
    padding-right: 10px;
    border-right: 1px solid #eee;

    &:last-child {
      padding-right: 0px;
      border-right: none;
    }

    p {
      padding: 3px 6px;
      color: var(--font-color);
      text-align: center;
      white-space: nowrap;
      font-size: 14px;
      cursor: pointer;

      &.active {
        border-radius: 5%;
        background-color: #fdf6f5;
        color: #b82712;
      }
    }
  }
}
</style>
