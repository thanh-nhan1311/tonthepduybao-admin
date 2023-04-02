import Dashboard from '~/views/Dashboard.vue'
import Branch from '~/views/Branch.vue'
import Login from '~/views/Login.vue'

import SiteContact from '~/views/SiteManagement/SiteContact.vue'
import SiteCategory from '~/views/SiteManagement/SiteCategory.vue'
import SitePartner from '~/views/SiteManagement/SitePartner.vue'

export default [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },

  // Site Management
  {
    name: 'SiteManagement',
    children: [
      {
        path: '/sm/contact',
        name: 'SiteContact',
        component: SiteContact
      },
      {
        path: '/sm/category',
        name: 'SiteCategory',
        component: SiteCategory
      },
      {
        path: '/sm/partner',
        name: 'SitePartner',
        component: SitePartner
      }
    ]
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
