<template>
  <div class="wrapper">
    <nav class="nav">
      <h4>付费精品</h4>
      <span class="i-heroicons-outline:chevron-right"></span>
    </nav>

    <ul v-if="paygift.length" class="content">
      <li v-for="item in paygift" :key="item.id">
        <section>
          <el-image :src="item.picUrl" fit="cover" lazy />
        </section>
        <section>
          <p class="name">{{ item.name }}</p>
          <p class="describe">
            <span truncate>{{ item.rcmdText }}</span>
            <span truncate>{{ item.lastProgramName }}</span>
          </p>
          <p class="price">{{ item.originalPrice }}</p>
        </section>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getDjPaygift } from "@/api/radioStation";

let paygift = reactive<any[]>([]);
onMounted(async () => {
  // 获取付费精选
  let { code, data }: any = await getDjPaygift(0, 4);
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
.wrapper {
  margin: 30px auto;
  width: 80%;
}

.content {
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  gap: 20px 30px;

  li {
    display: flex;

    gap: 15px;

    section {
      &:first-child {
        display: flex;
        flex-basis: 25%;
        flex-grow: 0;
        flex-shrink: 0;
        cursor: pointer;

        :deep(.el-image__inner) {
          border-radius: 5px;
        }
      }

      &:last-child {
        display: flex;
        flex: 1;
        flex-flow: column nowrap;
        justify-content: space-around;
        color: var(--font-color);

        .name {
          cursor: pointer;

          &:hover {
            color: var(--theme-bg-color);
          }
        }

        .price {
          color: #d63031;
        }

        .describe {
          display: flex;
          flex-flow: column nowrap;
          color: #8395a7;
          font-size: 13px;
        }
      }
    }
  }
}

.nav {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: var(--font-color);

  h4 {
    margin: 0;
    margin-right: 5px;
    font-weight: 400;
    font-size: 17px;

    &:hover {
      color: var(--theme-bg-color);
      cursor: pointer;

      & + span {
        color: var(--theme-bg-color);
        transform: translateX(5px);
      }
    }
  }

  span {
    font-size: 20px;
    transition: transform 0.2s ease-in-out;
  }
}
</style>
