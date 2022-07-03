import { GET } from "../request";

export default {
  // 获取相似视频
  getRelated(id: number) {
    return GET("/related/allvideo", { id });
  },
  // 获取视频标签/分类下的视频
  getGroup(id: number, offset: number = 0) {
    return GET("/video/group", { id, offset });
  },
  // 获取视频标签列表
  getGroupList() {
    return GET("/video/group/list");
  },
  // 获取热门分类列表(需登陆)
  getCateList() {
    return GET("/video/category/list");
  },
  // 获取全部视频列表
  getTimelineAll(offset: number = 0) {
    return GET("/video/timeline/all", { offset });
  },
}