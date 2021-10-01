/*
 * @Author: August
 * @Date: 2021-09-29 22:01:22
 * @LastEditors: August
 * @LastEditTime: 2021-09-30 00:41:36
 * @FilePath: \rookie-cms\src\store\main\message\messge.ts
 */
import { Module } from 'vuex'
import { IRootTypes } from '@/store/types'
import { IMessageState } from './type'
import {
  addMessagePageData,
  deleteMessagePageData,
  editMessagePageData,
  getMessageData
} from '@/service/main/message/http-message'
import { ElMessage } from 'element-plus'
const messageModule: Module<IMessageState, IRootTypes> = {
  namespaced: true,
  state() {
    return {
      messageList: [],
      messageCount: 0
    }
  },
  mutations: {
    changeMessageList(state, messageList: any) {
      state.messageList = messageList
    },
    changeMessageCount(state, total: any) {
      state.messageCount = total
    }
  },
  getters: {
    messageListData(state) {
      return state.messageList
    },
    messageListCount(state) {
      return state.messageCount
    }
  },
  actions: {
    async getMessageListAction({ commit }, payload: any) {
      const pageUrl = '/api/v1/message/list'
      const queryInfo = payload.pageInfo.value
      const { data: res } = await getMessageData(pageUrl, queryInfo)
      const { total, list } = res.data
      commit('changeMessageList', list)
      commit('changeMessageCount', total)
      return res.data
    },
    // 删除
    async deleteDataAction({ dispatch }, payload: any) {
      const { id, pageInfo } = payload
      const pageUrl = '/api/v1/message/delete/' + id
      const { data: res } = await deleteMessagePageData(pageUrl)
      // 2.请求最新的数据
      dispatch('getMessageListAction', {
        pageInfo
      })
      return res
    },
    //编辑
    async editMessageDataAction({ dispatch }, payload: any) {
      const { editInfo, pageInfo } = payload
      const pageUrl = '/api/v1/message/update'
      await editMessagePageData(pageUrl, editInfo)
      // 2.请求最新的数据
      dispatch('getMessageListAction', {
        pageInfo
      })
    },
    // 添加
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async addMessageDataAction({ dispatch }, payload: any) {
      const { contentForm } = payload
      const pageUrl = '/api/v1/message/save'
      const { data: res } = await addMessagePageData(pageUrl, contentForm)
      if (!res.success) {
        return ElMessage({
          showClose: true,
          message: '提交失败，请稍后重试',
          type: 'error'
        })
      }
      ElMessage({
        showClose: true,
        message: '提交成功',
        type: 'success'
      })
    }
  }
}
export default messageModule
