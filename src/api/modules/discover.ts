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
  // 歌手列表
  getArtistList(type: string, area: string, initial: string, offset: number = 0, limit: number = 30) {
    return Request({
      url: "/artist/list",
      method: "GET",
      params: { type, area, initial, offset, limit }
    })
  },
  // 获取歌手专辑
  getArtistAlbum(id: number, offset: number = 0, limit: number = 30) {
    return Request({
      url: "/artist/album",
      method: "GET",
      params: { id, offset, limit }
    })
  },
  // 获取专辑内容
  getAlbum(id: number) {
    return Request({
      url: "/album",
      method: "GET",
      params: { id }
    })
  },
  // 歌手热门50首歌曲
  getArtistTopSong(id: number) {
    return Request({
      url: "/artist/top/song",
      method: "GET",
      params: { id }
    })
  },
}