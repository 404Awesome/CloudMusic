<template>
  <nav flex justify-between gap-20px>
    <!-- 全部分类 -->
    <ALLCateSelect @selected="selected" :loading="loading" :currentType="currentType" :typeList="allCateList" />

    <!-- 热门分类 -->
    <div v-if="hotCateList.length" display-none items-center lg:flex>
      <CateSelect @selected="selected" :loading="loading" :currentType="currentType" :typeList="hotCateList" />
    </div>
  </nav>
</template>

<script setup lang="ts">
import ALLCateSelect from "@/components/content/allCateSelect/allCateSelect.vue";
import CateSelect from "@/components/content/cateSelect/cateSelect.vue";
import { toRefs, reactive, onMounted, toRaw } from "vue";
import { VideoAPI } from "api";
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


// 源类型列表
let originList: any[] = [];
// 热门分类列表
let hotCateList = reactive<string[]>([]);
// 全部分类列表
let allCateList = reactive<any>([]);

// 分类已选择
let selected = (type: string) => {
  if (!loading.value) {
    if (type == "全部视频") {
      emit('selected', "全部视频", 0);
    } else {
      let [data] = originList.filter((item: any) => item.name == type);
      emit('selected', data.name, data.id);
    }
  }
};

// 加载全部分类
onMounted(async () => {
  let [hotList, groupList]: any = await Promise.all([VideoAPI.getCateList(), VideoAPI.getGroupList()]);

  // 处理热门分类
  if (hotList.code == 200) {
    let list = hotList.data.map((item: any) => item.name);
    hotCateList.push(...list);
  }

  // 处理全部分类
  if (groupList.code == 200) {
    let list = groupList.data.map((item: any) => item.name);
    allCateList.push({ list });
    originList.push(...groupList.data);
  }
});
</script>