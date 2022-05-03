import Request from "@/api";

// 电台相关api
export const RadioStation = {
  // 获取电台Banner
  getBanner() {
    return Request({
      url: "/dj/banner",
      method: "GET",
    })
  },
  // 获取电台分类列表
  getCatelist() {
    return Request({
      url: "/dj/catelist",
      method: "GET",
    })
  },
  // 付费精选
  getPaygift(offset: number = 0, limit: number = 30) {
    return Request({
      url: "/dj/paygift",
      method: "GET",
      params: { offset, limit }
    })
  },
  // 类别热门电台
  getCateRadioHot(cateId: number, offset: number = 0, limit: number = 30) {
    return Request({
      url: "/dj/radio/hot",
      method: "GET",
      params: { cateId, offset, limit }
    })
  },
  // 获取电台详情 [登陆]
  getDetail(rid: number) {
    return Request({
      url: "/dj/detail",
      method: "GET",
      params: { rid }
    })
  },
  // 获取节目详情
  getProgramDetail(id: number) {
    return Request({
      url: "/dj/program/detail",
      method: "GET",
      params: { id }
    })
  },
  // 获取今日精选
  getTodayPerfered() {
    return Request({
      url: "/dj/today/perfered",
      method: "GET",
    })
  },
  // 获取热门电台
  getHot(offset: number = 0, limit: number = 30) {
    return Request({
      url: "/dj/hot",
      method: "GET",
      params: { limit, offset }
    })
  }
}