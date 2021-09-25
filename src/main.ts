/*
 * @Author: August
 * @Date: 2021-09-24 16:10:31
 * @LastEditors: August
 * @LastEditTime: 2021-09-25 20:07:40
 * @FilePath: \rookie-cms\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
const app = createApp(App)
setupStore()
app.use(router)
app.use(store)
// 注册组件等
app.use(globalRegister)
app.mount('#app')
