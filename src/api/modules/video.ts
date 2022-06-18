import { GET } from "../request";

export default {
  // 获取相似视频
  getRelated(id: number) {
    return GET("/related/allvideo", { id });
  },
  // 获取分类列表(需登陆)
  getCateList() {
    return GET("/video/category/list");
  }
}