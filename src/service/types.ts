/*
 * @Author: August
 * @Date: 2021-09-24 18:01:57
 * @LastEditors: August
 * @LastEditTime: 2021-09-24 18:06:06
 * @FilePath: \rookie-cms\src\service\types.ts
 */
export interface IDataType<T = any> {
  success: boolean
  message: string
  data: T
}
