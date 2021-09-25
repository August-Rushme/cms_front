/*
 * @Author: August
 * @Date: 2021-09-24 16:43:33
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 20:07:36
 * @FilePath: \rookie-cms\src\store\index.ts
 */
import { createStore } from 'vuex'
import { IRootTypes } from './rootTypes'
import login from './login/login'
const store = createStore<IRootTypes>({
  state() {
    return {
      name: 'august',
      age: 18
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    login
  }
})
export function setupStore(): void {
  store.dispatch('login/loadLocalLogin')
}
export default store
