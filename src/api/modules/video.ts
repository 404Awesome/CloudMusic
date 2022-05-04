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
  // 获取mv详情
  getDetail(mvid: number) {
    return Request({
      url: "/mv/detail",
      method: "GET",
      params: { mvid }
    })
  },
  // 获取推荐mv
  getPersonalized() {
    return Request({
      url: "/personalized/mv",
      method: "GET",
    })
  },
  // 获取mv地址
  getAddress(id: number, r: number = 1080) {
    return Request({
      url: "/mv/url",
      method: "GET",
      params: { id, r }
    })
  },
  // 获取最新mv
  getNewMV(area: string = "内地", limit: number = 30) {
    return Request({
      url: "/mv/first",
      method: "GET",
      params: { area, limit }
    })
  },
  // 获取mv点赞转发评论数数据
  getDetailInfo(mvid: number) {
    return Request({
      url: "/mv/detail/info",
      method: "GET",
      params: { mvid }
    })
  },
  // 网易出品 mv
  getExclusive(offset: number = 0, limit: number = 30) {
    return Request({
      url: "/mv/exclusive/rcmd",
      method: "GET",
      params: { offset, limit }
    })
  },
  // mv排行
  getTop(area: string, offset: number = 0, limit: number = 30) {
    return Request({
      url: "/top/mv",
      method: "GET",
      params: { area, offset, limit }
    })
  },
}