import Request from "@/api";

// 发现音乐相关api
export const Discover = {
  // 获取Banner
  getBanner(type: 0 | 1 | 2 | 3 = 0) {
    // 0: pc
    // 1: android
    // 2: iphone
    // 3: ipad
    return Request({
      url: "/banner",
      method: "GET",
      params: { type }
    })
  },
  // 获取推荐歌单
  getPersonalized(limit: number = 30) {
    return Request({
      url: "/personalized",
      method: "GET",
      params: { limit }
    })
  },
  // 独家放送列表
  getBroadcastList(offset: number = 0, limit: number = 60) {
    return Request({
      url: "/personalized/privatecontent/list",
      method: "GET",
      params: { limit, offset }
    })
  },
  // 推荐新音乐
  getNewSong(limit: number = 10) {
    return Request({
      url: "/personalized/newsong",
      method: "GET",
      params: { limit }
    })
  }
}