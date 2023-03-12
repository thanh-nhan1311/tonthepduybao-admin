import Dashboard from '~/views/Dashboard.vue'
import Branch from '~/views/Branch.vue'
import Login from '~/views/Login.vue'

import SiteContact from '~/views/SiteManagement/SiteContact.vue'

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
    path: '/branch',
    name: 'Branch',
    component: Branch
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
