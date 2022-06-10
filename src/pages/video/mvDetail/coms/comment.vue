<!-- mv评论 -->
<template>
  <!-- 发送评论 -->
  <SendComment title="听友评论" @getComment="getComment" />

  <!-- 评论列表 -->
  <CommentList :id="id" :RequestData="MV.getComment" />
</template>

<script setup lang="ts">
import SendComment from "@/components/content/sendComment/sendComment.vue";
import CommentList from "@/components/content/commentList/commentList.vue";
import { MV } from "@/api/modules/video";
let props = defineProps({
  id: {
    type: Number,
    required: true
  }
})
let id = toRef(props, "id");

// 获取评论
let getComment = (comment: string) => {
  console.log(comment);
}
</script>