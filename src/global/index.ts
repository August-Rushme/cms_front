/*
 * @Author: August
 * @Date: 2021-09-24 16:47:25
 * @LastEditors: August
 * @LastEditTime: 2021-09-24 16:52:21
 * @FilePath: \rookie-cms\src\global\index.ts
 */
import { App } from 'vue'
import registerElement from './register-element'
export function globalRegister(app: App): void {
  registerElement(app)
}
