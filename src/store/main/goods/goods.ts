/*
 * @Author: August
 * @Date: 2021-09-29 21:40:36
 * @LastEditors: August
 * @LastEditTime: 2021-09-30 00:51:59
 * @FilePath: \rookie-cms\src\store\main\goods\goods.ts
 */
import { Module } from 'vuex'
import { IRootTypes } from '@/store/types'
import { IGoodsState } from './type'
const messageModule: Module<IGoodsState, IRootTypes> = {
  namespaced: true,
  state() {
    return {
      goodList: [],
      goodCount: 0
    }
  },
  mutations: {},
  getters: {},
  actions: {}
}
export default messageModule
