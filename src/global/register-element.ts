/*
 * @Author: August
 * @Date: 2021-09-24 16:48:02
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 18:12:30
 * @FilePath: \rookie-cms\src\global\register-element.ts
 */

import { App } from 'vue'
import { ElButton, ElCheckbox, ElForm, ElInput, ElLink, ElTabs } from 'element-plus'
const components = [ElForm, ElButton, ElInput, ElTabs, ElCheckbox, ElLink]
export default function (app: App): void {
  for (const component of components) {
    app.use(component)
    // app.component(component.name, component)
  }
}
