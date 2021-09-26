/*
 * @Author: August
 * @Date: 2021-09-24 16:36:12
 * @LastEditors: August
 * @LastEditTime: 2021-09-26 15:57:14
 * @FilePath: \rookie-cms\src\router\index.ts
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/catch'
import { firstMenu } from '@/utils/map-menus'
const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/main' },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  { path: '/main', name: 'main', component: () => import('@/views/main/main.vue') }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})
// 路由拦截
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  console.log(firstMenu)
  if (to.path === '/main') {
    return firstMenu.path
  }
})
export default router
