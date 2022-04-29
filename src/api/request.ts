import axios, { AxiosRequestConfig } from "axios";

export const CloudMusicAPI = (config: AxiosRequestConfig) => {
  let instance = axios.create({
    baseURL: "https://awesome404.vercel.app/",
    timeout: 5000
  })

  instance.interceptors.request.use((resConfig) => {
    let data = resConfig[resConfig.method == "get" ? "params" : "data"];
    data ? data.timestamp = Date.now() : data = { timestamp: Date.now() };
    return resConfig;
  })

  instance.interceptors.response.use((reqData) => {
    return reqData.data;
  })

  return instance(config);
}