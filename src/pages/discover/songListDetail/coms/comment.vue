<!-- 歌单评论 -->
<template>
  <div py-4>
    <!-- 发送评论 -->
    <SendComment @getComment="getComment" />

    <!-- 评论列表 -->
    <CommentList :id="id" :RequestData="SongListAPI.getComment" />
  </div>
</template>

<script setup lang="ts">
import SendComment from "@/components/content/sendComment/sendComment.vue";
import CommentList from "@/components/content/commentList/commentList.vue";
import { useRoute } from "vue-router";
import { SongListAPI } from "api";
const route = useRoute();
let id = parseInt(route.params.id as string);

// 获取评论
let getComment = (comment: string) => {
  console.log(comment);
}
</script>