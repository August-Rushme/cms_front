/*
 * @Author: August
 * @Date: 2021-09-24 16:10:31
 * @LastEditors: August
 * @LastEditTime: 2021-10-18 16:31:11
 * @FilePath: \vue3-ts-cmse:\rookie-cms\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
import 'element-plus/dist/index.css'
const app = createApp(App)
// 注册组件等
app.use(globalRegister)

app.use(store)
setupStore()
app.use(router)

app.mount('#app')
