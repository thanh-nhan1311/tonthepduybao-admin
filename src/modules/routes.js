import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'

import SiteContact from '@/views/SiteManagement/SiteContact.vue'

export default [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/site-management/contact',
    name: 'SiteContact',
    component: SiteContact
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
