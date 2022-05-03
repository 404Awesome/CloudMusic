import Request from "@/api";

// 视频相关api
export const Video = {
  // 获取相关视频
  getRelevant(id: number) {
    return Request({
      url: "/related/allvideo",
      method: "GET",
      params: { id }
    })
  }
}

// MV相关api
export const MV = {
  // 获取MV详情
  getDetails(mvid: number) {
    return Request({
      url: "/mv/detail",
      method: "GET",
      params: { mvid }
    })
  },
  // 获取推荐MV
  getPersonalized() {
    return Request({
      url: "/personalized/mv",
      method: "GET",
    })
  },
  // 获取地址
  getAddress(id: number, r: number = 1080) {
    return Request({
      url: "/mv/url",
      method: "GET",
      params: { id, r }
    })
  }
}