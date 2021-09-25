/*
 * @Author: August
 * @Date: 2021-09-25 18:04:36
 * @LastEditors: August
 * @LastEditTime: 2021-09-26 00:18:18
 * @FilePath: \rookie-cms\src\store\login\login.ts
 */
import { IAccount } from '@/service/login/types'
import { Module } from 'vuex'
import router from '@/router'
import localCache from '@/utils/catch'
import { Md5 } from 'ts-md5/dist/md5'
import { IRootTypes } from '../rootTypes'
import { ILoginStateType } from './types'
import { loginRequest, requestUserInfo, requestUserMenus } from '@/service/login/http-login'

const loginModule: Module<ILoginStateType, IRootTypes> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, menus: any) {
      state.userMenus = menus
    }
  },
  actions: {
    async accountLoginAction({ commit }, playload: IAccount) {
      const md5 = new Md5()
      if (localCache.getCache('password')) {
        playload.password = localCache.getCache('password')
      }
      playload.password = md5.appendStr('august u can do it').end()
      // 处理登录
      const { data: loginResult } = await loginRequest(playload)
      const { token, id } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      // 请求用户信息
      const { data: userInfoResult } = await requestUserInfo(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      //请求用户菜单
      const { data: userMenusResult } = await requestUserMenus(id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      // 跳到首页
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      // 重新赋值，vuex刷新值会清空
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default loginModule
