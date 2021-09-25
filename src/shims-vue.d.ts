/*
 * @Author: August
 * @Date: 2021-09-24 16:10:31
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 23:15:58
 * @FilePath: \rookie-cms\src\shims-vue.d.ts
 */
/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
/// <reference types="node" />

/**
 * js function for hashing messages with MD5
 *
 * @param message - a string or buffer to hash
 * @param options
 * @returns the resultant MD5 hash of the given message
 */
declare function md5(
  message: string | Buffer | number[] | Uint8Array,
  options: md5.Options & { asBytes: true }
): number[]
declare function md5(
  message: string | Buffer | number[] | Uint8Array,
  options?: Pick<md5.Options, 'asString' | 'encoding'>
): string
declare function md5(
  message: string | Buffer | number[] | Uint8Array,
  options?: md5.Options
): string | number[]

declare namespace md5 {
  interface Options {
    asBytes?: boolean | undefined
    asString?: boolean | undefined
    encoding?: 'binary' | string | undefined
  }
}

export = md5
