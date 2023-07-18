import Home from '~/views/Home.vue'
import Branch from '~/views/Branch/index.vue'
import User from '~/views/User/index.vue'
import Customer from '~/views/Customer/index.vue'
import Profile from '~/views/Profile/index.vue'
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
import { DEBT_TYPE, USER_ROLE } from '~/modules/constant'
import { MENU } from '~/modules/menu'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF] }
  },
  {
    name: 'SiteManagement',
    children: [
      {
        path: '/sm/contact',
        name: 'SiteContact',
        component: SiteContact,
        meta: { roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF] }
      },
      {
        path: '/sm/product-category',
        name: 'SiteProductCategory',
        component: SiteProductCategory,
        meta: { roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF] }
      },
      {
        path: '/sm/partner',
        name: 'SitePartner',
        component: SitePartner,
        meta: { roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF] }
      },
      {
        path: '/sm/setting',
        name: 'SiteSetting',
        component: SiteSetting,
        meta: { roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF] }
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
        meta: { breadcrumbs: [MENU.DEBT], roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF] }
      },
      {
        path: '/debt/detail/:id',
        name: 'DebtDetail',
        component: DebtDetail,
        meta: { roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF] }
      },
      {
        path: `/debt/add/${DEBT_TYPE.STEEL.toLowerCase()}`,
        name: 'AddDebtSteel',
        component: AddDebtSteel,
        meta: {
          breadcrumbs: [MENU.DEBT, MENU.ADD_DEBT_STEEL],
          roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF]
        }
      },
      {
        path: `/debt/edit/${DEBT_TYPE.STEEL.toLowerCase()}/:id`,
        name: 'EditDebtSteel',
        component: EditDebtSteel,
        meta: { roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF] }
      }
    ]
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
    meta: { breadcrumbs: [MENU.CUSTOMER], roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF] }
  },
  {
    path: '/property',
    name: 'Property',
    component: Property,
    meta: { breadcrumbs: [MENU.PROPERTY], roles: [USER_ROLE.ADMIN] }
  },
  {
    path: '/branch',
    name: 'Branch',
    component: Branch,
    meta: { breadcrumbs: [MENU.BRANCH], roles: [USER_ROLE.ADMIN] }
  },
  {
    path: '/users',
    name: 'User',
    component: User,
    meta: { breadcrumbs: [MENU.USER], roles: [USER_ROLE.ADMIN] }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { breadcrumbs: [MENU.PROFILE], roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF] }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF] }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
      breadcrumbs: [{ name: '404' }],
      roles: [USER_ROLE.ADMIN, USER_ROLE.STAFF]
    }
  }
]
