/*
 * @Author: August
 * @Date: 2021-09-25 17:49:13
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 17:53:04
 * @FilePath: \rookie-cms\src\utils\catch.ts
 */
class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    // obj=>string=>obj
    if (value) {
      return JSON.parse(value)
    }
  }
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  clearCache() {
    window.localStorage.clear()
  }
}
export default new LocalCache()
