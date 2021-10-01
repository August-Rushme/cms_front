<template>
  <div class="container">
    <el-card class="visitors">
      <div class="VstInfo">
        <h6>使用人数</h6>
        <div class="VisCount">
          <vue3-autocounter
            ref="counter"
            :startAmount="0"
            :endAmount="8888"
            :duration="1.2"
            :autoinit="true"
          />
        </div>
        <div class="vInfoBootom"><span>+14%</span></div>
        <div class="visDate">距离上周以来</div>
      </div>
    </el-card>
    <el-card class="sales">
      <div class="slInfo">
        <h6>销售量</h6>
        <div class="slTag">日计算</div>
        <div class="slCount">
          <vue3-autocounter
            ref="counter"
            :startAmount="0"
            :endAmount="countData.goodsSale"
            :duration="1.2"
            :autoinit="true"
          />
        </div>
        <div class="slInfoBootom"><span>-12%</span></div>
        <div class="slDate">距离上周以来</div>
      </div>
    </el-card>
    <el-card id="salesecharts" class="salesmap"> </el-card>
    <el-card class="sales">
      <div class="slInfo">
        <h6>商品量</h6>
        <div class="slTag">月计算</div>
        <div class="slCount">
          <vue3-autocounter
            ref="counter"
            :startAmount="0"
            :endAmount="countData.goodsCount"
            :duration="1.2"
            :autoinit="true"
          />
        </div>
        <div class="slInfoBootom"><span>-8%</span></div>
        <div class="slDate">距离上周以来</div>
      </div></el-card
    >
    <el-card class="goodsPrice">
      <div class="goodsInfo">
        <h6>商品利润</h6>
        <div class="goodsTag">年计算</div>
        <div class="goodsCount">
          <vue3-autocounter
            ref="counter"
            :startAmount="0"
            :endAmount="countData.goodsProfit"
            :duration="1.2"
            :autoinit="true"
          />
        </div>
        <div class="goodsBootom"><span>+17%</span></div>
        <div class="goodsDate">距离上周以来</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { onMounted, onUnmounted, defineComponent, ref } from 'vue'
import * as echarts from 'echarts'
import Vue3autocounter from 'vue3-autocounter'
import { getGoodsData } from '@/service/main/dashboard/http-dashboard'
export default defineComponent({
  components: {
    'vue3-autocounter': Vue3autocounter
  },
  setup() {
    let echart = echarts
    const countData = ref({
      goodsProfit: 0,
      goodsCount: 0,
      goodsSale: 0
    })
    const getData = async () => {
      const { data: res } = await getGoodsData('/api/v1/goods/list', {})
      res.data.list.forEach((item) => {
        countData.value.goodsProfit += item.goodsPriceNew
        countData.value.goodsCount += item.goodsNumber / 8
        countData.value.goodsSale += item.catsId
      })
      console.log(countData.value)
    }
    getData()
    onMounted(() => {
      initChart()
    })
    onUnmounted(() => {
      echart.dispose
    })
    // 基础配置一下Echarts
    function initChart() {
      const elem = document.getElementById('salesecharts')
      let chart = echart.init(elem)
      // 把配置和数据放这里
      let option = {
        title: {
          text: '商品价格趋势',
          left: 10,
          top: 20,
          textStyle: {
            color: '#00d6f9'
          }
        },
        backgroundColor: '#00265f',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '25%',
          right: '3%',
          left: '10%',
          bottom: '12%'
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '一月',
              '二月',
              '三月',
              '四月',
              '五月',
              '六月',
              '七月',
              '八月',
              '九月',
              '十月',
              '十一月',
              '十二月'
            ],
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisLabel: {
              margin: 10,
              color: '#e2e9ff',
              textStyle: {
                fontSize: 14
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: '{value}',
              color: '#e2e9ff'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: 'rgba(0,186,255,.6)'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.12)'
              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            data: [7889, 8898, 8887, 8874, 7268, 8999, 8979, 9242, 8964, 9425, 8784, 9300],
            barWidth: '24px',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0,244,255,1)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,77,167,1)' // 100% 处的颜色
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0,160,221,1)',
                shadowBlur: 4
              }
            },
            label: {
              normal: {
                show: false
              }
            }
          }
        ]
      }
      chart.setOption(option)
      window.onresize = function () {
        //自适应大小
        chart.resize()
      }
    }
    return { initChart, countData }
  }
})
</script>

<style scoped lang="less">
@font-face {
  font-family: electronicFont;
  src: url(./fonts/DS-DIGIT.TTF);
}
.creatbox(@c) {
  width: @c;
  height: calc(@c - 60px);
}
.container {
  display: grid;
  margin-top: 30px;
  grid-template-columns: 240px 240px 740px;
  grid-template-rows: 170px 200px;
  justify-items: center;
  gap: 30px;
  .visitors {
    .creatbox(220px);
    background-color: #dfe8f6;
    .VstInfo {
      margin-left: -135px;
      margin-top: -45px;
      h6 {
        font-size: 18px;
        padding-left: 20px;
        color: rgb(55, 111, 208);
        font-weight: 400;
      }
      .VisCount {
        font-size: 34px;
        font-family: electronicFont;
        font-weight: 400;
        margin-top: -20px;
        margin-left: 20px;
      }
      .vInfoBootom {
        width: 50px;
        height: 30px;
        line-height: 30px;
        margin-left: 130px;
        margin-top: 15px;
        border-radius: 3px;
        background-color: #d0e2e5;
        span {
          font-size: 12px;
          font-weight: 600;
          color: #4caf50;
        }
      }
      .visDate {
        margin-top: -22px;
        margin-left: 168px;
        font-size: 14px;
        letter-spacing: 2px;
        color: rgba(55, 111, 208, 0.85);
      }
    }
  }
  .sales {
    .creatbox(220px);
    .slInfo {
      margin-left: -135px;
      margin-top: -45px;
      h6 {
        font-size: 18px;
        font-weight: 400;
      }
      .slTag {
        width: 60px;
        background-color: #4782da;
        border-radius: 5px;
        color: #ffffff;
        font-size: 13px;
        line-height: 20px;
        height: 20px;
        margin-top: -65px;
        margin-left: 266px;
      }
      .slCount {
        font-size: 34px;
        font-family: electronicFont;
        font-weight: 400;
        margin-top: 28px;
        margin-left: 20px;
      }
      .slInfoBootom {
        width: 50px;
        height: 30px;
        line-height: 30px;
        margin-left: 130px;
        margin-top: 15px;
        border-radius: 3px;
        background-color: #feeceb;
        span {
          font-size: 12px;
          font-weight: 600;
          color: rgb(244, 67, 54);
        }
      }
      .slDate {
        margin-top: -22px;
        margin-left: 168px;
        font-size: 14px;
        letter-spacing: 2px;
        color: gray;
      }
    }
  }
  .salesmap {
    width: 700px;
    height: 360px;
    grid-row: 1 / 3;
  }
  .goodsPrice {
    .creatbox(220px);
    .goodsInfo {
      margin-left: -135px;
      margin-top: -45px;
      h6 {
        padding-left: 25px;
        font-size: 18px;
        font-weight: 400;
      }
      .goodsTag {
        width: 60px;
        background-color: #4782da;
        border-radius: 5px;
        color: #ffffff;
        font-size: 13px;
        line-height: 20px;
        height: 20px;
        margin-top: -65px;
        margin-left: 266px;
      }
      .goodsCount {
        font-size: 34px;
        font-family: electronicFont;
        font-weight: 400;
        margin-top: 28px;
        margin-left: 20px;
      }
      .goodsBootom {
        width: 50px;
        height: 30px;
        line-height: 30px;
        margin-left: 130px;
        margin-top: 15px;
        border-radius: 3px;
        background-color: #d0e2e5;
        span {
          font-size: 12px;
          font-weight: 600;
          color: #4caf50;
        }
      }
      .goodsDate {
        margin-top: -22px;
        margin-left: 168px;
        font-size: 14px;
        letter-spacing: 2px;
        color: gray;
      }
    }
  }
}
</style>
