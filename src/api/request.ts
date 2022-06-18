import axios, { AxiosRequestConfig } from "axios";

// 请求实例
let Request = (config: AxiosRequestConfig) => {
  // 实例
  const instance = axios.create({
    baseURL: "https://awesome404.vercel.app/",
    timeout: 5000,
  });

  // 请求拦截器
  instance.interceptors.request.use((resConfig) => resConfig);

  // 响应拦截器
  instance.interceptors.response.use((reqData) => reqData.data);

  // 返回实例
  return instance(config);
};

// GET请求
export const GET = (url: string, params?: object) => {
  return Request({
    url,
    method: "GET",
    params: { ...params, timestamp: Date.now() },
  })
};

// POST请求
export const POST = (url: string, data?: object) => {
  return Request({
    url,
    method: "POST",
    data: { ...data, timestamp: Date.now() },
  });
};