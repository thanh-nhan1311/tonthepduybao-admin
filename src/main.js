/* eslint-disable prettier/prettier */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Icon } from '@iconify/vue'
import Antd from 'ant-design-vue'

import router from './router'
import App from './App.vue'

import './assets/main.css'
import 'ant-design-vue/dist/antd.css'


const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
   .use(router)
   .use(Antd)
   .component('Iconify', Icon)
   .mount('#app')
