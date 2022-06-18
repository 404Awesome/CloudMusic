<!-- 分类列表 -->
<template>
  <AllTypeSelect :loading="loading" @selected="categorySelected" defaultType="全部歌单" :hotTypeList="hotTypeList">
    <template #customize="{ currentSelect, selected }">
      <div class="category" v-for="category in allCategoryList" :key="category.name">
        <div class="info">
          <span class="icon" :class="category.icon"></span>
          <span class="text">{{ category.name }}</span>
        </div>
        <!-- 类型列表 -->
        <ul class="list">
          <li v-for="listItem in category.list">
            <span @click="selected(listItem.name)" :class="{ active: currentSelect == listItem.name }" class="item">
              {{ listItem.name }}
            </span>
          </li>
        </ul>
      </div>
    </template>
  </AllTypeSelect>
</template>

<script setup lang="ts">
import AllTypeSelect from "@/components/content/allTypeSelect/allTypeSelect.vue";
import { SongListAPI } from "api";
const emit = defineEmits(['selected']);
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

// 热门类型列表
let hotTypeList = reactive<string[]>([]);

// 全部分类列表
let allCategoryList = reactive<any>([]);
onMounted(async () => {
  // 加载热门歌单分类
  let PlayListHot: any = await SongListAPI.getHotList();
  if (PlayListHot.code == 200) {
    let tagsName = PlayListHot.tags.map((tag: any) => {
      return tag.name;
    });
    hotTypeList.push(...tagsName);
  }

  // 加载歌单分类
  let playListCatList: any = await SongListAPI.getCateList();
  if (playListCatList.code == 200) {
    let icon = ['i-eva:globe-outline', 'i-heroicons-outline:sparkles', 'i-eva:umbrella-outline', 'i-eva:smiling-face-outline', 'i-eva:grid-outline'];
    let { categories, sub } = playListCatList;

    for (let [index, category] of Object.entries(categories)) {
      let categoryList = sub.filter((subItem: any) => subItem.category == index);
      allCategoryList.push({
        name: category,
        icon: icon[index as any],
        list: categoryList
      });
    }
  }
});


// 分类已选择
let categorySelected = (type: string) => {
  if (!props.loading) {
    emit('selected', type);
  }
}
</script>

<style lang="scss" scoped>
.category {
  display: flex;
  margin-bottom: 40px;

  gap: 30px;

  &:last-child {
    margin-bottom: 0px;
  }

  .info {
    color: rgba($color: #000000, $alpha: .4);

    .icon {
      font-size: 20px;
    }

    .text {
      font-size: 16px;
    }
  }

  .list {
    flex: 1;

    grid-template-columns: repeat(5, 1fr);
  }
}
</style>