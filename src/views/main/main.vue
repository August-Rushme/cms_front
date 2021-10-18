<!--
 * @Author: August
 * @Date: 2021-09-25 19:34:50
 * @LastEditors: August
 * @LastEditTime: 2021-10-18 16:00:14
 * @FilePath: \vue3-ts-cmse:\rookie-cms\src\views\main\main.vue
-->
<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollpased ? '60px' : '210px'">
        <nav-menu :isCollpased="isCollpased"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange"></nav-header>
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NavMenu } from '@/components/nav-menus'
import { NavHeader } from '@/components/nav-header'
export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup() {
    // 是否折叠
    const isCollpased = ref(false)
    // 处理折叠
    const handleFoldChange = (isFold: boolean) => {
      isCollpased.value = isFold
    }
    return {
      isCollpased,
      handleFoldChange
    }
  }
})
</script>

<style scoped lang="less">
.main {
  top: 0;
  left: 0;

  height: 100%;
  background-color: f5f5f5;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .page-info {
    background-color: #fff;
    border-radius: 5px;
  }
}

.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 48px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
