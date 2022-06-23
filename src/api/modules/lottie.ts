import axios from "axios";

export default {
  // 获取登陆LottieFile
  getLoginJSON() {
    return axios.get("https://assets10.lottiefiles.com/packages/lf20_nsypdr7p.json");
  }
}