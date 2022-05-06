<!-- 发送评论 -->
<template>
  <div>
    <h4 class="title">听友评论</h4>
    <el-input rows="3" :autosize="{ minRows: 3 }" v-model="content" maxlength="140" placeholder="输入评论或@朋友"
      show-word-limit type="textarea" />
    <nav class="nav">
      <section></section>
      <button>评论</button>
    </nav>
  </div>
</template>

<script setup lang="ts">
let props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

// 评论内容
let content = ref<string>("");
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
  color: var(--font-color);
  font-size: 18px;
}

:deep(.el-textarea__inner):focus {
  box-shadow: 0 0 0 1px var(--theme-bg-color) inset;
}

nav.nav {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  button {
    padding: 5px 15px;
    border: 1px solid #dcdfe6;
    border-radius: 20px;
    background-color: #fff;
    color: var(--font-color);
    font-size: 14px;
    cursor: pointer;

    &:hover {
      border: 1px solid transparent;
      background-color: var(--theme-bg-color);
      color: #fff;
      ;
    }
  }
}
</style>