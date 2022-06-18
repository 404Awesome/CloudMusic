import { GET } from "../request";

export default {
  // 获取个性推荐Banner
  getBanner(type: 0 | 1 | 2 | 3 = 0) {
    // type: 0[pc] 1[android] 2[iphone] 3[ipad]
    return GET("/banner", { type });
  },
}