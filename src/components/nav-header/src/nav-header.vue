<!--
 * @Author: August
 * @Date: 2021-09-26 14:09:47
 * @LastEditors: August
 * @LastEditTime: 2021-09-26 17:11:42
 * @FilePath: \rookie-cms\src\components\nav-header\src\nav-header.vue
-->
<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      @click="changeFold"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
    ></i>
    <div class="content">
      <au-bread-crumb :breadcrumbs="breadcrumbs"></au-bread-crumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './userInfo.vue'
import { AuBreadCrumb } from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { pathMapBreadCrumb } from '@/utils/map-menus'
export default defineComponent({
  components: {
    UserInfo,
    AuBreadCrumb
  },
  setup(props, { emit }) {
    // 是否折叠
    const isFold = ref(false)
    // 处理折叠
    const changeFold = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    // 面包屑数据:[{name: , path: }]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadCrumb(userMenus, currentPath)
    })
    return {
      isFold,
      changeFold,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
