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
  },
  // 歌单详情
  getPlayListDetail(id: number) {
    return Request({
      url: "/playlist/detail",
      method: "GET",
      params: { id }
    })
  },
  // 获取歌单所有歌曲
  getPlayListTrackAll(id: number, limit?: number, offset?: number) {
    return Request({
      url: "/playlist/track/all",
      method: "GET",
      params: { id, limit, offset }
    })
  },
  // 获取歌曲详情
  getSongDetail(ids: number) {
    return Request({
      url: "/song/detail",
      method: "GET",
      params: { ids }
    })
  },
  // 获取音乐 url
  // getSongUrl(idParams: number | number[]) {
  //   let id = Array.isArray(idParams) ? idParams.join(",") : idParams;
  //   return Request({
  //     url: "/song/url",
  //     method: "GET",
  //     params: { id }
  //   })
  // },



  // 歌单分类
  getPlayListCatlist() {
    return Request({
      url: "/playlist/catlist",
      method: "GET",
    })
  },
  // 热门歌单分类
  getPlayListHot() {
    return Request({
      url: "/playlist/hot",
      method: "GET",
    })
  },
  // 歌单
  getTopPlaylist(cat: string, offset: number = 0, limit: number = 30) {
    return Request({
      url: "/top/playlist",
      method: "GET",
      params: { cat, offset, limit }
    })
  },
}