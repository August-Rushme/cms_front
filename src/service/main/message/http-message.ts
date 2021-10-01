/*
 * @Author: August
 * @Date: 2021-09-29 22:08:44
 * @LastEditors: August
 * @LastEditTime: 2021-09-30 00:28:59
 * @FilePath: \rookie-cms\src\service\main\message\http-message.ts
 */
import hyRequest from '../../index'

import { IDataType } from '../../types'

export function getMessageData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
export function deleteMessagePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url
  })
}
export function editMessagePageData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
export function addMessagePageData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
