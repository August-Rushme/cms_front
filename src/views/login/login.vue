<!--
 * @Author: August
 * @Date: 2021-09-25 17:45:51
 * @LastEditors: August
 * @LastEditTime: 2021-10-18 15:53:54
 * @FilePath: \vue3-ts-cmse:\rookie-cms\src\views\login\login.vue
-->
<template>
  <div class="bg">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../../assets/img/logo.svg" alt="" />
      </div>

      <div class="login">
        <login-panel />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import LoginPanel from './cpns/login-panel.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.bg {
  width: 100%;
  height: 100vh;
  background-position: center center;

  background-size: 100% 100%;
  overflow: auto;

  .login_box {
    width: 450px;
    height: 400px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .avatar_box {
      height: 120px;
      width: 120px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;

        background-color: #eee;
      }
    }
  }

  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
