<!--
 * @Author: August
 * @Date: 2021-09-26 14:06:33
 * @LastEditors: August
 * @LastEditTime: 2021-09-28 22:58:54
 * @FilePath: \rookie-cms\src\views\main\system\user\user.vue
-->
<template>
  <div class="user">
    <el-card>
      <!-- 搜索 -->
      <page-search pageName="users"></page-search>
      <!-- 表格内容 -->
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="users"
        @editBtnClick="handleEditData"
        @deleteBtnClick="handleDeleteData"
      >
        <template #handlerHeader>
          <el-button type="primary" size="small" class="el-icon-plus" @click="addUser">
            添加用户
          </el-button>
        </template>
        <template #role="scope">
          <el-button
            icon="el-icon-setting"
            size="mini"
            type="text"
            style="color: #e6a23c"
            @click="handleRoleClick(scope.row)"
          >
            分配角色
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
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" v-model="dialogVisibleRole" width="25%" @close="handleClose">
      <el-select v-model="roleIds" multiple placeholder="Select" style="width: 100%">
        <el-option
          v-for="role in rolesOptions"
          :key="role.value"
          :label="role.name"
          :value="role.value"
        >
          {{ role.name }}
        </el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleRole = false">取 消</el-button>
          <el-button type="primary" @click="handleAssignRole">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑对话框 -->
    <div class="au-dialog">
      <el-dialog title="编辑" v-model="dialogVisible" width="30%">
        <el-form label-width="100px" v-model="formData">
          <el-form-item label="用户名">
            <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="formData.cellphone" placeholder="请输入电话号码"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formData.statuts" placeholder="请选择状态" style="width: 100%">
              <el-option
                v-for="option in options"
                :key="option.title"
                :value="option.value"
                :title="option.title"
              >
                {{ option.title }}
              </el-option>
            </el-select>
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
    <!-- 添加用户 -->
    <el-dialog title="添加用户" v-model="dialogVisibleUser" width="30%">
      <el-form label-width="100px" v-model="formDataUser">
        <el-form-item label="用户名">
          <el-input v-model="formDataUser.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="formDataUser.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="formDataUser.realname" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="formDataUser.cellphone" placeholder="请输入电话号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formDataUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formDataUser.statuts" placeholder="请选择状态" style="width: 100%">
            <el-option
              v-for="option in options"
              :key="option.title"
              :value="option.value"
              :title="option.title"
            >
              {{ option.title }}
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleUser = false">取 消</el-button>
          <el-button type="primary" @click="addUserHandler">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { PageSearch } from '@/components/page-search'
import { contentTableConfig } from './config/content.config'
import PageContent from '@/components/page-content'
import { useStore } from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus'
export default defineComponent({
  name: 'users',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    const pageName = 'users'
    const store = useStore()
    // 编辑
    const dialogVisible = ref(false)
    // 表单数据
    const formData = ref({
      id: 0,
      username: '',
      realname: '',
      cellphone: '',
      statuts: ''
    })
    const options = [
      { title: '启用', value: 'true' },
      { title: '禁用', value: 'false' }
    ]
    const handleEditData = (row: any) => {
      dialogVisible.value = true
      formData.value.id = row.id
      formData.value.username = row.username
      formData.value.realname = row.realname
      formData.value.cellphone = row.cellphone
      formData.value.statuts = row.statuts
    }

    const editConfirmHandle = () => {
      dialogVisible.value = false
      store.dispatch('system/editPageDataAction', { formData, pageName })
    }
    //分配角色
    let userId = 0
    let rolesOptions: any[] = []
    let roleIds = ref<number[]>([])
    const dialogVisibleRole = ref(false)
    const handleRoleClick = async (row: any) => {
      dialogVisibleRole.value = true
      userId = row.id
      const list = await store.dispatch('system/getRoleAction')
      list.forEach((role: any) => {
        rolesOptions.push({ name: role.name, value: role.id })
      })
      row.roles.forEach((role: any) => {
        roleIds.value.push(role.id)
        console.log(roleIds.value)
      })
    }

    const handleAssignRole = async () => {
      dialogVisibleRole.value = false
      const roleIdsLength = roleIds.value.length
      const res = await store.dispatch('system/assignRoleAction', {
        roleIds,
        userId,
        roleIdsLength
      })
      if (!res.success) {
        return ElMessage({
          showClose: true,
          message: '编辑失败',
          type: 'error'
        })
      }
      ElMessage({
        showClose: true,
        message: '编辑成功',
        type: 'success'
      })
      store.dispatch('system/getRoleAction')
    }
    // 关闭时清空选中避免叠加
    const handleClose = () => {
      rolesOptions = []
      roleIds.value = []
    }

    // 添加用户
    const dialogVisibleUser = ref(false)
    const formDataUser = ref({
      username: '',
      realname: '',
      cellphone: '',
      statuts: '',
      email: '',
      password: ''
    })
    const addUser = () => {
      dialogVisibleUser.value = true
    }
    const addUserHandler = async () => {
      dialogVisibleUser.value = false
      const res = await store.dispatch('system/addUserAction', { formDataUser })
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

    // 删除用户
    const handleDeleteData = (row: any) => {
      const id = row.id
      ElMessageBox.confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await store.dispatch('system/deleteDataAction', { id, pageName })
          if (!res.success) {
            return ElMessage({
              type: 'warning',
              message: '删除失败'
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

    // 分页
    const pageInfo = ref({
      pageNum: 1,
      pageSize: 6
    })
    const queryInfo = pageInfo.value
    const total = computed(() => store.getters[`system/pageListCount`](pageName))
    console.log(total.value)
    const handleSizeChange = (pageSize: any) => {
      console.log(`每页 ${pageSize} 条`)
      pageInfo.value.pageSize = pageSize
      console.log(queryInfo)
      store.dispatch('system/getPageListAction', {
        pageName,
        queryInfo
      })
    }
    const handleCurrentChange = (pageNum: any) => {
      console.log(`当前页: ${pageNum}`)
      pageInfo.value.pageNum = pageNum
      console.log(queryInfo)
      store.dispatch('system/getPageListAction', {
        pageName,
        queryInfo
      })
    }
    return {
      contentTableConfig,
      handleEditData,
      dialogVisible,
      formData,
      options,
      editConfirmHandle,
      handleRoleClick,
      dialogVisibleRole,
      roleIds,
      rolesOptions,
      handleAssignRole,
      handleClose,
      addUser,
      formDataUser,
      dialogVisibleUser,
      addUserHandler,
      handleDeleteData,
      handleSizeChange,
      handleCurrentChange,
      total,
      pageInfo
    }
  }
})
</script>

<style scoped></style>
