/*
 * @Author: August
 * @Date: 2021-09-30 00:57:32
 * @LastEditors: August
 * @LastEditTime: 2021-09-30 08:27:36
 * @FilePath: \rookie-cms\src\views\main\product\goods\config\content.config.ts
 */
export const contentTableConfig = {
  title: '商品分类',
  propList: [
    { prop: 'goodsName', label: '商品名称', minWidth: '120' },
    { prop: 'goodsImg', label: '商品图片', minWidth: '120', slotName: 'picture' },
    { prop: 'goodsInfo', label: '品牌', minWidth: '100' },
    { prop: 'goodsNumber', label: '库存', minWidth: '100' },
    { prop: 'goodsPriceNew', label: '商品价格', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ]
}
