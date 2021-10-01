<template>
  <div class="container">
    <el-card class="goodsMap" id="goodsMap"></el-card>
    <el-card class="goodsPie" id="goodsPie"></el-card>
  </div>
</template>

<script>
import { defineComponent, onUnmounted, onMounted } from 'vue'
import * as echarts from 'echarts'
export default defineComponent({
  setup() {
    let echart = echarts
    onMounted(() => {
      initChart()
    })
    onUnmounted(() => {
      echart.dispose
    })
    // 基础配置一下Echarts
    function initChart() {
      const elem = document.getElementById('goodsMap')
      const elem2 = document.getElementById('goodsPie')
      let chart = echart.init(elem)
      let chart2 = echart.init(elem2)
      // 把配置和数据放这里
      var scaleData = [
        {
          name: '江西',
          value: 15
        },
        {
          name: '海南',
          value: 15
        },
        {
          name: '广东',
          value: 15
        },
        {
          name: '北京',
          value: 15
        },
        {
          name: '山东',
          value: 15
        }
      ]
      var rich = {
        white: {
          color: '#fff',
          align: 'center',
          fontWeight: 'bold',
          padding: [3, 0]
        }
      }
      var placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0
        }
      }
      var data = []
      var color1 = [
        'rgb(255, 153, 153)',
        'rgb(255, 176, 63)',
        'rgb(61, 186, 45)',
        'rgb(43, 166, 254)',
        'rgb(255,222,0)',
        'rgb(255,0,0)'
      ]

      for (var i = 0; i < scaleData.length; i++) {
        data.push(
          {
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
              normal: {
                borderWidth: 4,
                shadowBlur: 30,
                borderColor: color1[i],
                shadowColor: color1[i],
                color: color1[i],
                opacity: 0.75
              }
            }
          },
          {
            value: 2,
            name: '',
            itemStyle: placeHolderStyle
          }
        )
      }
      var seriesObj = [
        {
          name: '',
          type: 'pie',
          // clockWise: false,
          radius: [50, 120],
          hoverAnimation: true,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inner',
                fontWeight: 'bold',
                formatter: function (params) {
                  var percent = 0
                  var total = 0
                  for (var i = 0; i < scaleData.length; i++) {
                    total += scaleData[i].value
                  }
                  percent = ((params.value / total) * 100).toFixed(0)
                  if (params.name !== '') {
                    return params.name + '\n{white|' + '占比' + percent + '%}'
                  } else {
                    return ''
                  }
                },
                rich: rich
              },
              labelLine: {
                show: false
              }
            }
          },
          data: data
        }
      ]
      let option2 = {
        legend: {
          orient: 'vertical',
          top: 'bottom',
          padding: [
            5, // 上
            10, // 右
            35, // 下
            10 // 左
          ]
        },
        title: {
          text: '商品地区分布',
          left: 'center',
          y: '14px'
        },
        tooltip: {
          show: false
        },
        toolbox: {
          show: false
        },
        series: seriesObj
      }
      let option = {
        title: {
          text: '商品每年价格',
          x: 'center',
          y: '14px'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          color: ['#F58080', '#47D8BE', '#F9A589'],
          data: ['去年', '今年'],
          left: 'center',
          bottom: 'bottom'
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '9%',
          height: '80%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [100, 200, 20, 30, 60, 89],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        },
        yAxis: {
          type: 'value',

          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#DDD'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#333'
            }
          },
          nameTextStyle: {
            color: '#999'
          },
          splitArea: {
            show: false
          }
        },
        series: [
          {
            name: '去年',
            type: 'line',
            data: [8000, 9000, 2200, 1300, 6600, 2890],
            color: '#F58080',
            lineStyle: {
              normal: {
                width: 5,
                color: {
                  type: 'linear',

                  colorStops: [
                    {
                      offset: 0,
                      color: '#FFCAD4' // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: '#F58080' // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#F58080' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: 'rgba(245,128,128, 0.5)',
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            itemStyle: {
              normal: {
                color: '#F58080',
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                borderColor: '#F58080'
              }
            },
            smooth: true
          },
          {
            name: '今年',
            type: 'line',
            data: [1205, 5680, 250, 360, 7840, 560],
            lineStyle: {
              normal: {
                width: 5,
                color: {
                  type: 'linear',

                  colorStops: [
                    {
                      offset: 0,
                      color: '#F6D06F' // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: '#F9A589' // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#F9A589' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                },
                shadowColor: 'rgba(249,165,137, 0.5)',
                shadowBlur: 10,
                shadowOffsetY: 7
              }
            },
            itemStyle: {
              normal: {
                color: '#F6D06F',
                borderWidth: 10,
                /*shadowColor: 'rgba(72,216,191, 0.3)',
                     shadowBlur: 100,*/
                borderColor: '#F6D06F'
              }
            },
            smooth: true
          }
        ]
      }
      chart.setOption(option)
      chart2.setOption(option2)
      window.onresize = function () {
        //自适应大小
        chart.resize()
      }
    }
    return { initChart }
  }
})
</script>

<style scoped lang="less">
.container {
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  .goodsMap {
    width: 850px;
    height: 500px;
  }
  .goodsPie {
    width: 350px;
    height: 500px;
    margin-right: 10px;
  }
}
</style>
