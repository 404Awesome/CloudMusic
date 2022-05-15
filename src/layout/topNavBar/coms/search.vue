<!-- 搜索 -->
<template>
  <el-popover width="200px" placement="bottom-start" trigger="click">
    <template #reference>
      <span class="icon i-heroicons-outline:search"></span>
    </template>

    <template #default>
      <div class="search">
        <!-- 表单 -->
        <div class="form">
          <input v-model.trim.lazy="searchText" type="text" placeholder="搜索" />
          <button @click="search">搜索</button>
        </div>

        <!-- 热搜榜 -->
        <div class="trending">
          <el-divider>
            <h4>热搜榜</h4>
          </el-divider>
          <el-scrollbar height="200px" :always="true">
            <p @click="searchHot(item)" class="trendingList" v-for="(item, index) in searchHotList"
              :key="item.searchWord">
              <span :style="{ 'color': index < 3 ? 'var(--theme-bg-color)' : '' }">{{ index + 1 }}</span>
              <span>{{ item.searchWord }}</span>
              <span>{{ item.score }}</span>
            </p>
          </el-scrollbar>
        </div>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { Operate } from "@/api/modules/operate";

// 热搜列表
let searchHotList = reactive<any>([]);
onMounted(async () => {
  // 获取搜索热搜
  let { code, data }: any = await Operate.getSearchHot();
  if (code == 200) searchHotList.push(...data);
})

// 搜索
let searchText = ref<string>("");
let search = () => {
  if (searchText.value.length) {
    console.log(searchText.value);
  }
}

// 搜索热搜
let searchHot = (songInfo: any) => {
  console.log(songInfo);
}
</script>

<style lang="scss" scoped>
.search {

  .form {
    display: flex;

    gap: 5px;

    input {
      box-sizing: border-box;
      padding: 5px 10px;
      width: 130px;
      outline: none;
      border: none;
      border-radius: 5px;
      background-color: #eee;
      color: var(--font-color);
      font-size: 14px;
    }

    button {
      flex: 1;
      border: none;
      border-radius: 5px;
      background-color: var(--theme-bg-color);
      color: #fff;
      white-space: nowrap;
      cursor: pointer;
    }
  }

  .trending {
    margin-top: 10px;

    h4 {
      color: var(--font-color);
    }

    .trendingList {
      display: flex;
      overflow: hidden;
      margin-bottom: 5px;
      color: var(--font-color);
      font-size: 14px;
      cursor: pointer;


      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:nth-child(1) {
          width: 25px;
          text-align: center;
        }

        &:nth-child(2) {
          margin-right: 5px;
        }

        &:nth-child(3) {
          color: rgba($color: #000000, $alpha: .3);
        }
      }

      &:hover {
        color: var(--theme-bg-color);
      }
    }
  }
}
</style>