import Dashboard from '~/views/Dashboard.vue'
import Branch from '~/views/Branch/index.vue'
import Login from '~/views/Login.vue'

import SiteContact from '~/views/SiteManagement/SiteContact/index.vue'
import SiteCategory from '~/views/SiteManagement/SiteCategory/index.vue'
import SitePartner from '~/views/SiteManagement/SitePartner/index.vue'
import SiteSetting from '~/views/SiteManagement/SiteSetting/index.vue'

import Setting from '~/views/Setting/index.vue'

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
      },
      {
        path: '/sm/setting',
        name: 'SiteSetting',
        component: SiteSetting
      }
    ]
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
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
