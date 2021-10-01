/*
 * @Author: August
 * @Date: 2021-09-25 18:04:36
 * @LastEditors: August
 * @LastEditTime: 2021-09-30 14:35:05
 * @FilePath: \rookie-cms\src\store\login\login.ts
 */
import { IAccount } from '@/service/login/types'
import { Module } from 'vuex'
import router from '@/router'
import localCache from '@/utils/catch'
import { Md5 } from 'ts-md5/dist/md5'
import { IRootTypes } from '../types'
import { ILoginStateType } from './types'
import { loginRequest, requestUserInfo, requestUserMenus } from '@/service/login/http-login'
import { mapMenusToRoutes } from '@/utils/map-menus'

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
    changeUserMenus(state, userMenus: any) {
      // debugger
      state.userMenus = userMenus
      // 注册动态路由
      // mapMenusToRoutes(userMenus)
      const routes = mapMenusToRoutes(userMenus)
      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },
  actions: {
    async accountLoginAction({ commit }, playload: IAccount) {
      playload.password = Md5.hashStr(playload.password + '')
      // 处理登录
      const { data: loginResult } = await loginRequest(playload)
      const { token, id } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      localCache.setCache('userId', id)
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
