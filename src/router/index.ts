/*
 * @Author: August
 * @Date: 2021-09-24 16:36:12
 * @LastEditors: August
 * @LastEditTime: 2021-11-18 16:03:41
 * @FilePath: \firstfluttere:\rookie-cms\src\router\index.ts
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/catch'
import { firstMenu } from '@/utils/map-menus'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import(/*webpackChunkName:"Login_Home_Main" */ '@/views/home/home.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import(/*webpackChunkName:"Login_Home_Main" */ '@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/*webpackChunkName:"Login_Home_Main" */ '@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
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
  if (to.path === '/main') {
    return firstMenu.path
  }
})
export default router
