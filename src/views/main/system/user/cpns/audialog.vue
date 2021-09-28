<!--
 * @Author: August
 * @Date: 2021-09-27 17:43:07
 * @LastEditors: August
 * @LastEditTime: 2021-09-27 17:44:14
 * @FilePath: \rookie-cms\src\views\main\system\user\cpns\audialog.vue
-->
<template>
  <div class="au-dialog">
    <el-dialog title="提示" v-model="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
