/*
 * @Author: August
 * @Date: 2021-09-29 09:18:42
 * @LastEditors: August
 * @LastEditTime: 2021-09-29 11:21:43
 * @FilePath: \rookie-cms\src\views\main\system\role\config\content.config.ts
 */
export const contentTableConfig = {
  title: '角色列表',
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100' },
    { prop: 'remark', label: '权限介绍', minWidth: '150' },
    { prop: 'code', label: '角色标识', minWidth: '100' },
    {
      prop: 'created',
      label: '创建时间',
      minWidth: '250',
      slotName: 'created'
    },
    {
      prop: 'updated',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updated'
    },
    { label: '操作', minWidth: '200', slotName: 'handler' }
  ]
}
