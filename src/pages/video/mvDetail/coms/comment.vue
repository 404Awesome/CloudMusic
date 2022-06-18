<!-- mv评论 -->
<template>
  <!-- 发送评论 -->
  <SendComment @getComment="getComment" />

  <!-- 评论列表 -->
  <CommentList :id="props.id" :RequestData="MVAPI.getComment" />
</template>

<script setup lang="ts">
import SendComment from "@/components/content/sendComment/sendComment.vue";
import CommentList from "@/components/content/commentList/commentList.vue";
import { MVAPI } from "api";
const props = defineProps({
  id: {
    type: Number,
    required: true
  }
});

// 获取评论
let getComment = (comment: string) => {
  console.log(comment);
}
</script>