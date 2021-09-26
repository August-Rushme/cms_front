/*
 * @Author: August
 * @Date: 2021-09-24 16:48:02
 * @LastEditors: August
 * @LastEditTime: 2021-09-26 14:37:06
 * @FilePath: \rookie-cms\src\global\register-element.ts
 */

import { App } from 'vue'
import {
  ElAvatar,
  ElBreadcrumb,
  ElButton,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElDatePicker,
  ElDropdown,
  ElForm,
  ElInput,
  ElLink,
  ElMenu,
  ElRow,
  ElSelect,
  ElSwitch,
  ElTable,
  ElTabs
} from 'element-plus'
const components = [
  ElForm,
  ElButton,
  ElInput,
  ElTabs,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElMenu,
  ElDropdown,
  ElAvatar,
  ElCol,
  ElRow,
  ElDatePicker,
  ElSelect,
  ElBreadcrumb,
  ElTable,
  ElSwitch
]
export default function (app: App): void {
  for (const component of components) {
    app.use(component)
    // app.component(component.name, component)
  }
}
