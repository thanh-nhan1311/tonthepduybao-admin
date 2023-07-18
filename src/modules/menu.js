import { USER_PERMISSION } from './constant'

export const MENU = {
  HOME: {
    id: 'Home',
    path: '/',
    name: 'Trang chủ',
    icon: 'ant-design:home-outlined',
    subMenu: null,
    permission: USER_PERMISSION.FULL_ACCESS,
    implicit: false
  },

  SITE_MANAGEMENT: {
    id: 'SiteManagement',
    path: null,
    name: 'Quản lý trang',
    icon: 'ant-design:global-outlined',
    permission: USER_PERMISSION.FULL_ACCESS,
    implicit: false,
    subMenu: {
      SM_PRODUCT: {
        id: 'SiteContact',
        path: '/sm/product',
        name: 'Sản phẩm',
        implicit: false
      },
      SM_PRODUCT_CATEGORY: {
        id: 'SiteProductCategory',
        path: '/sm/product-category',
        name: 'Danh mục sản phẩm',
        implicit: false
      },
      SM_CONTACT: {
        id: 'SiteContact',
        path: '/sm/contact',
        name: 'Liên hệ',
        implicit: false
      },
      SM_PARTNER: {
        id: 'SitePartner',
        path: '/sm/partner',
        name: 'Đối tác',
        implicit: false
      },
      SM_SETTING: {
        id: 'SiteSetting',
        path: '/sm/setting',
        name: 'Cài đặt chung',
        implicit: false
      }
    }
  },

  DEBT: {
    id: 'DebtList',
    path: '/debt/list',
    name: 'Công nợ',
    icon: 'mdi:file-document-multiple',
    subMenu: null,
    permission: USER_PERMISSION.FULL_ACCESS,
    implicit: false
  },
  DEBT_DETAIL: {
    id: 'DebtDetail',
    path: '/debt/detail/',
    name: 'Thông tin công nợ',
    permission: USER_PERMISSION.FULL_ACCESS,
    implicit: true
  },
  ADD_DEBT: {
    id: 'AddDebt',
    path: '/debt/add',
    name: 'Tạo công nợ',
    permission: USER_PERMISSION.AM_ACCESS,
    implicit: true
  },
  EDIT_DEBT: {
    id: 'EditDebt',
    path: '/debt/edit/',
    name: 'Chỉnh sửa công nợ',
    permission: USER_PERMISSION.AM_ACCESS,
    implicit: true
  },

  CUSTOMER: {
    id: 'Customer',
    path: '/customer',
    name: 'Khách hàng',
    icon: 'heroicons:user-group-solid',
    subMenu: null,
    permission: USER_PERMISSION.FULL_ACCESS,
    implicit: false
  },
  PROPERTY: {
    id: 'Property',
    path: '/property',
    name: 'Thiết lập thuộc tính',
    icon: 'ic:baseline-settings',
    subMenu: null,
    permission: USER_PERMISSION.AM_ACCESS,
    implicit: false
  },
  BRANCH: {
    id: 'Branch',
    path: '/branch',
    name: 'Chi nhánh',
    icon: 'mdi:store-marker-outline',
    subMenu: null,
    permission: USER_PERMISSION.A_ACCESS,
    implicit: false
  },
  USER: {
    id: 'User',
    path: '/users',
    name: 'Nhân viên',
    icon: 'fluent-mdl2:recruitment-management',
    subMenu: null,
    permission: USER_PERMISSION.A_ACCESS,
    implicit: false
  },
  PROFILE: {
    id: 'profile',
    path: '/profile',
    name: 'Tài khoản',
    icon: 'ant-design:user',
    subMenu: null,
    permission: USER_PERMISSION.FULL_ACCESS,
    implicit: false
  }
}
