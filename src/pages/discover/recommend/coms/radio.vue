<!-- 个性推荐 主播电台 -->
<template>
  <ul class="radio">
    <li v-for="item in data" :key="item.id">
      <el-image :src="item.picUrl" fit="cover" lazy />
      <div class="details">
        <p>{{ item.copywriter }}</p>
        <p truncate>{{ item.name }}</p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RadioStation } from "@/api/modules/radioStation";

let data = reactive<any>([]);
onMounted(async () => {
  let { djRadios, code }: any = await RadioStation.getHot(0, 6);
  if (code == 200) {
    data.push(...djRadios);
  }
});
</script>

<style lang="scss" scoped>
.radio {
  display: grid;
  margin-top: 15px;
  padding-bottom: 30px;

  gap: 20px 30px;
  grid-template-columns: repeat(3, 1fr);

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

    .details {
      display: flex;
      overflow: hidden;
      flex: 1;
      flex-flow: column nowrap;
      justify-content: space-evenly;
      padding: 10px;
      color: var(--font-color);

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:first-child {
          color: var(--font-color);
          font-size: 15px;
        }

        &:last-child {
          color: rgba($color: #000000, $alpha: 0.5);
          font-size: 13px;
        }
      }
    }

    &:hover .details p:first-child {
      color: var(--theme-bg-color);
    }
  }
}
</style>
