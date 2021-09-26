import { ILoginStateType } from './login/types'

/*
 * @Author: August
 * @Date: 2021-09-25 18:35:54
 * @LastEditors: August
 * @LastEditTime: 2021-09-26 14:16:34
 * @FilePath: \rookie-cms\src\store\types.ts
 */
export interface IRootTypes {
  name: string
  age: number
}
export interface IRootWithModules {
  login: ILoginStateType
}
export type IStoreType = IRootTypes & IRootWithModules
