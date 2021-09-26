<!--
 * @Author: August
 * @Date: 2021-09-26 16:09:02
 * @LastEditors: August
 * @LastEditTime: 2021-09-26 17:50:14
 * @FilePath: \rookie-cms\src\base-ui\breadcrumb\src\breadcrumb.vue
-->
<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: '/' }">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumb } from '../types'
export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
