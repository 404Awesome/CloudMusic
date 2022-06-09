<!-- 付费精品 -->
<template>
  <div class="wrapper" mb-7 mt-3>
    <!-- 导航栏 -->
    <NavBar title="付费精品" path="/123123" />

    <!-- 列表 -->
    <ul gap-5 lg:gap-7 v-if="paygift.length" class="content">
      <li v-for="item in paygift" :key="item.id">
        <!-- 封面 -->
        <el-image rounded cursor="pointer" basis="1/4" :src="item.picUrl" fit="cover" />
        <!-- 简介 -->
        <div class="info">
          <p cursor="pointer" class="name">{{ item.name }}</p>
          <p class="describe">
            <span truncate>{{ item.rcmdText }}</span>
            <span truncate>{{ item.lastProgramName }}</span>
          </p>
          <p class="price">{{ item.originalPrice }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RadioStation } from "@/api/modules/radioStation";
import NavBar from "@/components/common/navBar/navBar.vue";

let paygift = reactive<any[]>([]);
onMounted(async () => {
  // 获取付费精选
  let { code, data }: any = await RadioStation.getPaygift(0, 4);
  if (code == 200) {
    data = data.list.map((item: any) => {
      let price = (item.originalPrice / 100).toFixed(1);
      return Object.assign(item, { originalPrice: `￥${price}` });
    });
    paygift.push(...data);
  }
});
</script>

<style lang="scss" scoped>
.content {
  display: grid;
  margin-top: 15px;

  grid-template-columns: repeat(2, 1fr);

  li {
    display: flex;
    gap: 15px;

    .info {
      display: flex;
      flex: 1;
      flex-flow: column nowrap;
      justify-content: space-around;
      color: var(--font-color);
      overflow: hidden;
      cursor: default;

      .name:hover {
        color: var(--theme-bg-color);
      }

      .price {
        color: #d63031;
      }

      .describe {
        display: flex;
        flex-flow: column nowrap;
        color: #8395a7;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 13px;
      }
    }
  }
}
</style>
