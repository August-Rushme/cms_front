<!--
 * @Author: August
 * @Date: 2021-09-26 17:01:49
 * @LastEditors: August
 * @LastEditTime: 2021-09-26 17:30:57
 * @FilePath: \rookie-cms\src\components\nav-header\src\userInfo.vue
-->
<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span class="username">{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-circle-close" @click="loginOut"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import localCache from '@/utils/catch'
import router from '@/router'
export default defineComponent({
  setup() {
    const name = localCache.getCache('userName')
    const loginOut = () => {
      router.push('/login')
    }
    return {
      name,
      loginOut
    }
  }
})
</script>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  .username {
    margin-left: 5px;
  }
}
</style>
