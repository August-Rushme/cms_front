<!--
 * @Author: August
 * @Date: 2021-09-27 11:14:55
 * @LastEditors: August
 * @LastEditTime: 2021-10-01 15:30:02
 * @FilePath: \rookie-cms\src\components\page-content\src\page-content.vue
-->
<template>
  <div class="page-content">
    <au-table :listData="dataList" v-bind="contentTableConfig">
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <slot name="handlerHeader"></slot>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button plain size="mini" :type="scope.row.statuts == 'true' ? 'success' : 'danger'">
          {{ scope.row.statuts == 'true' ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createdat) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updatedat) }}</span>
      </template>
      <template #created="scope">
        <span>{{ $filters.formatTime(scope.row.created) }}</span>
      </template>
      <template #updated="scope">
        <span>{{ $filters.formatTime(scope.row.updated) }}</span>
      </template>

      <template #picture="scope">
        <el-image style="width: 70px; height: 70px" :src="scope.row.goodsImg" alt=""></el-image>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <slot name="role" :row="scope.row"> </slot>
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            style="color: red"
            @click="handledeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
    </au-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { AuTable } from '@/base-ui/table'
export default defineComponent({
  components: {
    AuTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick', 'deleteBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    const pageInfo = ref({
      query: '',
      pageNum: 1,
      pageSize: 6
    })
    const pageName = ref(props.pageName)
    const queryInfo = pageInfo.value
    // 2.发送网络请求
    const getPageData = (queryInfo: any, pageName: any) => {
      store.dispatch('system/getPageListAction', { queryInfo, pageName })
    }
    getPageData(queryInfo, pageName.value)

    // 3.从vuex中获取数据
    const dataList = computed(() => store.getters[`system/pageListData`](props.pageName))
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    const handledeleteClick = (item: any) => {
      emit('deleteBtnClick', item)
    }
    return {
      handleEditClick,
      dataList,
      handledeleteClick
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
}
</style>
