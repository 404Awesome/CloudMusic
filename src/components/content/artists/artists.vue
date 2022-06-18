<!-- 艺术家 -->
<template>
  <p class="artists">
    <span @click="goArtistPage(artist)" v-for="artist in props.artists" :key="artist.id">
      {{ artist.name }}
    </span>
  </p>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { PropType } from "vue";
const router = useRouter();
const props = defineProps({
  artists: {
    type: Array as PropType<any[]>,
    required: true,
  },
});

// 跳转艺术家页面
let goArtistPage = (artist: any) => {
  let { id, name } = artist;
  router.push({ path: `/singerDetail`, query: { id, name } });
};
</script>

<style lang="scss" scoped>
@import "@/scss/mixins.scss";

.artists {
  @include oneOmit;

  span {
    color: rgba(0, 0, 0, 0.5);
    font-size: 13px;
    cursor: pointer;

    &::after {
      display: inline-block;
      padding: 0px 5px;
      color: rgba(0, 0, 0, 0.45);
      content: "/";
      cursor: default;
    }

    &:last-child::after {
      display: none;
    }

    &:hover {
      color: var(--theme-bg-color);
    }
  }
}
</style>
