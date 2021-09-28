/*
 * @Author: August
 * @Date: 2021-09-24 16:47:25
 * @LastEditors: August
 * @LastEditTime: 2021-09-27 16:14:45
 * @FilePath: \rookie-cms\src\global\index.ts
 */
import { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'
export function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
}
