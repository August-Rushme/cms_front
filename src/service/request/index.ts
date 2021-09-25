/*
 * @Author: August
 * @Date: 2021-09-25 11:07:41
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 11:45:18
 * @FilePath: \rookie-cms\src\service\request\index.ts
 */
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { AuRequestInterceptors, AuRequestConfig } from './types'
import { ElLoading, ILoadingInstance } from 'element-plus'
// 是否显示loading效果，默认true
const DEFAULT_LOADING = true
class AuRequest {
  instance: AxiosInstance
  // 拦截器
  interceptors?: AuRequestInterceptors
  // loading
  showLoading: boolean
  loading?: ILoadingInstance
  constructor(config: AuRequestConfig) {
    //  创建axios实例
    this.instance = axios.create(config)
    //保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors
    //单个实例使用interceptors
    //请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptor
    )
    // 添加所有实例的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res
      },
      (err) => {
        return err
      }
    )
  }
  request<T>(config: AuRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求的config处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 是否需要loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求的数据处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 将showLoading设置为true,避免影响下一个请求
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          // 将showLoading设置为true,避免影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }
  // get方法
  get<T>(config: AuRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  // post方法
  post<T>(config: AuRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  //  delete方法
  delete<T>(config: AuRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  // patch方法
  patch<T>(config: AuRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default AuRequest
