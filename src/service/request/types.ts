/*
 * @Author: August
 * @Date: 2021-09-25 11:07:52
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 11:54:03
 * @FilePath: \rookie-cms\src\service\request\types.ts
 */
import { AxiosRequestConfig, AxiosResponse } from 'axios'
//拦截器接口
export interface AuRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}
// 扩展AxiosRequestConfig
export interface AuRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  showLoading?: boolean
  interceptors?: AuRequestInterceptors<T>
}
