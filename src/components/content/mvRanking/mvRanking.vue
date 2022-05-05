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
    <ul class="rankingList" v-loading="loading">
      <li class="rankingItem" v-for="(item, index) in result" :key="item.id">
        <p class="rank">{{ index + 1 }}</p>

        <div class="mvListItem">
          <MVlistItem v-bind="item" :isFlex="true" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import TypeSelect from "@/components/content/typeSelect/typeSelect.vue";
import MVlistItem from "@/components/content/mvListItem/mvListItem.vue";
import { MV, MVArea } from "@/api/modules/video";
let props = defineProps({
  limit: {
    type: Number,
    required: true,
  }
})

// 加载状态
let loading = ref(false);
// 地区列表
let areaList = reactive<MVArea[]>(["内地", "港台", "欧美", "日本", "韩国"]);
// 选中类型
let selected = (area: MVArea) => {
  loading.value = true;
  loadData(area);
};

// 获取排行榜的结果
let result = reactive<any>([]);
let loadData = async (area: MVArea) => {
  let { code, data }: any = await MV.getTop(area, 0, props.limit);
  if (code == 200) {
    result.splice(0, result.length, ...data);
    loading.value = false;
  }
};
onMounted(() => loadData(areaList[0]));
</script>

<style lang="scss" scoped>
.rankingList {
  display: grid;

  grid-template-columns: repeat(2, 1fr);
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

  .mvListItem {
    overflow: hidden;
    flex: 1;
  }
}
</style>
