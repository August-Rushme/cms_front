<!--
 * @Author: August
 * @Date: 2021-09-26 17:52:33
 * @LastEditors: August
 * @LastEditTime: 2021-09-29 18:19:10
 * @FilePath: \rookie-cms\src\views\main\system\role\role.vue
-->
<template>
  <div class="role">
    <el-card>
      <!-- 搜索 -->
      <page-search pageName="role"></page-search>
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="role"
        @editBtnClick="handleEditData"
        @deleteBtnClick="handleDeleteData"
        ><template #handlerHeader>
          <el-button type="primary" size="small" class="el-icon-plus" @click="addShow">
            添加角色
          </el-button>
        </template>
        <template #role="scope">
          <el-button
            icon="el-icon-setting"
            size="mini"
            type="text"
            style="color: #e6a23c"
            @click="handlePermClick(scope.row)"
          >
            分配权限
          </el-button>
        </template>
      </page-content>
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.pageNum"
          :page-sizes="[6, 8, 10, 12]"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
    <!-- 编辑 -->
    <el-dialog title="编辑" v-model="dialogVisible" width="30%">
      <el-form label-width="100px" :model="formData">
        <el-form-item label="角色名称">
          <el-input v-model="formData.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色标识">
          <el-input v-model="formData.code" placeholder="请输入角色标识"></el-input>
        </el-form-item>
        <el-form-item label="权限介绍">
          <el-input v-model="formData.remark" placeholder="请输入权限介绍"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editConfirmHandle">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加 -->
    <el-dialog title="添加" v-model="dialogVisibleRole" width="30%" @open="clearForm">
      <el-form label-width="100px" :model="formData">
        <el-form-item label="角色名称">
          <el-input v-model="formData.name" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色标识">
          <el-input v-model="formData.code" placeholder="请输入角色标识"></el-input>
        </el-form-item>
        <el-form-item label="权限介绍">
          <el-input v-model="formData.remark" placeholder="请输入权限介绍"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleRole = false">取 消</el-button>
          <el-button type="primary" @click="addConfirmHandle">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog title="添加" v-model="dialogVisiblePerm" width="30%">
      <el-tree
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      >
      </el-tree>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisiblePerm = false">取 消</el-button>
          <el-button type="primary" @click="assignConfirmHandle">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import PageContent from '@/components/page-content'
import { PageSearch } from '@/components/page-search'
import { contentTableConfig } from './config/content.config'
import { useStore } from '@/store'
import localCache from '@/utils/catch'
import { ElMessage, ElMessageBox } from 'element-plus'
export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch
  },
  setup() {
    const store = useStore()
    const pageName = 'role'
    // 编辑
    const dialogVisible = ref(false)
    const formData = ref({
      id: '',
      name: '',
      code: '',
      remark: ''
    })
    // 编辑
    const handleEditData = (row: any) => {
      dialogVisible.value = true
      formData.value.id = row.id
      formData.value.name = row.name
      formData.value.code = row.code
      formData.value.remark = row.remark
      console.log(123)
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
    const dialogVisibleRole = ref(false)
    const addShow = () => {
      dialogVisibleRole.value = true
    }
    const clearForm = () => {
      formData.value.name = ''
      formData.value.code = ''
      formData.value.remark = ''
    }
    const addConfirmHandle = async () => {
      dialogVisibleRole.value = false
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
    // 分页
    const pageInfo = ref({
      pageNum: 1,
      pageSize: 6
    })
    const queryInfo = pageInfo.value
    const total = computed(() => store.getters[`system/pageListCount`](pageName))
    const handleSizeChange = (pageSize: any) => {
      pageInfo.value.pageSize = pageSize
      store.dispatch('system/getPageListAction', {
        pageName,
        queryInfo
      })
    }
    const handleCurrentChange = (pageNum: any) => {
      pageInfo.value.pageNum = pageNum
      store.dispatch('system/getPageListAction', {
        pageName,
        queryInfo
      })
    }

    // 分配权限

    // let rolesOptions: any[] = []
    // let roleIds = ref<number[]>([])
    const dialogVisiblePerm = ref(false)
    let dataList = ref<any[]>([])
    store.dispatch('system/getPageListAction', { pageName: 'menu' })
    const menus = computed(() => store.state.system.menuList)
    let roleId = 0
    const handlePermClick = async (row: any) => {
      dialogVisiblePerm.value = true
      const userId = localCache.getCache('userId')
      const menuList = await store.dispatch('system/getUserMenuAction', { userId })
      menuList.forEach((item: any) => {
        dataList.value.push(item)
      })
      roleId = row.id
      console.log(roleId)
    }

    const menuIds = ref<any[]>([])
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      menuIds.value = menuList
    }

    const assignConfirmHandle = async () => {
      const res = await store.dispatch('system/assignMenuAction', { roleId, menuIds })
      dialogVisiblePerm.value = false
      if (!res.success) {
        return ElMessage({
          showClose: true,
          message: '分配权限失败',
          type: 'error'
        })
      }
      ElMessage({
        showClose: true,
        message: '分配权限成功',
        type: 'success'
      })
    }
    return {
      contentTableConfig,
      handleDeleteData,
      handleEditData,
      formData,
      dialogVisible,
      editConfirmHandle,
      addConfirmHandle,
      addShow,
      dialogVisibleRole,
      clearForm,
      handleSizeChange,
      handleCurrentChange,
      pageInfo,
      total,
      dialogVisiblePerm,
      handlePermClick,
      assignConfirmHandle,
      dataList,
      menus,
      handleCheckChange
    }
  }
})
</script>

<style scoped></style>
