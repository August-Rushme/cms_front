<!--
 * @Author: August
 * @Date: 2021-09-26 17:52:33
 * @LastEditors: August
 * @LastEditTime: 2021-09-29 20:49:53
 * @FilePath: \rookie-cms\src\views\main\product\category\category.vue
-->
<template>
  <div class="category">
    <el-card>
      <!-- 搜索 -->
      <page-search pageName="category"></page-search>
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="category"
        @editBtnClick="handleEditData"
        @deleteBtnClick="handleDeleteData"
      >
        <template #handlerHeader>
          <el-button type="primary" size="small" class="el-icon-plus" @click="showAdd">
            添加分类
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
    <!-- 添加对话框 -->
    <div class="au-dialog">
      <el-dialog title="编辑" v-model="dialogVisible" width="30%" @close="clearForm">
        <el-form label-width="100px" v-model="formData">
          <el-form-item label="商品类型">
            <el-input v-model="formData.goodsName" placeholder="请输入商品类型"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="formData.type" placeholder="请输入商品类型"></el-input>
          </el-form-item>
          <el-form-item label="商品地址">
            <el-input v-model="formData.goodsSrc" placeholder="请输入商品地址"></el-input>
          </el-form-item>
          <el-form-item label="品牌">
            <el-input v-model="formData.goodsInfo" placeholder="请输入商品品牌"></el-input>
          </el-form-item>
          <el-form-item label="品牌">
            <el-input v-model="formData.goodsNumber" placeholder="请输入商品库存"></el-input>
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
    <div class="au-dialog">
      <el-dialog title="添加" v-model="dialogVisibleGoods" width="30%" @open="clearForm">
        <el-form label-width="100px" v-model="formGoodsData">
          <el-form-item label="商品名称">
            <el-input v-model="formGoodsData.goodsName" placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="formGoodsData.type" placeholder="请输入商品类型"></el-input>
          </el-form-item>
          <el-form-item label="商品地址">
            <el-input v-model="formGoodsData.goodsSrc" placeholder="请输入商品地址"></el-input>
          </el-form-item>
          <el-form-item label="品牌">
            <el-input v-model="formGoodsData.goodsInfo" placeholder="请输入商品品牌"></el-input>
          </el-form-item>
          <el-form-item label="库存">
            <el-input v-model="formData.goodsNumber" placeholder="请输入商品库存"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisibleGoods = false">取 消</el-button>
            <el-button type="primary" @click="addConfirmHandle">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import PageContent from '@/components/page-content'
import { PageSearch } from '@/components/page-search'
import { contentTableConfig } from './config/content.config'
import { useStore } from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus'
export default defineComponent({
  name: 'category',
  components: { PageContent, PageSearch },
  setup() {
    const pageName = 'category'
    const store = useStore()
    // 编辑
    const formData = ref({
      goodsId: '',
      goodsName: '',
      goodsSrc: '',
      goodsInfo: '',
      goodsNumber: '',
      type: ''
    })
    const dialogVisible = ref(false)
    const handleEditData = (row: any) => {
      dialogVisible.value = true
      formData.value.goodsId = row.goodsId
      formData.value.goodsName = row.goodsName
      formData.value.type = row.type
      formData.value.goodsSrc = row.goodsSrc
      formData.value.goodsInfo = row.goodsInfo
      formData.value.goodsNumber = row.goodsNumber
    }

    const editConfirmHandle = () => {
      dialogVisible.value = false
      store.dispatch('system/editPageDataAction', { formData, pageName })
    }
    //删除
    const handleDeleteData = (row: any) => {
      const id = row.goodsId
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
      console.log(456)
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
    // 添加
    const formGoodsData = ref({
      goodsId: '',
      goodsName: '',
      goodsSrc: '',
      goodsInfo: '',
      goodsNumber: '',
      type: ''
    })
    const dialogVisibleGoods = ref(false)
    const showAdd = () => {
      dialogVisibleGoods.value = true
    }
    const clearForm = () => {
      formGoodsData.value.goodsName = ''
      formGoodsData.value.goodsSrc = ''
      formGoodsData.value.goodsInfo = ''
      formGoodsData.value.type = ''
      formGoodsData.value.goodsNumber = ''
    }

    const addConfirmHandle = async () => {
      formData.value = formGoodsData.value
      dialogVisibleGoods.value = false
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
      handleSizeChange,
      handleCurrentChange,
      pageInfo,
      total,
      editConfirmHandle,
      dialogVisible,
      formData,
      addConfirmHandle,
      clearForm,
      showAdd,
      formGoodsData,
      dialogVisibleGoods
    }
  }
})
</script>

<style scoped></style>
