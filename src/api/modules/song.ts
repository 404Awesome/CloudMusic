import { GET } from "../request";

export default {
  // 推荐新音乐
  getNewSong(limit: number = 10) {
    return GET("/personalized/newsong", { limit });
  },
  // 获取歌曲详情
  getDetail(ids: number) {
    return GET("/song/detail", { ids });
  },
  // 获取私人FM
  getPersonalFM() {
    return GET("/personal_fm");
  },
  // 获取歌曲评论
  getComment(id: number, offset: number = 0, limit: number = 20) {
    return GET("/comment/music", { id, offset, limit });
  },
  // 获取相似音乐
  getSimi(id: number) {
    return GET("/simi/song", { id });
  },
  // 获取歌词
  getLyric(id: number) {
    return GET("/lyric", { id });
  },
}