/*
 * @Author: August
 * @Date: 2021-09-26 14:43:00
 * @LastEditors: August
 * @LastEditTime: 2021-11-18 16:06:04
 * @FilePath: \firstfluttere:\rookie-cms\src\router\main\analysis\dashboard\dashboard.ts
 */

const dashboard = () =>
  import(/*webpackChunkName:"DashBoard" */ '@/views/main/analysis/dashboard/dashboard.vue')
export default {
  path: '/main/analysis/dashboard',
  name: 'dashboard',
  component: dashboard,
  children: []
}
