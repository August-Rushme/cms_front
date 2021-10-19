/*
 * @Author: August
 * @Date: 2021-09-26 14:18:23
 * @LastEditors: August
 * @LastEditTime: 2021-10-19 10:35:58
 * @FilePath: \vue_shop_servere:\rookie-cms\src\utils\map-menus.ts
 */
import type { RouteRecordRaw } from 'vue-router'
import { IBreadcrumb } from '@/base-ui/breadcrumb/types'
let firstMenu: any = null
// debugger
export function mapMenusToRoutes(userMenus: any[] = []): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  //1. 加载所有路由
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach(async (key) => {
    // const route = await import('../router/main' + key.split('.')[1])
    // allRoutes.push(route.default)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  //2. 根据菜单添加需要的routes
  // type === 1 -> children -> type === 1
  // type === 2 -> url -> route
  // debugger
  const _recurseGetRoute = (menus: any[] = []) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.path)
        if (route) routes.push(route)
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        if (menu.children) {
          _recurseGetRoute(menu.children)
        }
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}
// 面包屑的映射路径
export function pathMapBreadCrumb(userMenus: any[], currentPath: string): IBreadcrumb[] {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenus(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
// 菜单激活的映射路径
export function pathMapToMenus(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  // debugger
  for (const menu of userMenus) {
    if (menu.type === 1) {
      // 递归找到对应的菜单
      const findMenu = pathMapToMenus(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.path === currentPath) {
      return menu
    }
  }
}
// 映射叶子节点
export function menuMapLeafKeys(menuList: any[]) {
  // debugger
  const leftKeys: number[] = []
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children.length > 0) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leftKeys
}

export { firstMenu }
