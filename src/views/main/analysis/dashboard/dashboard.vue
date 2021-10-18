<!--
 * @Author: August
 * @Date: 2021-09-26 17:52:33
 * @LastEditors: August
 * @LastEditTime: 2021-10-19 01:47:38
 * @FilePath: \vue_shop_servere:\rookie-cms\src\views\main\analysis\dashboard\dashboard.vue
-->
<template>
  <div class="dashboards">
    <div class="dashboard">
      <div class="Info">
        <div class="content">
          <h2>商品统计面板</h2>
          <p>欢迎回来，我们非常想念您！ 👋</p>
        </div>
      </div>
      <div class="date">
        <i class="el-icon-date"></i>
        <div class="dateInfo">今天：{{ currentTime }}</div>
      </div>
    </div>
    <echatsPanel />
    <bottomMap />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import echatsPanel from './cpns/echarts-panel.vue'
import bottomMap from './cpns/Map.vue'
import { currentDateTime } from '@/utils/date-format'
export default defineComponent({
  components: {
    echatsPanel,
    bottomMap
  },
  setup() {
    const timestamp = new Date().getTime()
    const currentTime = ref()
    currentTime.value = currentDateTime(timestamp)
    return {
      currentTime
    }
  }
})
</script>

<style scoped lang="less">
.dashboard {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  border-bottom: gray 1px solid;
  .content {
    margin-left: -30px;
  }
  p {
    text-indent: 5em;
    font-family: '微软雅黑';
    font-weight: 400;
    font-size: 0.928571rem;
    line-height: 1.75;
  }
  .date {
    display: flex;
    margin-right: 10px;
    margin-top: 25px;
    justify-content: space-between;
    width: 160px;
    height: 50px;
    i {
      font-size: 20px;
      color: #376fd0;
      padding-top: 10px;
    }
    .dateInfo {
      background-color: #4782da;
      font-size: 14px;
      color: #ffffff;
      line-height: 40px;
      height: 40px;
      width: 130px;
      border-radius: 4px;
    }
    .dateInfo:hover {
      background-color: #315b98;
    }
  }
}
</style>
