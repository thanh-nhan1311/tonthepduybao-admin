import { DEBT_TYPE } from './constant'

export const MENU = {
  HOME: {
    id: 'Home',
    path: '/',
    name: 'Trang chủ',
    icon: 'ant-design:home-outlined',
    subMenu: null,
    implicit: false
  },
  SITE_MANAGEMENT: {
    id: 'SiteManagement',
    path: null,
    name: 'Quản lý trang',
    icon: 'ant-design:global-outlined',
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
    implicit: false
  },
  DEBT_DETAIL: {
    id: 'DebtDetail',
    path: '/debt/detail/',
    name: 'Thông tin công nợ',
    implicit: true
  },
  ADD_DEBT_STEEL: {
    id: 'AddDebtSteel',
    path: '/debt/add/' + DEBT_TYPE.STEEL.toLowerCase(),
    name: 'Tạo công nợ: Tôn - Sắt - Thép',
    implicit: true
  },
  ADD_DEBT_SCREW: {
    id: 'AddDebtScrew',
    path: '/debt/add/' + DEBT_TYPE.SCREW.toLowerCase(),
    name: 'Tạo công nợ: Vật liệu',
    implicit: true
  },
  CUSTOMER: {
    id: 'Customer',
    path: '/customer',
    name: 'Khách hàng',
    icon: 'heroicons:user-group-solid',
    subMenu: null,
    implicit: false
  },
  PROPERTY: {
    id: 'Property',
    path: '/property',
    name: 'Thiết lập thuộc tính',
    icon: 'ic:baseline-settings',
    subMenu: null,
    implicit: false
  },
  BRANCH: {
    id: 'Branch',
    path: '/branch',
    name: 'Chi nhánh',
    icon: 'mdi:store-marker-outline',
    subMenu: null,
    implicit: false
  },
  PROFILE: {
    id: 'profile',
    path: '/profile',
    name: 'Tài khoản',
    icon: 'ant-design:user',
    subMenu: null,
    implicit: false
  }
}
