<template>
  <div v-if="data.length" class="carousel">
    <el-carousel :interval="3000" type="card" height="190px">
      <el-carousel-item v-for="item in data" :key="item.url">
        <el-image :src="item.imageUrl || item.pic" fit="contain" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
let props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
let data = toRef(props, "data");
</script>

<style lang="scss" scoped>
.carousel {
  padding: 30px 0px 15px;
  width: 100%;
  background-color: #f5f7fa;

  .el-carousel {
    margin: 0 auto;
    width: 80%;

    .el-carousel__item {
      display: flex;
      align-items: center;

      :deep(.el-image__inner) {
        border-radius: 5px;
      }
    }
  }
}
</style>
