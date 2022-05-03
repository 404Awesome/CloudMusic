import axios, { AxiosRequestConfig } from "axios";

// 实例
const instance = axios.create({
  baseURL: "https://awesome404.vercel.app/",
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use((resConfig) => {
  let data = resConfig[resConfig.method == "get" ? "params" : "data"];
  data ? data.timestamp = Date.now() : data = { timestamp: Date.now() };
  return resConfig;
})

// 响应拦截器
instance.interceptors.response.use((reqData) => {
  return reqData.data;
})

export default (config: AxiosRequestConfig) => instance(config);
