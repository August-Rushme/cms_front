/*
 * @Author: August
 * @Date: 2021-09-26 14:43:00
 * @LastEditors: August
 * @LastEditTime: 2021-09-26 14:45:57
 * @FilePath: \rookie-cms\src\router\main\message\list\list.ts
 */
const list = () => import('@/views/main/message/list/list.vue')
export default {
  path: '/main/story/list',
  name: 'list',
  component: list,
  children: []
}
