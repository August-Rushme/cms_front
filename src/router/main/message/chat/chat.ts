/*
 * @Author: August
 * @Date: 2021-09-26 14:43:00
 * @LastEditors: August
 * @LastEditTime: 2021-11-18 16:08:45
 * @FilePath: \firstfluttere:\rookie-cms\src\router\main\message\chat\chat.ts
 */
const chat = () => import(/*webpackChunkName:"Chat_List" */ '@/views/main/message/chat/chat.vue')
export default {
  path: '/main/story/chat',
  name: 'chat',
  component: chat,
  children: []
}
