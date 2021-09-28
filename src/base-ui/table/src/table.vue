<!--
 * @Author: August
 * @Date: 2021-09-27 10:53:48
 * @LastEditors: August
 * @LastEditTime: 2021-09-28 18:16:07
 * @FilePath: \rookie-cms\src\base-ui\table\src\table.vue
-->
<template>
  <div class="au-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="listData" border style="width: 100%">
      <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    propList: {
      type: Array,
      required: true
    },
    listData: {
      type: Array,
      required: true
    },
    page: {
      type: Object,
      default: () => ({ pageNum: 1, pageSize: 4 })
    }
  },
  setup() {
    const queryInfo = ref({
      query: '',
      pageNum: 1,
      pageSize: 4
    })
    return {
      queryInfo
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
