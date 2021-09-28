/*
 * @Author: August
 * @Date: 2021-09-24 16:43:33
 * @LastEditors: August
 * @LastEditTime: 2021-09-27 14:32:59
 * @FilePath: \rookie-cms\src\store\index.ts
 */
import { createStore, Store } from 'vuex'
import { useStore as useVuexStore } from 'vuex'
import { IRootTypes, IStoreType } from './types'
import login from './login/login'
import system from './main/system/system'
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
    login,
    system
  }
})
export function setupStore(): void {
  store.dispatch('login/loadLocalLogin')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
