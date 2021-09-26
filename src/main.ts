/*
 * @Author: August
 * @Date: 2021-09-24 16:10:31
 * @LastEditors: August
 * @LastEditTime: 2021-09-26 15:47:42
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
// 注册组件等
app.use(globalRegister)

app.use(store)
setupStore()
app.use(router)

app.mount('#app')
