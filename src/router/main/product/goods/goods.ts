/*
 * @Author: August
 * @Date: 2021-09-26 17:52:33
 * @LastEditors: August
 * @LastEditTime: 2021-11-18 16:10:19
 * @FilePath: \firstfluttere:\rookie-cms\src\router\main\product\goods\goods.ts
 */
const goods = () =>
  import(/*webpackChunkName:"Categort_Goods" */ '@/views/main/product/goods/goods.vue')
export default {
  path: '/main/product/goods',
  name: 'goods',
  component: goods,
  children: []
}
