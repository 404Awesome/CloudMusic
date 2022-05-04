<!-- mv排行榜item -->
<template>
  <div class="rankingItem">
    <p class="rank">{{ rank }}</p>

    <div class="mvListItem">
      <MVlistItem v-bind="data" :isFlex="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MVlistItem from "@/components/content/mvListItem/mvListItem.vue";
let props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },
});
let { data, rank }: any = markRaw(props);
</script>

<style lang="scss" scoped>
.rankingItem {
  display: flex;

  .rank {
    display: flex;
    align-items: center;
    flex-basis: 50px;
    flex-grow: 0;
    flex-shrink: 0;
    justify-content: center;
    color: #999999;
    font-size: 25px;
  }

  .mvListItem {
    overflow: hidden;
    flex: 1;
  }
}
</style>
