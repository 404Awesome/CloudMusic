import Request from "@/api";

// 操作
export const Operate = {
  // 获取搜索热搜 详细
  getSearchHot() {
    return Request({ url: "/search/hot/detail" });
  }
}