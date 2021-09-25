<!--
 * @Author: August
 * @Date: 2021-09-25 17:45:51
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 17:58:12
 * @FilePath: \rookie-cms\src\views\login\login.vue
-->
<template>
  <div class="login">
    <login-panel />
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
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
