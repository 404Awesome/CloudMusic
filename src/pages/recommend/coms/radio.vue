<template>
  <div grid grid-cols-3 gap-4 xl:gap-6 class="radio">
    <el-card shadow="never" v-for="item in data" :key="item.id">
      <el-image :src="item.picUrl" fit="cover" />
      <div class="details">
        <p truncate>{{ item.copywriter }}</p>
        <p truncate>{{ item.name }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getDjHot } from "@/api/radioStation";

let data = reactive<any>([]);
onMounted(async () => {
  let { djRadios, code }: any = await getDjHot(0, 6);
  if (code == 200) {
    data.push(...djRadios);
  }
});
</script>

<style lang="scss" scoped>
.radio {
  display: grid;
  margin: 0 auto;
  margin-top: 15px;
  width: 80%;

  gap: 20px;
  grid-template-columns: repeat(2, 1fr);

  section {
    display: flex;
    overflow: hidden;
    border-radius: 5px;
    background-color: #f5f7fa;
    cursor: pointer;

    :deep(.el-image__inner) {
      flex-basis: 100px;
      height: 100px;
    }

    .details {
      flex: 1;
      padding-left: 15px;
      color: var(--font-color);

      &:hover {
        color: var(--theme-bg-color);
      }
    }
  }

  :deep(.el-card) {
    background-color: #f5f7fa;
    cursor: pointer;

    .el-card__body {
      display: flex;
      padding: 0px;

      .el-image__inner {
        flex: 0;
        flex-basis: 100px;
        height: 100px;
      }

      .details {
        display: flex;
        overflow: hidden;
        flex: 1;
        flex-flow: column nowrap;
        justify-content: center;
        padding: 0px 10px;

        gap: 7px;

        p {
          &:first-child {
            color: var(--font-color);
          }
          &:last-child {
            color: #a4b0be;
            font-size: 14px;
          }
        }
      }
    }

    &:hover {
      transform: translateY(-7px);

      .el-card__body .details p:first-child {
        color: var(--theme-bg-color);
      }
    }
  }
}
</style>
