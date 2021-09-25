/*
 * @Author: August
 * @Date: 2021-09-25 17:54:55
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 19:16:50
 * @FilePath: \rookie-cms\src\views\login\config\account-config.ts
 */
// 账号登陆的表单验证规则
export const rules = {
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 12, message: '用户名长度在6到12个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 32, message: '密码长度在6到32个字符', trigger: 'blur' }
  ]
}
