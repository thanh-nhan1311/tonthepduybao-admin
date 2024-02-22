import Branch from '~/views/Branch/index.vue'
import Customer from '~/views/Customer/index.vue'
import Home from '~/views/Home/index.vue'
import Login from '~/views/Login.vue'
import NotFound from '~/views/NotFound.vue'
import Profile from '~/views/Profile/index.vue'
import User from '~/views/User/index.vue'

import CreateProduct from '~/views/Product/CreateProduct/index.vue'
import EditProduct from '~/views/Product/EditProduct/index.vue'
import ListProduct from '~/views/Product/ListProduct/index.vue'
import ProductDetail from '~/views/Product/ProductDetail/index.vue'

import SiteContact from '~/views/SiteManagement/SiteContact/index.vue'
import SitePartner from '~/views/SiteManagement/SitePartner/index.vue'
import SiteProductCategory from '~/views/SiteManagement/SiteProductCategory/index.vue'
import SiteSetting from '~/views/SiteManagement/SiteSetting/index.vue'

import Property from '~/views/Property/index.vue'

import { USER_PERMISSION } from '~/modules/constant'
import { MENU } from '~/modules/menu'
import AddDebt from '~/views/Debt/AddDebt/index.vue'
import DebtDetail from '~/views/Debt/DebtDetail/index.vue'
import EditDebt from '~/views/Debt/EditDebt/index.vue'
import ListDebt from '~/views/Debt/ListDebt/index.vue'

export default [
  {
    path: '',
    name: 'Home',
    component: Home,
    meta: { permission: USER_PERMISSION.FULL_ACCESS }
  },
  {
    name: 'SiteManagement',
    children: [
      {
        path: '/sm/contact',
        name: 'SiteContact',
        component: SiteContact,
        meta: { permission: USER_PERMISSION.FULL_ACCESS }
      },
      {
        path: '/sm/product-category',
        name: 'SiteProductCategory',
        component: SiteProductCategory,
        meta: { permission: USER_PERMISSION.FULL_ACCESS }
      },
      {
        path: '/sm/partner',
        name: 'SitePartner',
        component: SitePartner,
        meta: { permission: USER_PERMISSION.FULL_ACCESS }
      },
      {
        path: '/sm/setting',
        name: 'SiteSetting',
        component: SiteSetting,
        meta: { permission: USER_PERMISSION.FULL_ACCESS }
      }
    ]
  },

  {
    name: 'Product',
    children: [
      {
        path: '/product/list',
        name: 'ListProduct',
        component: ListProduct,
        meta: {
          breadcrumbs: [MENU.PRODUCT],
          permission: USER_PERMISSION.FULL_ACCESS
        }
      },
      {
        path: '/product/detail/:id',
        name: 'ProductDetail',
        component: ProductDetail,
        meta: { permission: USER_PERMISSION.FULL_ACCESS }
      },
      {
        path: '/product/create',
        name: 'CreateProduct',
        component: CreateProduct,
        meta: {
          breadcrumbs: [MENU.PRODUCT, MENU.CREATE_PRODUCT],
          permission: USER_PERMISSION.FULL_ACCESS
        }
      },
      {
        path: '/product/edit/:id',
        name: 'EditProduct',
        component: EditProduct,
        meta: { permission: USER_PERMISSION.FULL_ACCESS }
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
        meta: { breadcrumbs: [MENU.DEBT], permission: USER_PERMISSION.FULL_ACCESS }
      },
      {
        path: '/debt/detail/:id',
        name: 'DebtDetail',
        component: DebtDetail,
        meta: { permission: USER_PERMISSION.AM_ACCESS }
      },
      {
        path: '/debt/add',
        name: 'AddDebt',
        component: AddDebt,
        meta: {
          breadcrumbs: [MENU.DEBT, MENU.ADD_DEBT],
          permission: USER_PERMISSION.AM_ACCESS
        }
      },
      {
        path: '/debt/edit/:id',
        name: 'EditDebt',
        component: EditDebt,
        meta: { permission: USER_PERMISSION.FULL_ACCESS }
      }
    ]
  },
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
    meta: { breadcrumbs: [MENU.CUSTOMER], permission: USER_PERMISSION.FULL_ACCESS }
  },
  {
    path: '/property',
    name: 'Property',
    component: Property,
    meta: { breadcrumbs: [MENU.PROPERTY], permission: USER_PERMISSION.AM_ACCESS }
  },
  {
    path: '/branch',
    name: 'Branch',
    component: Branch,
    meta: { breadcrumbs: [MENU.BRANCH], permission: USER_PERMISSION.A_ACCESS }
  },
  {
    path: '/users',
    name: 'User',
    component: User,
    meta: { breadcrumbs: [MENU.USER], permission: USER_PERMISSION.A_ACCESS }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { breadcrumbs: [MENU.PROFILE], permission: USER_PERMISSION.FULL_ACCESS }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { permission: USER_PERMISSION.FULL_ACCESS }
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
      breadcrumbs: [{ name: '404' }],
      permission: USER_PERMISSION.FULL_ACCESS
    }
  }
]
