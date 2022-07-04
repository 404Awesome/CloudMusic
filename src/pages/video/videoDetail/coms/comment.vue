<!-- 视频详情评论 -->
<template>
  <!-- 发送评论 -->
  <SendComment :id="props.id" @getComment="getComment" />

  <!-- 评论列表 -->
  <CommentList :id="props.id" :RequestData="VideoAPI.getComment" />
</template>

<script setup lang="ts">
import SendComment from "@/components/content/sendComment/sendComment.vue";
import CommentList from "@/components/content/commentList/commentList.vue";
import { VideoAPI } from "api";
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