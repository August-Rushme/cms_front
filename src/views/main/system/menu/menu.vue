<!--
 * @Author: August
 * @Date: 2021-09-14 11:12:23
 * @LastEditors: August
 * @LastEditTime: 2021-09-29 10:49:39
 * @FilePath: \rookie-cms\src\views\main\system\menu\menu.vue
-->
<template>
  <div class="menu">
    <el-card>
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="menu"
        @editBtnClick="handleEditData"
        @deleteBtnClick="handleDeleteData"
      >
        <template #handlerHeader>
          <el-button type="primary" size="small" class="el-icon-plus" @click="addMenuShow">
            添加菜单
          </el-button>
        </template>
      </page-content>
    </el-card>
    <!-- 编辑对话框 -->
    <div class="au-dialog">
      <el-dialog title="编辑" v-model="dialogVisible" width="30%">
        <el-form label-width="100px" v-model="formData">
          <el-form-item label="菜单名称">
            <el-input v-model="formData.name" placeholder="请输入菜单名称"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="formData.type" placeholder="请输入类型"></el-input>
          </el-form-item>
          <el-form-item label="菜单url">
            <el-input v-model="formData.path" placeholder="请输入菜单url"></el-input>
          </el-form-item>
          <el-form-item label="菜单icon">
            <el-input v-model="formData.icon" placeholder="请输入菜单icon"></el-input>
          </el-form-item>
          <el-form-item label="按钮权限">
            <el-input v-model="formData.permission" placeholder="请输入按钮权限"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editConfirmHandle">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!-- 添加菜单的对话框 -->
    <el-dialog title="添加菜单" v-model="dialogVisibleMenu" width="30%" @close="clearForm">
      <el-form label-width="100px" :model="formMenuData" ref="menuFormRef">
        <el-form-item label="菜单名称">
          <el-input v-model="formMenuData.name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单父类">
          <el-input v-model="formMenuData.parentId" placeholder="请输入菜单父类"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="formMenuData.type" placeholder="请输入类型"></el-input>
        </el-form-item>
        <el-form-item label="菜单url">
          <el-input v-model="formMenuData.path" placeholder="请输入菜单url"></el-input>
        </el-form-item>
        <el-form-item label="菜单icon">
          <el-input v-model="formMenuData.icon" placeholder="请输入菜单icon"></el-input>
        </el-form-item>
        <el-form-item label="按钮权限">
          <el-input v-model="formMenuData.permission" placeholder="请输入按钮权限"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleMenu = false">取 消</el-button>
          <el-button type="primary" @click="addConfirmHandle">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
import store from '@/store'
import { ElForm, ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
  name: 'au-menu',
  components: {
    PageContent
  },
  setup() {
    const pageName = 'menu'
    const isShow = ref(false)
    // 编辑
    const formData = ref({
      id: '',
      parentId: 0,
      name: '',
      path: '',
      permission: '',
      type: '',
      icon: ''
    })
    const dialogVisible = ref(false)
    const handleEditData = (row: any) => {
      dialogVisible.value = true
      formData.value.id = row.id
      formData.value.name = row.name
      formData.value.type = row.type
      formData.value.path = row.path
      formData.value.icon = row.icon
      formData.value.permission = row.permission
    }

    const editConfirmHandle = () => {
      dialogVisible.value = false
      store.dispatch('system/editPageDataAction', { formData, pageName })
    }
    // 删除
    const handleDeleteData = (row: any) => {
      const id = row.id
      ElMessageBox.confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await store.dispatch('system/deleteDataAction', { id, pageName })
          if (!res.success) {
            return ElMessage({
              type: 'error',
              message: res.message
            })
          }
          ElMessage({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    // 添加
    const menuFormRef = ref<InstanceType<typeof ElForm>>()
    const formMenuData = ref({
      id: '',
      parentId: 0,
      name: '',
      path: '',
      permission: '',
      type: '',
      icon: ''
    })
    const clearForm = () => {
      formMenuData.value.parentId = 0
      formMenuData.value.name = ''
      formMenuData.value.path = ''
      formMenuData.value.permission = ''
      formMenuData.value.type = ''
      formMenuData.value.icon = ''
    }

    const dialogVisibleMenu = ref(false)
    const addMenuShow = () => {
      menuFormRef.value?.resetFields()
      dialogVisibleMenu.value = true
      isShow.value = true
    }
    const addConfirmHandle = async () => {
      dialogVisibleMenu.value = false
      formData.value = formMenuData.value
      const res = await store.dispatch('system/addAction', { formData, pageName })
      if (!res.success) {
        return ElMessage({
          showClose: true,
          message: '添加失败',
          type: 'error'
        })
      }
      ElMessage({
        showClose: true,
        message: '添加成功',
        type: 'success'
      })
    }
    return {
      contentTableConfig,
      handleEditData,
      handleDeleteData,
      formData,
      dialogVisible,
      editConfirmHandle,
      addMenuShow,
      dialogVisibleMenu,
      addConfirmHandle,
      isShow,
      menuFormRef,
      formMenuData,
      clearForm
    }
  }
})
</script>

<style scoped></style>
