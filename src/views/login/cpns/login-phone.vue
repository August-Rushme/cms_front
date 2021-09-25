<!--
 * @Author: August
 * @Date: 2021-09-25 17:56:42
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 17:56:53
 * @FilePath: \rookie-cms\src\views\login\cpns\login-phone.vue
-->
<template>
  <div class="login-iphone">
    <el-form label-width="60px" :model="phone" status-icon>
      <el-form-item label="手机号:">
        <el-input v-model="phone.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="验证码:">
        <div class="get-code">
          <el-input v-model="phone.checkCode"></el-input>
          <el-button type="primary" class="code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const phone = reactive({
      phoneNumber: '',
      checkCode: ''
    })
    return {
      phone
    }
  }
})
</script>

<style scoped lang="less">
.login-iphone {
  .get-code {
    display: flex;
    .code-btn {
      margin-left: 8px;
    }
  }
}
</style>
