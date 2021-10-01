<!--
 * @Author: August
 * @Date: 2021-09-30 11:09:00
 * @LastEditors: August
 * @LastEditTime: 2021-09-30 14:27:55
 * @FilePath: \rookie-cms\src\views\home\home.vue
-->
<!--
 * @Author: August
 * @Date: 2021-09-24 16:10:31
 * @LastEditors: August
 * @LastEditTime: 2021-09-30 11:00:30
 * @FilePath: \rookie-cms\src\App1.vue
-->
<template>
  <div id="app">
    <div class="homepage">
      <div class="container">
        <div class="projectInfo">
          <div class="card">
            <span></span>
            <div class="content animate__animated fadeInLeft">
              <h2>菜鸟CMS</h2>
              <p>
                本项目采用的是前后端分离技术,使项目的灵活性和交互性更加的友好,此外该项目前端采用的技术是当今主流框架Vue3和TypeScript以及很多Css新特性等等,后端采用的是springBoot等,本项目也采用了路由拦截技术,以保证用户的安全性,总之,我们非常欢迎您能体验我们的项目!
              </p>
              <button class="toLogin" @click="goPage">立即体验</button>
            </div>
          </div>
        </div>
        <div id="echarts"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import 'animate.css'
import * as echarts from 'echarts'
import { onMounted, onUnmounted } from 'vue'
import router from '@/router'
export default defineComponent({
  setup() {
    const goPage = () => {
      router.push('/login')
    }
    let echart = echarts

    onMounted(() => {
      initChart()
    })

    onUnmounted(() => {
      echart.dispose
    })

    // 基础配置一下Echarts
    function initChart() {
      const elem = document.getElementById('echarts')
      let chart = echart.init(elem)
      // 把配置和数据放这里
      var data1 = [709, 1999, 2009, 2299, 3299, 4299, 4999, 5199, 6099, 6289, 6529, 6789]
      var data2 = [1509, 2999, 3799, 4299, 4899, 5299, 5599, 6199, 7399, 7509, 7699, 7909]
      var xData = (function () {
        var data = []
        for (var i = 1; i < 13; i++) {
          data.push(i + '月')
        }
        return data
      })()
      var option = {
        backgroundColor: '',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: '',

            textStyle: {
              color: '#05294D'
            }
          },
          backgroundColor: '#05294D',
          borderColor: '#135469',
          borderWidth: 2,
          padding: [20, 20, 20, 20],
          formatter: function (params) {
            // console.log(params.length == 0);
            if (params.length === 0) {
              let result =
                '<span style="font-size: 24px;font-family: MicrosoftYaHeiUISemibold;color: #FFFFFF;ine-height: 41px;">' +
                '至少选中一条图例' +
                '</span>' +
                '<br>'
              return result
            } else if (params.length == 1) {
              const paramsArray = []
              params.forEach((v) => {
                // console.log(v.name);
                if (v.seriesName == '预期人数') {
                  v.color = '#F3C452'
                } else {
                  v.color = '#02DBF1'
                }
                paramsArray.push({
                  name: v.name,
                  seriesName: v.seriesName,
                  data: v.data,
                  color: v.color
                })
              })
              // console.log(paramsArray);
              let result =
                '<span style="font-size: 24px;font-family: MicrosoftYaHeiUISemibold;color: #FFFFFF;ine-height: 41px;">' +
                paramsArray[0].name +
                '</span>' +
                '<br>'
              result +=
                '<div style="display:flex;">' +
                '<div style="font-size: 20px;font-family: MicrosoftYaHeiUI;color: ' +
                paramsArray[0].color +
                ';line-height: 25px;margin-top:10px;margin-right:28px;">' +
                paramsArray[0].seriesName +
                '<div style="font-size: 24px;font-family: DINAlternate-Bold, DINAlternate;font-weight: bold;color:' +
                paramsArray[0].color +
                ';line-height: 33px;">' +
                paramsArray[0].data +
                '人' +
                '</div>' +
                '</div>' +
                '</div>'
              return result
            } else {
              let result =
                '<span style="font-size: 24px;font-family: MicrosoftYaHeiUISemibold;color: #FFFFFF;ine-height: 41px;">' +
                params[0].name +
                '</span>' +
                '<br>'
              result +=
                '<div style="display:flex;">' +
                '<div style="font-size: 20px;font-family: MicrosoftYaHeiUI;color: #02DBF1;line-height: 25px;margin-top:10px;margin-right:28px;">' +
                params[0].seriesName +
                '<div style="font-size: 24px;font-family: DINAlternate-Bold, DINAlternate;font-weight: bold;color: #02DBF1;line-height: 33px;">' +
                params[0].data +
                '人' +
                '</div>' +
                '</div>' +
                '<div style="margin-top:10px;font-size: 20px;font-family: MicrosoftYaHeiUI;color: #F3C452;line-height: 25px;">' +
                params[1].seriesName +
                '<div style="font-size: 24px;font-family: DINAlternate-Bold, DINAlternate;font-weight: bold;color: #F3C452;line-height: 33px;">' +
                params[1].data +
                '人' +
                '</div>' +
                '</div>' +
                '</div>'
              return result
            }
          }
        },
        grid: {
          borderWidth: 0,
          top: '20%',
          left: '65',
          bottom: '25%',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          top: '0%',
          right: '10%',
          textStyle: {
            fontSize: '20px',
            fontFamily: 'MicrosoftYaHeiUI',
            color: '#FFFFFF'
          },
          itemWidth: 28,
          itemHeight: 28,
          data: [
            {
              name: '使用人数',
              icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAA1ElEQVR4Xu2WsQ2AMBADP4ghYBtGZxsYAhHEAMQ19tF+g+/PSVqFfy08fwEAA8IJUIFwATgEqQAVCCdABcIF4BagAlQgnAAVCBeAW4AKUIFwAlQgXABuASpABcIJjCtw9O3vfOaquta2f+UYApjO3v8O4P3/e2mfOQEw2jAGpFeg0g9BhwNQZeAlqAi5zzHAfcMqHwYoQu5zDHDfsMqHAYqQ+xwD3Des8mGAIuQ+xwD3Dat8GKAIuc8xwH3DKh8GKELucwxw37DKhwGKkPscA9w3rPI9drIYQbytq9EAAAAASUVORK5CYII='
            },
            {
              name: '预期人数',
              icon: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA1UlEQVRYR+2UMQ7CMAxFvxdyFtqVhREpZ+AEnIyRM1RiY2NsOQgTXYzSUlVNm9ZWhwrJnvPjpxfHhI2LNu4PAzADZsAM/I+BT5FnAF8JqBl0cb6sNFu0z/N751+nLisy0ISJb2DkTZBQgukshYjyT+ergxhgEA6NQwUQIcQoH4HPGpgKtwZ+NhYglpq3MhM1F5ZcLDmTBJCE1wImZ0DSvAuvfaKRAU3zJIRySAczUBfZg4GjdMInIZTfNALY3wFy6xaNblGJFpFm42nPGoAZMANmwAx8ASjjyiGj/fCxAAAAAElFTkSuQmCC'
            }
          ]
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: 'rgba(255,255,255,.5)'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitArea: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: 'rgba(255,255,255,0.7)',
              fontSize: 18
            },
            data: xData
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color: 'rgba(255,255,255,0.5)',
              fontSize: 20
            },
            splitArea: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '使用人数',
            type: 'bar',
            // "stack": "总量",
            barMaxWidth: 35,
            barGap: '10%',
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#05F5FF' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#020D20' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            data: data1
          },
          {
            name: '预期人数',
            type: 'line',
            symbolSize: 10,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: 'rgba(255, 196, 53, 1)',
                barBorderRadius: 0
              }
            },
            lineStyle: {
              normal: {
                width: 4,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#F0B62A' // 0% 处的颜色
                    },
                    {
                      offset: 0.45,
                      color: '#FFC12B' // 45% 处的颜色
                    },
                    {
                      offset: 0.85,
                      color: '#FFC12B' // 85% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#FFC12B' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                }
              }
            },
            data: data2
          }
        ]
      }
      chart.setOption(option)
      window.onresize = function () {
        //自适应大小
        chart.resize()
      }
    }
    return { initChart, goPage }
  }
})
</script>

<style lang="less">
@distance: 5px;
.homepage {
  width: 100%;
  height: 100vh;
  background-position: center center;
  background: url('../../assets/img/background.jpg') no-repeat;
  background-size: 100% 100%;
  overflow: auto;
  .container {
    position: relative;
    top: 80px;
    left: 80px;
  }
  .projectInfo {
    width: 1400px;
    height: 600px;
    position: absolute;
    // background-color: pink;
    .card {
      position: relative;
      margin-top: 20px;
      margin-left: 20px;
      width: 350px;
      height: 550px;
      background-color: #111;
      transition: 0.5s;
      animation: fadeInLeft;
      animation-duration: 1s;
      span {
        position: absolute;
        top: @distance;
        left: @distance;
        bottom: @distance;
        right: @distance;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.6);
      }
      span::before {
        content: '';
        position: absolute;
        width: 50%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.1);
      }
      .content {
        position: absolute;
        z-index: 2;
        padding: 20px 40px;
        h2 {
          color: #fff;
          font-size: 2em;
          margin-bottom: 20px;
        }
        p {
          color: #fff;
          font-size: 1.1em;
          line-height: 2em;
          margin-bottom: 30px;
        }
        .toLogin {
          width: 200px;
          height: 50px;
          border-color: #fff;
          color: #111;
          box-shadow: 0 0 40px 40px #fff inset, 0 0 0 0 #fff;
          transition: all 150ms ease-in-out;

          &:hover {
            box-shadow: 0 0 10px 0 #fff inset, 0 0 10px 4px #fff;
          }
        }
      }
    }
    .card:hover {
      transform: translateY(-20px);
    }
    .card::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #ffbc00, #ff0058);
    }
    .card::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #ffbc00, #ff0058);
      filter: blur(30px);
    }
  }
  #echarts {
    width: 900px;
    height: 730px;
    position: relative;
    top: -20px;
    left: 500px;
  }
}
</style>
