<!--
 * @Author: August
 * @Date: 2021-09-27 09:08:23
 * @LastEditors: August
 * @LastEditTime: 2021-09-28 21:00:21
 * @FilePath: \rookie-cms\src\components\page-search\src\page-search.vue
-->
<template>
  <div class="page-search">
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="handleClear">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
export default defineComponent({
  props: {
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // 搜索表单
    const queryInfo = ref({
      query: '',
      pageNum: 1,
      pageSize: 6,
      pageName: props.pageName
    })
    let pageName = queryInfo.value.pageName
    const store = useStore()
    const search = () => {
      store.dispatch('system/searchPageDataAction', { queryInfo })
    }
    const handleClear = () =>
      store.dispatch('system/getPageListAction', {
        pageName,
        queryInfo: {
          pageNum: 1,
          pageSize: 6
        }
      })
    return {
      queryInfo,
      search,
      handleClear
    }
  }
})
</script>

<style scoped lang="less"></style>
