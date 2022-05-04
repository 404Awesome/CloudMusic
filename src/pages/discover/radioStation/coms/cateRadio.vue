<!-- 分类电台 -->
<template>
  <div class="wrapper" v-if="result.length">
    <!-- 导航栏 -->
    <NavBar :title="title" :path="path" />

    <!-- 列表 -->
    <ul v-if="result.length" class="content">
      <li v-for="item in result" :key="item.id">
        <div class="avatar">
          <el-image :src="item.picUrl" lazy />
          <p class="name" truncate>{{ item.name }}</p>
        </div>
        <p class="title">{{ item.rcmdtext }}</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { RadioStation } from "@/api/modules/radioStation";
import NavBar from "@/components/common/navBar/navBar.vue";
let props = defineProps({
  cateId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
});
let { cateId, title, path } = toRefs(props);

let result = reactive<any[]>([]);
onMounted(async () => {
  let { code, djRadios }: any = await RadioStation.getCateRadioHot(cateId.value, 0, 6);
  if (code == 200) {
    djRadios.length = 6;
    result.push(...djRadios);
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0px auto;
  padding-bottom: 30px;
  width: 80%;
}

.content {
  display: grid;
  margin-top: 15px;

  grid-template-columns: repeat(6, 1fr);
  gap: 30px;

  li {
    cursor: pointer;

    &:hover .title {
      color: var(--theme-bg-color);
    }

    .avatar {
      position: relative;
      display: flex;
      overflow: hidden;
      border: 1px solid #eee;
      border-radius: 5px;

      .name {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 5px;
        width: 100%;
        background-color: rgba($color: #000000, $alpha: 0.2);
        color: #fff;
        font-size: 12px;
      }
    }

    .title {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      margin-top: 5px;
      color: var(--font-color);
      text-overflow: ellipsis;
      font-size: 14px;

      -webkit-line-clamp: 2;
    }
  }
}
</style>