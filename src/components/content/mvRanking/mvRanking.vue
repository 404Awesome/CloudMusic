<!-- mv排行榜 -->
<template>
  <div>
    <!-- 导航 -->
    <nav flex mb-4>
      <!-- 插槽 -->
      <section flex-1>
        <slot></slot>
      </section>
      <TypeSelect :loading="loading" :typeList="areaList" @selected="selected" />
    </nav>

    <!-- 列表 -->
    <ul min-h-30 grid-cols-1 md:grid-cols-2 class="rankingList" element-loading-text="Loading..." v-loading="loading">
      <li class="rankingItem" v-for="(mv, index) in raningList" :key="mv.id">
        <!-- 排名 -->
        <p class="rank">{{ index + 1 }}</p>
        <MVItem :id="mv.id" :cover="mv.cover" :name="mv.name" :artists="mv.artists" :playCount="mv.playCount"
          :isFlex="true" flex-1 overflow-hidden />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import TypeSelect from "@/components/content/typeSelect/typeSelect.vue";
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
// 选中类型
let selected = (area: string) => loadData(area);

// 加载排行榜的结果
let raningList = reactive<any>([]);
let loadData = async (area: string) => {
  try {
    loading.value = true;
    raningList.splice(0, raningList.length);
    let { code, data }: any = await MVAPI.getTopMV(area, 0, props.limit);
    if (code == 200) raningList.splice(0, raningList.length, ...data);
  } catch (err: any) {
    ElMessage.error("加载MV排行榜失败!");
  } finally {
    loading.value = false;
  }
};
onMounted(() => loadData(areaList[0]));
</script>

<style lang="scss" scoped>
.rankingList {
  display: grid;

  gap: 30px 20px;

  li {
    overflow: hidden;
  }
}

.rankingItem {
  display: flex;

  .rank {
    display: flex;
    align-items: center;
    flex-basis: 50px;
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: center;
    color: #999999;
    font-size: 25px;
  }
}
</style>
