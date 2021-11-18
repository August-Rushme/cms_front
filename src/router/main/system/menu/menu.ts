/*
 * @Author: August
 * @Date: 2021-09-26 17:52:33
 * @LastEditors: August
 * @LastEditTime: 2021-11-18 16:11:11
 * @FilePath: \firstfluttere:\rookie-cms\src\router\main\system\menu\menu.ts
 */
const menu = () =>
  import(/*webpackChunkName:"Menu_role_User" */ '@/views/main/system/menu/menu.vue')
export default {
  path: '/main/system/menu',
  name: 'menu',
  component: menu,
  children: []
}
