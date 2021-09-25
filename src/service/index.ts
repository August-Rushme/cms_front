/*
 * @Author: August
 * @Date: 2021-09-24 18:01:25
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 11:52:53
 * @FilePath: \rookie-cms\src\service\index.ts
 */
// service出口
import { BASE_URL, TIME_OUT } from './request/config'
import AuRequest from './request'
const auRequest = new AuRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})
export default auRequest
