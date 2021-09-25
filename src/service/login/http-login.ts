/*
 * @Author: August
 * @Date: 2021-09-25 18:06:10
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 20:17:22
 * @FilePath: \rookie-cms\src\service\login\http-login.ts
 */
import auRequest from '../index'
import { IDataType } from '../types'
import { IAccount } from './types'

enum LoginAPI {
  Login = '/api/v1/user/login',
  UserInfo = '/api/v1/user/userInfo/', // userInfo/{userId}
  UserMenus = '/api/v1/menu/list/' // menu/{userId}
}
// 登录请求
export function loginRequest(account: IAccount): Promise<IDataType<any>> {
  return auRequest.post({
    url: LoginAPI.Login,
    data: account
  })
}
// 用户信息请求
export function requestUserInfo(id: number): Promise<IDataType<any>> {
  return auRequest.get({
    url: LoginAPI.UserInfo + id,
    showLoading: false
  })
}
// 用户菜单请求
export function requestUserMenus(id: number): Promise<IDataType<any>> {
  return auRequest.get({
    url: LoginAPI.UserMenus + id,
    showLoading: false
  })
}
