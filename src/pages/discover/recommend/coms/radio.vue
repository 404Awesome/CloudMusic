<!-- 个性推荐 主播电台 -->
<template>
  <ul gap-5 lg:gap-7 grid-cols-2 lg:grid-cols-3 class="radio">
    <li v-for="item in data" :key="item.id">
      <!-- 电台封面 -->
      <el-image :src="item.picUrl" fit="cover" lazy />
      <!-- 电台信息 -->
      <div class="info">
        <p>{{ item.copywriter }}</p>
        <p truncate>{{ item.name }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import { RadioAPI } from "api";

let data = reactive<any>([]);
onMounted(async () => {
  let { djRadios, code }: any = await RadioAPI.getHot(0, 6);
  if (code == 200) data.push(...djRadios);
});
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.radio {
  display: grid;
  margin-top: 15px;
  padding-bottom: 30px;

  li {
    display: flex;
    overflow: hidden;
    border-radius: 5px;
    background-color: #f5f7fa;
    cursor: pointer;

    :deep(.el-image) {
      flex-basis: 30%;
      flex-grow: 0;
      flex-shrink: 0;
    }

    .info {
      display: flex;
      overflow: hidden;
      flex: 1;
      flex-flow: column nowrap;
      justify-content: space-evenly;
      padding: 10px;

      p {
        @include oneOmit;

        &:first-child {
          font-size: 15px;
        }

        &:last-child {
          color: rgba($color: #000000, $alpha: 0.5);
          font-size: 13px;
        }
      }
    }

    &:hover .details p:first-child {
      color: var(--theme-color);
    }
  }
}
</style>
