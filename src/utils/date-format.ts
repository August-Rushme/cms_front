/*
 * @Author: August
 * @Date: 2021-09-27 16:10:09
 * @LastEditors: August
 * @LastEditTime: 2021-10-19 01:43:48
 * @FilePath: \vue_shop_servere:\rookie-cms\src\utils\date-format.ts
 */
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_TIME_FORMAT2 = 'YYYY-MM-DD'
export function formatUtcString(utcString: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}

export function currentDateTime(timestamp: number, format: string = DATE_TIME_FORMAT2) {
  return dayjs(timestamp).format(format)
}
