import Home from '~/views/Home.vue'
import Branch from '~/views/Branch/index.vue'
import Customer from '~/views/Customer/index.vue'
import Login from '~/views/Login.vue'

import SiteContact from '~/views/SiteManagement/SiteContact/index.vue'
import SiteCategory from '~/views/SiteManagement/SiteCategory/index.vue'
import SitePartner from '~/views/SiteManagement/SitePartner/index.vue'
import SiteSetting from '~/views/SiteManagement/SiteSetting/index.vue'

import Property from '~/views/Property/index.vue'

import SelectAddDebt from '~/views/Debt/SelectAddDebt/index.vue'
import AddDebt from '~/views/Debt/AddDebt/index.vue'
import ListDebt from '~/views/Debt/ListDebt/index.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    name: 'Debt',
    children: [
      {
        path: '/debt/add',
        name: 'SelectAddDebt',
        component: SelectAddDebt
      },
      {
        path: '/debt/add/:type',
        name: 'AddDebt',
        component: AddDebt
      },
      {
        path: '/debt/list',
        name: 'ListDebt',
        component: ListDebt
      }
    ]
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer
  },
  {
    path: '/property',
    name: 'Property',
    component: Property
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
