import { ILoginStateType } from './login/types'
import { ISystemState } from './main/system/types'

/*
 * @Author: August
 * @Date: 2021-09-25 18:35:54
 * @LastEditors: August
 * @LastEditTime: 2021-09-29 15:18:17
 * @FilePath: \rookie-cms\src\store\types.ts
 */
export interface IRootTypes {
  name: string
  age: number
}
export interface IRootWithModules {
  login: ILoginStateType
  system: ISystemState
}
export type IStoreType = IRootTypes & IRootWithModules
