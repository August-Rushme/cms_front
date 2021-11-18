/*
 * @Author: August
 * @Date: 2021-09-26 17:52:33
 * @LastEditors: August
 * @LastEditTime: 2021-11-18 16:11:06
 * @FilePath: \firstfluttere:\rookie-cms\src\router\main\system\user\user.ts
 */
const user = () =>
  import(/*webpackChunkName:"Menu_role_User" */ '@/views/main/system/user/user.vue')
export default {
  path: '/main/system/user',
  name: 'user',
  component: user,
  children: []
}
