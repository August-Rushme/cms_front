/*
 * @Author: August
 * @Date: 2021-09-24 16:10:31
 * @LastEditors: August
 * @LastEditTime: 2021-11-18 16:39:50
 * @FilePath: \firstfluttere:\rookie-cms\babel.config.js
 */
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'element-plus',
        // 引入组件
        customName: (name) => {
          name = name.slice(3)
          return `element-plus/lib/components/${name}`
        }
        // 引入样式
        // customStyleName: (name) => {
        //   name = name.slice(3)
        //   // 如果你需要引入 [name].scss 文件，你需要用下面这行
        //   // return `element-plus/lib/components/${name}/style`
        //   // 引入 [name].css
        //   return `element-plus/lib/components/${name}/style/css`
        // }
      }
    ],
    '@babel/plugin-syntax-dynamic-import'
  ],
  presets: ['@vue/cli-plugin-babel/preset']
}
