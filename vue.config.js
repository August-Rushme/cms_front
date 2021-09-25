/*
 * @Author: August
 * @Date: 2021-09-24 16:22:16
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 12:01:17
 * @FilePath: \rookie-cms\vue.config.js
 */
module.exports = {
  outputDir: './build',
  devServer: {
    // 解决跨域
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
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
  }
}
