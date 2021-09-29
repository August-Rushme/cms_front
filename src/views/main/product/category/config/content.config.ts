/*
 * @Author: August
 * @Date: 2021-09-29 18:30:12
 * @LastEditors: August
 * @LastEditTime: 2021-09-29 19:29:55
 * @FilePath: \rookie-cms\src\views\main\product\category\config\content.config.ts
 */
export const contentTableConfig = {
  title: '商品分类',
  propList: [
    { prop: 'goodsName', label: '商品名称', minWidth: '120' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'goodsSrc', label: '产地', minWidth: '70' },
    { prop: 'goodsInfo', label: '品牌', minWidth: '100' },
    { prop: 'goodsNumber', label: '库存', minWidth: '100' },

    { label: '操作', minWidth: '120', slotName: 'handler' }
  ]
}
