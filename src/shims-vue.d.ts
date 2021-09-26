/*
 * @Author: August
 * @Date: 2021-09-24 16:10:31
 * @LastEditors: August
 * @LastEditTime: 2021-09-26 13:25:41
 * @FilePath: \rookie-cms\src\shims-vue.d.ts
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
