<!-- 类型列表 -->
<template>
  <div class="categoryList" v-loading="isLoading" element-loading-spinner="null">
    <TypeSelect v-for="item in typeList" :key="item.title" @selected="item.selected" title="语种" :typeList="item.list" />
  </div>
</template>

<script setup lang="ts">
import TypeSelect from "@/components/content/typeSelect/typeSelect.vue";
const emit = defineEmits(['selected']);
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})
let isLoading = toRef(props, 'isLoading');

// 当前类型
let currentVal = reactive({
  area: '-1',
  type: '-1',
  initial: '-1'
});
// 类型列表
let typeList = reactive([
  {
    title: "语种",
    list: ['全部', '华语', '欧美', '日本', ' 韩国', '其他'],
    selected(type: string) {
      switch (type) {
        case '全部':
          currentVal.area = '-1';
          break;
        case "华语":
          currentVal.area = '7';
          break;
        case "欧美":
          currentVal.area = '96';
          break;
        case "日本":
          currentVal.area = '8';
          break;
        case "韩国":
          currentVal.area = '16';
          break;
        case "其他":
          currentVal.area = '0';
          break;
      }
    }
  },
  {
    title: "分类",
    list: ['全部', '男歌手', '女歌手', '乐队'],
    selected(type: string) {
      switch (type) {
        case '全部':
          currentVal.type = '-1';
          break;
        case "男歌手":
          currentVal.type = '1';
          break;
        case "女歌手":
          currentVal.type = '2';
          break;
        case "乐队":
          currentVal.type = '3';
          break;
      }
    }
  },
  {
    title: "筛选",
    list: ['热门', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
    selected(type: string) {
      switch (type) {
        case '热门':
          currentVal.initial = '-1';
          break;
        case "#":
          currentVal.initial = '0';
          break;
        default:
          currentVal.initial = type;
      }
    }
  },
])

// 监视 currentVal 变化
watch(currentVal, (newVal) => emit('selected', toRaw(newVal)), {
  immediate: true
})
</script>

<style scoped>
.categoryList {
  display: flex;
  flex-flow: column nowrap;

  gap: 10px;
}
</style>