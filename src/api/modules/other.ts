import { GET } from "../request";

export default {
  // 获取个性推荐Banner
  getBanner(type: 0 | 1 | 2 | 3 = 0) {
    // type: 0[pc] 1[android] 2[iphone] 3[ipad]
    return GET("/banner", { type });
  },
  // 获取热搜列表(详细)
  getSearchHot() {
    return GET("/search/hot/detail");
  },
  // 搜索
  getCloudSearch(keywords: string, type: number = 1, offset: number = 0, limit: number = 50) {
    // type: 1[单曲], 10[专辑], 100[歌手], 1000[歌单], 1002[用户], 1009[电台], 1014[视频], 
    return GET("/cloudsearch", { keywords, type, offset, limit });
  },
}