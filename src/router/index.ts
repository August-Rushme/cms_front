/*
 * @Author: August
 * @Date: 2021-09-24 16:36:12
 * @LastEditors: August
 * @LastEditTime: 2021-09-24 17:06:10
 * @FilePath: \rookie-cms\src\router\index.ts
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = []
const router = createRouter({
  routes,
  history: createWebHistory()
})
export default router
