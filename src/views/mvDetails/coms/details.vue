<template>
  <div class="details">
    <header>
      <!-- <el-image :src=""></el-image> -->
      <p v-html="getName"></p>
    </header>
    <main>
      <h4>{{ data.name }}</h4>
    </main>
  </div>
</template>

<script setup lang="ts">
import { getUserDetails } from "@/api/account";

let props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
let data = toRef(props, "data");
console.log(data.value);

let getName = computed(() => {
  let names = data.value.artists.map(
    (item: any) => `<span>${item.name}</span>`
  );
  return names.length == 1 ? names[0] : names.join("<span> / </span>");
});
</script>

<style lang="scss" scoped></style>
