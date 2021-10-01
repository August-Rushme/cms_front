/*
 * @Author: August
 * @Date: 2021-09-29 21:42:00
 * @LastEditors: August
 * @LastEditTime: 2021-09-29 21:44:38
 * @FilePath: \rookie-cms\src\service\main\dashboard\http-dashboard.ts
 */
import hyRequest from '../../index'

import { IDataType } from '../../types'

export function getGoodsData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
