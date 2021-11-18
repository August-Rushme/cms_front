/*
 * @Author: August
 * @Date: 2021-09-26 17:52:33
 * @LastEditors: August
 * @LastEditTime: 2021-11-18 16:11:02
 * @FilePath: \firstfluttere:\rookie-cms\src\router\main\system\role\role.ts
 */
const role = () =>
  import(/*webpackChunkName:"Menu_role_User" */ '@/views/main/system/role/role.vue')
export default {
  path: '/main/system/role',
  name: 'role',
  component: role,
  children: []
}
