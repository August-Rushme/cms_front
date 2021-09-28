/*
 * @Author: August
 * @Date: 2021-09-27 16:13:43
 * @LastEditors: August
 * @LastEditTime: 2021-09-27 16:13:44
 * @FilePath: \rookie-cms\src\global\register-properties.ts
 */
import { App } from 'vue'

import { formatUtcString } from '@/utils/date-format'

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    formatTime(value: string) {
      return formatUtcString(value)
    }
  }
}
