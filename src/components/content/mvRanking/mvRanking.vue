<!-- mv排行榜 -->
<template>
  <div>
    <!-- 导航 -->
    <nav flex mb-4>
      <!-- 插槽 -->
      <section flex-1>
        <slot></slot>
      </section>

      <!-- 类型选择组件 -->
      <CateSelect :currentType="currentType" :typeList="areaList" :loading="loading" @selected="selected" />
    </nav>

    <!-- 列表 -->
    <ul v-loading="loading" element-loading-text="Loading..." grid2Cols min-h-30>
      <li v-for="(mv, index) in raningList" :key="mv.id" flex overflow-hidden>
        <!-- 排名 -->
        <p flex items-center w-50px grow-0 shrink-0 justify-center text="#999 25px">{{ index + 1 }}</p>

        <!-- MVItem -->
        <MVItem :id="mv.id" :cover="mv.cover" :name="mv.name" :artists="mv.artists" :playCount="mv.playCount"
          :isFlex="true" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CateSelect from "@/components/content/cateSelect/cateSelect.vue";
import MVItem from "@/components/content/mvItem/mvItem.vue";
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { MVAPI } from "api";
const props = defineProps({
  limit: {
    type: Number,
    required: true,
  }
})

// 加载状态
let loading = ref(false);
// 地区列表
let areaList = reactive<string[]>(["内地", "港台", "欧美", "日本", "韩国"]);
// 当前类型
let currentType = ref<string>("内地");
// 选中类型
let selected = (area: string) => loadData(area);

// 加载排行榜的结果
let raningList = reactive<any>([]);
let loadData = async (area: string) => {
  try {
    loading.value = true;
    raningList.splice(0, raningList.length);
    let { code, data }: any = await MVAPI.getTopMV(area, 0, props.limit);
    if (code == 200) {
      raningList.splice(0, raningList.length, ...data);
      currentType.value = area;
    };
  } catch (err: any) {
    ElMessage.error("加载MV排行榜失败!");
  } finally {
    loading.value = false;
  }
};
onMounted(() => loadData(areaList[0]));
</script>