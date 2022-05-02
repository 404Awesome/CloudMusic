import { CloudMusicAPI } from "./request";

// 电台Banner
export const getDjBanner = () => {
  return CloudMusicAPI({
    url: "/dj/banner",
    method: "GET",
  })
}

// 电台分类
export const getDjCatelist = () => {
  return CloudMusicAPI({
    url: "/dj/catelist",
    method: "GET",
  })
}

// 付费精选
export const getDjPaygift = (offset: number = 0, limit: number = 30) => {
  return CloudMusicAPI({
    url: "/dj/paygift",
    method: "GET",
    params: {
      offset,
      limit
    }
  })
}

// 类别热门电台
export const getRadioHot = (cateId: number, offset: number = 0, limit: number = 30) => {
  return CloudMusicAPI({
    url: "/dj/radio/hot",
    method: "GET",
    params: {
      cateId,
      offset,
      limit
    }
  })
}

// 详情 -> 登陆
export const getDjDetail = (rid: number) => {
  return CloudMusicAPI({
    url: "/dj/detail",
    method: "GET",
    params: {
      rid
    }
  })
}

// 节目详情
export const getProgramDetail = (id: number) => {
  return CloudMusicAPI({
    url: "/dj/program/detail",
    method: "GET",
    params: {
      id
    }
  })
}

// 今日精选
export const getTodayPerfered = () => {
  return CloudMusicAPI({
    url: "/dj/today/perfered",
    method: "GET",
  })
}

// 节目榜
export const getProgramToplist = (offset: number = 0, limit: number = 100) => {
  return CloudMusicAPI({
    url: "/dj/program/toplist",
    method: "GET",
    params: {
      limit,
      offset
    }
  })
}

// 最热主播
export const getToplistPopular = (limit: number = 10) => {
  return CloudMusicAPI({
    url: "/dj/toplist/popular",
    method: "GET",
    params: {
      limit
    }
  })
}

// 热门电台
export const getDjHot = (offset: number = 0, limit: number = 30) => {
  return CloudMusicAPI({
    url: "/dj/hot",
    method: "GET",
    params: {
      limit,
      offset
    }
  })
}