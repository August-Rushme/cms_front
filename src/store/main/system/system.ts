/*
 * @Author: August
 * @Date: 2021-09-27 11:08:21
 * @LastEditors: August
 * @LastEditTime: 2021-09-29 21:04:28
 * @FilePath: \rookie-cms\src\store\main\system\system.ts
 */
import { Module } from 'vuex'
import { IRootTypes } from '@/store/types'
import { ISystemState } from './types'
import { ElMessage } from 'element-plus'
import {
  assignRoleData,
  deletePageData,
  editPageData,
  getPageListData,
  getRoleData,
  searchPageData
} from '@/service/main/system/http-system'
import { requestUserMenus } from '@/service/login/http-login'
const systemModule: Module<ISystemState, IRootTypes> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      menuList: [],
      menuCount: 0,
      userMenus: [],
      categoryList: [],
      categoryCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },
    changeUsersCount(state, total: number) {
      state.usersCount = total
    },
    changeMenuList(state, menusList: any[]) {
      state.menuList = menusList
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, total: number) {
      state.roleCount = total
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    },
    changeCategoryList(state, goods: any) {
      state.categoryList = goods
    },
    changeCategoryCount(state, total: number) {
      state.categoryCount = total
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    // 获取表格数据
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      const { queryInfo } = payload
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = '/api/v1/user/list'
          break
        case 'menu':
          pageUrl = '/api/v1/menu/menusList'
          break
        case 'role':
          pageUrl = '/api/v1/role/list'
          break
        case 'category':
          pageUrl = '/api/v1/goods/list/sort'
          break
      }
      // 2.对页面发送请求
      const { data: pageResult } = await getPageListData(pageUrl, queryInfo)
      console.log(pageResult)
      // 3.将数据存储到state中
      if (pageName === 'users' || pageName === 'role' || pageName === 'category') {
        const { list, total } = pageResult.data
        const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
        commit(`change${changePageName}List`, list)
        commit(`change${changePageName}Count`, total)
      }
      if (pageName === 'menu') {
        pageResult.data
        const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
        commit(`change${changePageName}List`, pageResult.data)
      }
    },
    // 编辑
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, formData } = payload
      const editData = formData.value

      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = '/api/v1/user/update'
          break
        case 'menu':
          pageUrl = '/api/v1/menu/update'
          break
        case 'role':
          pageUrl = '/api/v1/role/update'
          break
        case 'category':
          pageUrl = '/api/v1/goods/update'
          break
      }
      // const pageUrl = `/${pageName}/${id}`
      const { data: res } = await editPageData(pageUrl, editData)
      if (!res.success) {
        return ElMessage({
          showClose: true,
          message: '编辑失败',
          type: 'error'
        })
      }
      ElMessage({
        showClose: true,
        message: '编辑成功',
        type: 'success'
      })
      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          pageNum: 1,
          pageSize: 6
        }
      })
    },
    // 搜索
    async searchPageDataAction({ commit }, payload: any) {
      const { queryInfo } = payload
      const pageName = queryInfo.value.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = '/api/v1/user/list/search'
          break
        case 'role':
          pageUrl = '/api/v1/role/list/search'
          break
        case 'category':
          pageUrl = '/api/v1/goods/list/sort/search'
          break
      }
      // const pageUrl = `/${pageName}/${id}`
      const { data: pageResult } = await searchPageData(pageUrl, queryInfo.value)
      // console.log(pageResult)
      // 2.请求最新的数据
      const { list, total } = pageResult.data

      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, total)
    },
    // 获取全部角色
    async getRoleAction(queryInfo) {
      const pageUrl = '/api/v1/role/list'
      const { data: roleListResult } = await getRoleData(pageUrl, queryInfo)
      const { list } = roleListResult.data
      return list
    },
    // 分配角色
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async assignRoleAction({ commit }, payload: any) {
      const { userId, roleIdsLength } = payload
      const roleIds: any[] = []
      for (let i = 0; i < roleIdsLength; i++) {
        roleIds.push(payload.roleIds.value[i])
      }
      const pageUrl = '/api/v1/user/role/' + userId
      const { data: res } = await assignRoleData(pageUrl, { roleIds: roleIds })
      return res
    },
    // 添加用户
    async addUserAction({ dispatch }, payload: any) {
      const pageUrl = '/api/v1/user/save'
      const { formDataUser } = payload
      const { data: res } = await assignRoleData(pageUrl, formDataUser.value)
      const pageName = 'users'
      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          query: '',
          pageNum: 1,
          pageSize: 6
        }
      })
      return res
    },
    // delete
    async deleteDataAction({ dispatch }, payload: any) {
      // 1.获取pageUrl
      const { pageName, id } = payload
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = '/api/v1/user/delete/' + id
          break
        case 'menu':
          pageUrl = '/api/v1/menu/delete/' + id
          break
        case 'role':
          pageUrl = '/api/v1/role/delete/' + id
          break
        case 'category':
          pageUrl = '/api/v1/goods/delete/' + id
          break
      }
      const { data: res } = await deletePageData(pageUrl)
      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          query: '',
          pageNum: 1,
          pageSize: 6
        }
      })
      return res
    },
    // 添加菜单
    async addAction({ dispatch }, payload: any) {
      const { pageName, formData } = payload
      console.log(pageName, formData)
      let pageUrl = ''
      switch (pageName) {
        case 'menu':
          pageUrl = '/api/v1/menu/save'
          break
        case 'role':
          pageUrl = '/api/v1/role/save'
          break
        case 'category':
          pageUrl = '/api/v1/goods/save'
          break
      }
      const { data: res } = await assignRoleData(pageUrl, formData.value)
      console.log(pageName)
      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          query: '',
          pageNum: 1,
          pageSize: 6
        }
      })
      return res
    },
    // 获取用户的菜单
    async getUserMenuAction({ commit }, payload: any) {
      const { userId } = payload
      const { data: userMenusResult } = await requestUserMenus(userId)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      return userMenus
    },

    // 分配权限
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async assignMenuAction({ commit }, payload: any) {
      const { roleId } = payload
      const menuIds = { menuIds: payload.menuIds.value }
      const pageUrl = '/api/v1/role/perm/' + roleId
      const { data: res } = await assignRoleData(pageUrl, menuIds)
      return res
    }
  }
}

export default systemModule
