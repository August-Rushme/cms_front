/*
 * @Author: August
 * @Date: 2021-09-24 16:36:12
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 20:24:43
 * @FilePath: \rookie-cms\src\router\index.ts
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/catch'
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
})
export default router
