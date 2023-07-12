import Home from '~/views/Home.vue'
import Branch from '~/views/Branch/index.vue'
import Customer from '~/views/Customer/index.vue'
import Login from '~/views/Login.vue'
import NotFound from '~/views/NotFound.vue'

import SiteContact from '~/views/SiteManagement/SiteContact/index.vue'
import SiteCategory from '~/views/SiteManagement/SiteCategory/index.vue'
import SitePartner from '~/views/SiteManagement/SitePartner/index.vue'
import SiteSetting from '~/views/SiteManagement/SiteSetting/index.vue'

import Property from '~/views/Property/index.vue'

import SelectDebtType from '~/views/Debt/SelectDebtType/index.vue'
import AddDebtSteel from '~/views/Debt/AddDebtSteel/index.vue'
import DebtDetail from '~/views/Debt/DebtDetail/index.vue'
import ListDebt from '~/views/Debt/ListDebt/index.vue'
import { DEBT_TYPE } from '~/modules/constant'

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
        path: '/debt/select-type',
        name: 'SelectDebtType',
        component: SelectDebtType
      },
      {
        path: '/debt/:id',
        name: 'DebtDetail',
        component: DebtDetail
      },
      {
        path: '/debt/add/' + DEBT_TYPE.STEEL.toLowerCase(),
        name: 'AddDebtSteel',
        component: AddDebtSteel
      },
      {
        path: '/debt/list',
        name: 'DebtList',
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
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]
