<!--
 * @Author: August
 * @Date: 2021-09-26 17:52:33
 * @LastEditors: August
 * @LastEditTime: 2021-09-30 15:21:10
 * @FilePath: \rookie-cms\src\views\main\product\goods\goods.vue
-->
<template>
  <div class="goods">
    <el-card>
      <!-- 搜索 -->
      <page-search pageName="good"></page-search>
      <page-content
        :contentTableConfig="contentTableConfig"
        pageName="good"
        @editBtnClick="handleEditData"
        @deleteBtnClick="handleDeleteData"
        ><template #handlerHeader>
          <el-button type="primary" size="small" class="el-icon-plus" @click="showDialog">
            添加商品
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
    <el-dialog title="编辑" v-model="dialogVisible" width="35%">
      <el-form label-width="100px" :model="formData">
        <el-form-item label="商品名称">
          <el-input v-model="formData.goodsName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="商品品牌">
          <el-input v-model="formData.goodsInfo" placeholder="请输入商品品牌"></el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="formData.goodsNumber" placeholder="请输入商品库存"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="formData.goodsPriceNew" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-input v-model="formData.type" placeholder="请输入商品类型"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :on-change="handleChange"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <template #tip>
              <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editConfirmHandle">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 添加商品 -->
    <el-dialog title="添加商品" v-model="dialogVisibleGoods" width="35%" @open="clearForm">
      <el-form label-width="100px" :model="formData">
        <el-form-item label="商品名称">
          <el-input v-model="formData.goodsName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="商品品牌">
          <el-input v-model="formData.goodsInfo" placeholder="请输入商品品牌"></el-input>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input v-model="formData.goodsNumber" placeholder="请输入商品库存"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="formData.goodsPriceNew" placeholder="请输入商品价格"></el-input>
        </el-form-item>
        <el-form-item label="商品类型">
          <el-input v-model="formData.type" placeholder="请输入商品类型"></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :on-change="handleChange"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <template #tip>
              <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleGoods = false">取 消</el-button>
          <el-button type="primary" @click="addGoodsConfirmHandle">确 定</el-button>
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
  components: { PageSearch, PageContent },
  setup() {
    const store = useStore()
    const pageName = 'good'
    // 编辑
    const dialogVisible = ref(false)
    const formData = ref({
      goodsId: '',
      goodsName: '',
      goodsSrc: '',
      goodsInfo: '',
      goodsNumber: '',
      goodsPriceNew: '',
      type: '',
      goodsImg: ''
    })
    const handleEditData = (row: any) => {
      dialogVisible.value = true
      formData.value.goodsId = row.goodsId
      formData.value.goodsName = row.goodsName
      formData.value.goodsSrc = row.goodsSrc
      formData.value.goodsInfo = row.goodsInfo
      formData.value.goodsNumber = row.goodsNumber
      formData.value.goodsPriceNew = row.goodsPriceNew
      formData.value.type = row.type
    }
    //上传图片
    const handleChange = (file: any) => {
      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function (): void {
        // base64码
        formData.value.goodsImg = reader.result as string
      }
    }

    const editConfirmHandle = () => {
      dialogVisible.value = false
      store.dispatch('system/editPageDataAction', { formData, pageName })
    }
    const handleDeleteData = (row: any) => {
      const id = row.goodsId
      ElMessageBox.confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await store.dispatch('system/deleteDataAction', { id, pageName, pageInfo })
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
    const dialogVisibleGoods = ref(false)
    const clearForm = () => {
      formData.value.goodsId = ''
      formData.value.goodsName = ''
      formData.value.goodsSrc = ''
      formData.value.goodsInfo = ''
      formData.value.goodsNumber = ''
      formData.value.goodsPriceNew = ''
      formData.value.type = ''
    }
    const showDialog = () => {
      dialogVisibleGoods.value = true
    }
    const addGoodsConfirmHandle = async () => {
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
    return {
      contentTableConfig,
      handleEditData,
      handleDeleteData,
      dialogVisible,
      formData,
      editConfirmHandle,
      handleChange,
      showDialog,
      dialogVisibleGoods,
      clearForm,
      addGoodsConfirmHandle,
      total,
      handleSizeChange,
      handleCurrentChange,
      pageInfo
    }
  }
})
</script>

<style scoped></style>
