<!--
 * @Author: August
 * @Date: 2021-09-26 17:52:33
 * @LastEditors: August
 * @LastEditTime: 2021-09-30 00:40:28
 * @FilePath: \rookie-cms\src\views\main\message\chat\chat.vue
-->
<template>
  <div class="chats">
    <div id="chat"></div>
    <el-button type="primary" class="submitButton" :plain="true" @click="submit">{{
      submitText
    }}</el-button>
  </div>
</template>
<script>
import { defineComponent, onMounted, getCurrentInstance, ref } from 'vue'
import E from 'wangeditor'
import { useStore } from '@/store'
import localCache from '@/utils/catch'
export default defineComponent({
  setup() {
    const store = useStore()
    const instance = getCurrentInstance()
    onMounted(() => {
      const editor = new E('#chat')
      editor.config.height = 500
      editor.create()
      instance.editor = editor
      let pelement = document.querySelector('.w-e-text > p')
      pelement.style.textAlign = 'left'
    })
    let submitText = ref('提交')
    const submit = () => {
      //提交时获取表单内容
      let content = instance.editor.txt.text()
      const contentForm = {
        userName: localCache.getCache('userName'),
        userId: localCache.getCache('userId'),
        userMessage: content,
        praiseCount: 0
      }
      store.dispatch('message/addMessageDataAction', { contentForm })
      //清空表单并把光标定在左边
      instance.editor.txt.clear()
      let pelement = document.querySelector('.w-e-text > p')
      pelement.style.textAlign = 'left'
    }
    return {
      submitText,
      submit
    }
  }
})
</script>

<style scoped>
#chat {
  width: 100%;
}
.submitButton {
  position: absolute;
  width: 100px;
  font-size: 18px;
  margin-top: 50px;
  margin-left: -50px;
}
</style>
