<template>
  <nav flex justify-between gap-20px>
    <!-- 全部分类 -->
    <ALLCateSelect @selected="selected" :loading="loading" :currentType="currentType" :typeList="allCateList" />

    <!-- 热门分类 -->
    <div display-none items-center lg:flex>
      <CateSelect @selected="selected" :loading="loading" :currentType="currentType" :typeList="hotCateList" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import ALLCateSelect from "@/components/content/allCateSelect/allCateSelect.vue";
import CateSelect from "@/components/content/cateSelect/cateSelect.vue";
import { toRefs, reactive } from "vue";
const emit = defineEmits(["selected"]);
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  currentType: {
    type: String,
    required: true
  }
});
let { loading, currentType } = toRefs(props);

// 热门分类列表
let hotCateList: string[] = ['现场', '翻唱', '舞蹈', '听BGM', 'MV', '生活', '游戏', 'ACG音乐', '最佳饭制'];
// 全部分类列表
let allCateList = reactive<any>([]);

// 分类已选择
let selected = (type: string) => !loading.value && emit('selected', type);
</script>