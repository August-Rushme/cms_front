/*
 * @Author: August
 * @Date: 2021-09-25 11:46:41
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 18:54:05
 * @FilePath: \rookie-cms\src\service\request\config.ts
 */
let BASE_URL = ''
const TIME_OUT = 1000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://127.0.0.1:8081'
  // BASE_URL = 'http://152.136.185.210:5000'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http2'
}
export { BASE_URL, TIME_OUT }
