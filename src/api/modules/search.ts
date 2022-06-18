import { GET } from "../request";

export default {
  // 获取热搜列表(详细)
  getSearchHot() {
    return GET("/search/hot/detail");
  }
}