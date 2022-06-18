<!-- 轮播图 -->
<template>
  <div v-if="data.length" class="carousel">
    <el-carousel class="wrapper" :interval="3000" type="card" height="190px">
      <el-carousel-item v-for="item in props.data" :key="item.url">
        <el-image class="img" :src="item.imageUrl || item.pic" fit="cover" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.carousel {
  padding: 30px 0px 15px;
  background-color: #f5f7fa;

  .el-carousel {
    .el-carousel__item {
      display: flex;
      align-items: center;

      :deep(.el-image__inner) {
        border-radius: 5px;
      }
    }
  }
}

@media screen and (max-width: 1140px) {
  .carousel .img {
    height: 150px;
  }
}
</style>
