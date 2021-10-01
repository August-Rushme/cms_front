<!--
 * @Author: August
 * @Date: 2021-09-25 17:48:29
 * @LastEditors: August
 * @LastEditTime: 2021-09-30 12:57:31
 * @FilePath: \rookie-cms\src\views\login\cpns\login-account.vue
-->
<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :model="accountFrom"
      :rules="rules"
      ref="accountFormRef"
      status-icon
    >
      <el-form-item label="账号:" prop="userName">
        <el-input v-model="accountFrom.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="accountFrom.password" type="password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import { rules } from '../config/account-config'
import cache from '@/utils/catch'
export default defineComponent({
  setup() {
    const store = useStore()
    const accountFrom = reactive({
      userName: cache.getCache('userName') ?? '',
      password: cache.getCache('password') ?? ''
    })
    console.log(accountFrom)
    // 表单的实例对象
    const accountFormRef = ref<InstanceType<typeof ElForm>>()
    // 处理登陆
    // debugger
    const loginAction = (isKeepPassword: boolean) => {
      accountFormRef.value?.validate((valid) => {
        if (!valid) {
          return console.log('请输入账号或者密码')
        }

        if (isKeepPassword) {
          // 缓存密码
          cache.setCache('userName', accountFrom.userName)
          if (!cache.getCache('password')) {
            // 如果缓存里面没有就加密
            cache.setCache('password', accountFrom.password)
          }
        } else {
          // 删除缓存
          cache.deleteCache('password')
        }
        // 请求登录,在vuex中处理登录行为
        store.dispatch('login/accountLoginAction', { ...accountFrom })
      })
    }

    return { accountFrom, rules, accountFormRef, loginAction }
  }
})
</script>

<style scoped lang="less"></style>
