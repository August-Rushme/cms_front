/*
 * @Author: August
 * @Date: 2021-09-27 16:10:09
 * @LastEditors: August
 * @LastEditTime: 2021-09-27 17:03:25
 * @FilePath: \rookie-cms\src\utils\date-format.ts
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(utcString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
