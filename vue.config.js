/*
 * @Author: August
 * @Date: 2021-09-24 16:22:16
 * @LastEditors: August
 * @LastEditTime: 2021-11-18 16:11:44
 * @FilePath: \firstfluttere:\rookie-cms\vue.config.js
 */
module.exports = {
  outputDir: './build',
  devServer: {
    // 解决跨域
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:8081',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        // components: '@/components'
      }
    }
  },
  chainWebpack: (config) => {
    config.set('externals', {
      Vue: 'vue',
      axios: 'axios',
      echarts: 'echarts'
    })
    config.plugin('html').tap((args) => {
      args[0].isProd = true
      return args
    })
  }
}
