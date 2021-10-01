/*
 * @Author: August
 * @Date: 2021-09-24 16:48:02
 * @LastEditors: August
 * @LastEditTime: 2021-09-30 08:35:56
 * @FilePath: \rookie-cms\src\global\register-element.ts
 */

import { App } from 'vue'
import {
  ElAvatar,
  ElBadge,
  ElBreadcrumb,
  ElButton,
  ElCard,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElDatePicker,
  ElDialog,
  ElDropdown,
  ElForm,
  ElIcon,
  ElImage,
  ElInput,
  ElLink,
  ElMenu,
  ElPagination,
  ElRow,
  ElSelect,
  ElSwitch,
  ElTable,
  ElTabs,
  ElTree,
  ElUpload
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
  ElSwitch,
  ElIcon,
  ElCard,
  ElPagination,
  ElDialog,
  ElTree,
  ElUpload,
  ElImage,
  ElBadge,
  ElIcon,
  ElUpload
]
export default function (app: App): void {
  for (const component of components) {
    app.use(component)
    // app.component(component.name, component)
  }
}
