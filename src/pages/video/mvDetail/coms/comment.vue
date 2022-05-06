<!-- mv评论 -->
<template>
  <div class="comment">
    <!-- 发送评论 -->
    <SendComment :id="id" />

    <!-- 评论列表 -->
    <CommentList :id="id" :limit="10" />
  </div>
</template>

<script setup lang="ts">
import SendComment from "@/components/content/sendComment/sendComment.vue";
import CommentList from "@/components/content/commentList/commentList.vue";
let props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
let id = toRef(props, "id");
</script>