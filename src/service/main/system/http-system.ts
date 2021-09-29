/*
 * @Author: August
 * @Date: 2021-09-27 10:59:43
 * @LastEditors: August
 * @LastEditTime: 2021-09-29 20:56:20
 * @FilePath: \rookie-cms\src\service\main\system\http-system.ts
 */
import hyRequest from '../../index'

import { IDataType } from '../../types'

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
export function editPageData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
export function searchPageData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function getRoleData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
export function assignRoleData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
export function addUsereData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url
  })
}
