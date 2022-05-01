// 电台
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