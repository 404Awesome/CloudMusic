<!-- 发送评论 -->
<template>
  <div>
    <!-- 标题 -->
    <h4 class="title">听友评论</h4>
    <!-- 表单 -->
    <el-input @keydown.stop rows="3" v-model.lazy="content" maxlength="140" placeholder="输入评论或@朋友" show-word-limit
      type="textarea" />
    <!-- 导航 -->
    <nav class="nav">
      <section></section>
      <button @click="sendComment">评论</button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useDebounceFn } from '@vueuse/shared';
const emit = defineEmits(['getComment']);
const props = defineProps({
  id: {
    type: [Number, String],
    required: true
  }
})

// 评论内容
let content = ref<string>("");
// 发送评论
let sendComment = useDebounceFn(() => {
  if (!content.value.trim()) return ElMessage.warning('请输入评论内容!');
  emit('getComment', props.id, content.value.trim());
}, 500);
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
  font-size: 18px;
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
    font-size: 14px;
    cursor: pointer;

    &:hover {
      border: 1px solid transparent;
      background-color: var(--theme-color);
      color: #fff;
      ;
    }
  }
}
</style>