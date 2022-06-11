<!-- 全部MV -->
<template>
  <div class="wrapper" pt-4 pb-8 v-if="currentType.type">
    <!-- 类型列表 -->
    <ul class="type">
      <li v-for="item in typeList" :key="item.title">
        <TypeSelect @selected="(type: string) => currentType[item.name] = type" :title="item.title" :loading="loading"
          :currentType="currentType[item.name]" :typeList="item.type" />
      </li>
    </ul>

    <div>
      <!-- mv列表 -->
      <MVList :loading="loading" :list="mvList" />

      <!-- 分页 -->
      <div v-show="mvList.length" flex justify-center mt-4>
        <el-pagination @current-change="change" background layout="prev, pager, next" :page-size="limit"
          :total="total" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="allMV">
import TypeSelect from "@/components/content/typeSelect/typeSelect.vue";
import MVList from "@/components/content/mvList/mvList.vue";
import { MV } from "@/api/modules/video";
import { useRoute } from "vue-router";
const route = useRoute();

// 是否加载
let loading = ref(false);
// mv总条数
let total = ref<number>(100);
// limit限制
let limit = 28;
// 请求偏移
let offset = ref<number>(0);
// mv列表
let mvList = reactive<any>([]);

// 当前选择的类型
let currentType = reactive<any>({});
// 类型列表
let typeList = reactive([{
  type: ['全部', '内地', '港台', '欧美', '韩国', '日本'],
  title: "地区",
  name: 'area',
}, {
  type: ['全部', '官方版', '原声', '现场版', '网易出品'],
  title: "类型",
  name: 'type',
}, {
  type: ['上升最快', '最热', '最新'],
  title: "排序",
  name: 'order',
}]);
// 监听类型列表并请求
watch(currentType, () => {
  offset.value = 0;
  loadData(offset.value, limit);
});

// 分页发生改变
let change = (page: number) => {
  offset.value = page * limit;
  loadData(offset.value, limit);
}

// 加载数据
let loadData = async (offset: number, limit: number) => {
  try {
    loading.value = true;
    mvList.splice(0, mvList.length);
    let { area, type, order } = toRaw(currentType);
    let { code, data, count }: any = await MV.getAllMV(area, type, order, offset, limit);
    if (code == 200 && !total.value) total.value = count;
    if (code == 200) mvList.splice(0, mvList.length, ...data);
  } catch (err: any) {
    ElMessage.error("加载全部MV失败!");
  } finally {
    loading.value = false;
  }
}

// 初始化mv类型
onMounted(() => {
  if (route.query.type) {
    Object.assign(currentType, route.query);
  } else {
    Object.assign(currentType, { area: "全部", type: "全部", order: "上升最快" });
  }
});
</script>

<style lang="scss" scoped>
.type {
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 15px;

  gap: 10px;

  .title {
    color: var(--font-color);
    font-size: 14px;
  }

  li {
    display: flex;
    align-items: center;

    gap: 10px;
  }
}
</style>
