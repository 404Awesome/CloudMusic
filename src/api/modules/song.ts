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
}