import Home from '~/views/Home.vue'
import Branch from '~/views/Branch/index.vue'
import Customer from '~/views/Customer/index.vue'
import Login from '~/views/Login.vue'
import NotFound from '~/views/NotFound.vue'

import SiteContact from '~/views/SiteManagement/SiteContact/index.vue'
import SiteProductCategory from '~/views/SiteManagement/SiteProductCategory/index.vue'
import SitePartner from '~/views/SiteManagement/SitePartner/index.vue'
import SiteSetting from '~/views/SiteManagement/SiteSetting/index.vue'

import Property from '~/views/Property/index.vue'

import AddDebtSteel from '~/views/Debt/AddDebtSteel/index.vue'
import EditDebtSteel from '~/views/Debt/EditDebtSteel/index.vue'
import DebtDetail from '~/views/Debt/DebtDetail/index.vue'
import ListDebt from '~/views/Debt/ListDebt/index.vue'
import { DEBT_TYPE } from '~/modules/constant'
import { MENU } from '~/modules/menu'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    name: 'SiteManagement',
    children: [
      {
        path: '/sm/contact',
        name: 'SiteContact',
        component: SiteContact
      },
      {
        path: '/sm/product-category',
        name: 'SiteProductCategory',
        component: SiteProductCategory
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
        path: '/debt/list',
        name: 'DebtList',
        component: ListDebt,
        meta: { breadcrumbs: [MENU.DEBT] }
      },
      {
        path: '/debt/detail/:id',
        name: 'DebtDetail',
        component: DebtDetail
      },
      {
        path: `/debt/add/${DEBT_TYPE.STEEL.toLowerCase()}`,
        name: 'AddDebtSteel',
        component: AddDebtSteel,
        meta: { breadcrumbs: [MENU.DEBT, MENU.ADD_DEBT_STEEL] }
      },
      {
        path: `/debt/edit/${DEBT_TYPE.STEEL.toLowerCase()}/:id`,
        name: 'EditDebtSteel',
        component: EditDebtSteel
      }
    ]
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
    meta: { breadcrumbs: [MENU.CUSTOMER] }
  },
  {
    path: '/property',
    name: 'Property',
    component: Property,
    meta: { breadcrumbs: [MENU.PROPERTY] }
  },
  {
    path: '/branch',
    name: 'Branch',
    component: Branch,
    meta: { breadcrumbs: [MENU.BRANCH] }
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
