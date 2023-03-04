/* eslint-disable prettier/prettier */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import { Icon } from '@iconify/vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
   .use(router)
   .use(Antd)
   .component('Iconify', Icon)
   .mount('#app')
