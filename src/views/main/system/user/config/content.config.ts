/*
 * @Author: August
 * @Date: 2021-09-27 10:57:05
 * @LastEditors: August
 * @LastEditTime: 2021-09-27 16:54:41
 * @FilePath: \rookie-cms\src\views\main\system\user\config\content.config.ts
 */
export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'username', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实姓名', minWidth: '100' },
    { prop: 'cellphone', label: '手机号码', minWidth: '100' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
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
    { label: '操作', minWidth: '250', slotName: 'handler' }
  ]
}
