/*
 * @Author: August
 * @Date: 2021-09-26 17:52:33
 * @LastEditors: August
 * @LastEditTime: 2021-11-18 16:10:22
 * @FilePath: \firstfluttere:\rookie-cms\src\router\main\product\category\category.ts
 */
const category = () =>
  import(/*webpackChunkName:"Categort_Goods" */ '@/views/main/product/category/category.vue')
export default {
  path: '/main/product/category',
  name: 'category',
  component: category,
  children: []
}
