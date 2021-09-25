/*
 * @Author: August
 * @Date: 2021-09-25 18:26:36
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 22:17:22
 * @FilePath: \rookie-cms\src\service\login\types.ts
 */
export interface IAccount {
  username: string
  password: string | Int32Array
}

export interface ILoginResult {
  id: number
  username: string
  token: string
}
