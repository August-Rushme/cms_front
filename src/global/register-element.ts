/*
 * @Author: August
 * @Date: 2021-09-24 16:48:02
 * @LastEditors: August
 * @LastEditTime: 2021-09-24 16:54:57
 * @FilePath: \rookie-cms\src\global\register-element.ts
 */

import { App } from 'vue'
import { ElButton, ElInput } from 'element-plus'
const components = [ElButton, ElInput]
export default function (app: App): void {
  for (const component of components) {
    app.use(component)
    // app.component(component.name, component)
  }
}
