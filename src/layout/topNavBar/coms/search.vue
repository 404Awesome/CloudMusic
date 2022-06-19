<!-- 搜索 -->
<template>
  <el-popover @hide="searchText = ''" :hide-after="0" @show="showPopover" width="200px" placement="bottom-start"
    trigger="click">
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
        <div v-if="searchHotList.length" class="trending">
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
import { SearchAPI } from "api";

// 热搜列表
let searchHotList = reactive<any>([]);
// 显示Popover时触发事件
let showPopover = async () => {
  if (!searchHotList.length) {
    // 加载搜索热搜
    let { code, data }: any = await SearchAPI.getSearchHot();
    if (code == 200) searchHotList.push(...data);
  }
}

// 搜索
let searchText = ref("");
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
@import "@/scss/mixins.scss";

.search {
  color: var(--font-color);

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

    .trendingList {
      display: flex;
      overflow: hidden;
      margin-bottom: 5px;
      padding-right: 6px;
      font-size: 14px;
      cursor: pointer;

      span {
        @include oneOmit;

        &:nth-child(1) {
          width: 25px;
          text-align: center;
        }

        &:nth-child(2) {
          flex: 1;
          margin-right: 5px;
        }

        &:nth-child(3) {
          flex: 1;
          color: rgba($color: #000000, $alpha: .3);
          font-size: 13px;
        }
      }

      &:hover {
        color: var(--theme-bg-color);
      }
    }
  }
}
</style>