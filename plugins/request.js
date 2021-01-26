/**
 * 基于axios封装的请求模块
 */
import axios from 'axios'
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io',
})

export default ({ store }) => {
  // 添加请求拦截器
  request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state
    if (user && user.token) {
      config.headers = {
        Authorization: `Token ${user.token}`
      }
    }
    return config;
  }, function (error) {
    debugger
    // 对请求错误做些什么
    return Promise.reject(error);
  });
}