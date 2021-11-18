/*
 * @Author: August
 * @Date: 2021-09-26 14:43:00
 * @LastEditors: August
 * @LastEditTime: 2021-11-18 16:10:20
 * @FilePath: \firstfluttere:\rookie-cms\src\router\main\message\list\list.ts
 */
const list = () => import(/*webpackChunkName:"Chat_List" */ '@/views/main/message/list/list.vue')
export default {
  path: '/main/story/list',
  name: 'list',
  component: list,
  children: []
}
