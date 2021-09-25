<!--
 * @Author: August
 * @Date: 2021-09-25 17:57:09
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 20:40:55
 * @FilePath: \rookie-cms\src\views\login\cpns\login-panel.vue
-->
<template>
  <div class="login-panel">
    <h2 class="title">ROOKIE CMS</h2>
    <el-tabs type="border-card" stretch v-model="activeName">
      <el-tab-pane name="username">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登陆</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="second">
        <template #label>
          <span> <i class="el-icon-mobile-phone"></i>手机号登陆 </span>
        </template>
        <login-iphone></login-iphone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>

    <el-button class="login-btn" type="primary" @click="handleLogin">立即登陆</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginIphone from './login-phone.vue'
export default defineComponent({
  components: { LoginAccount, LoginIphone },
  setup() {
    //当前的选项卡
    const activeName = ref('username')
    // login-account组件的实例
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const isKeepPassword = ref(true)
    // 调用不同的登陆方法
    const handleLogin = () => {
      accountRef.value?.loginAction(isKeepPassword.value)
    }
    return {
      activeName,
      accountRef,
      handleLogin,
      isKeepPassword
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 380px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
