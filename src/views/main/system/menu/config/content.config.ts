/*
 * @Author: August
 * @Date: 2021-09-28 21:16:24
 * @LastEditors: August
 * @LastEditTime: 2021-09-29 08:19:16
 * @FilePath: \rookie-cms\src\views\main\system\menu\config\content.config.ts
 */
export const contentTableConfig = {
  title: '菜单列表',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '120' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'id', label: '菜单id', minWidth: '70' },
    { prop: 'path', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '菜单icon', minWidth: '100' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },
    {
      prop: 'createdat',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updatedat',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
}
