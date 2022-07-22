<!-- 动态评论 -->
<template>
  <div>
    <!-- 发送评论 -->
    <SendComment :id="props.id" @getComment="getComment" />

    <!-- 评论列表 -->
    <CommentList :id="props.id" :limit="10" :RequestData="AccountAPI.getCommentEvent" />
  </div>
</template>

<script setup lang="ts">
import SendComment from "@/components/content/sendComment/sendComment.vue";
import CommentList from "@/components/content/commentList/commentList.vue";
import { AccountAPI } from "api"
const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

// 获取评论
let getComment = (id: number, content: string) => {
  console.log(id, content);
}
</script>