/*
 * @Author: August
 * @Date: 2021-09-26 14:43:00
 * @LastEditors: August
 * @LastEditTime: 2021-09-26 14:44:45
 * @FilePath: \rookie-cms\src\router\main\message\chat\chat.ts
 */
const chat = () => import('@/views/main/message/chat/chat.vue')
export default {
  path: '/main/story/chat',
  name: 'chat',
  component: chat,
  children: []
}
