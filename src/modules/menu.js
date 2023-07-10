import { DEBT_TYPE } from './constant'

export const MENU = {
  HOME: {
    id: 'home',
    path: '/',
    name: 'Trang chủ',
    icon: 'ant-design:home-outlined',
    subMenu: null,
    implicit: false
  },
  SITE_MANAGEMENT: {
    id: 'siteManagement',
    path: null,
    name: 'Quản lý trang',
    icon: 'ant-design:global-outlined',
    implicit: false,
    subMenu: {
      SM_PRODUCT: {
        id: 'smProduct',
        path: '/sm/product',
        name: 'Sản phẩm',
        implicit: false
      },
      SM_PRODUCT_CATEGORY: {
        id: 'smProductCategory',
        path: '/sm/category',
        name: 'Danh mục sản phẩm',
        implicit: false
      },
      SM_CONTACT: {
        id: 'smContact',
        path: '/sm/contact',
        name: 'Liên hệ',
        implicit: false
      },
      SM_PARTNER: {
        id: 'smPartner',
        path: '/sm/partner',
        name: 'Đối tác',
        implicit: false
      },
      SM_COMMON: {
        id: 'smCommon',
        path: '/sm/setting',
        name: 'Cài đặt chung',
        implicit: false
      }
    }
  },
  DEBT: {
    id: 'debt',
    path: null,
    name: 'Công nợ',
    icon: 'mdi:file-document-multiple',
    subMenu: {
      LIST_DEBT: {
        id: 'listDebt',
        path: '/debt/list',
        name: 'Danh sách công nợ',
        implicit: false
      },
      ADD_DEBT: {
        id: 'SelectDebtType',
        path: '/debt/select-type',
        name: 'Tạo công nợ',
        implicit: false
      },
      ADD_DEBT_STEEL: {
        id: 'addDebtSteel',
        path: '/debt/add/' + DEBT_TYPE.STEEL.toLowerCase(),
        name: 'Tạo công nợ: Tôn - Sắt - Thép',
        implicit: true
      },
      ADD_DEBT_SCREW: {
        id: 'addDebtScrew',
        path: '/debt/add/' + DEBT_TYPE.SCREW.toLowerCase(),
        name: 'Tạo công nợ: Sản phẩm khác',
        implicit: true
      }
    }
  },
  CUSTOMER: {
    id: 'customer',
    path: '/customer',
    name: 'Khách hàng',
    icon: 'heroicons:user-group-solid',
    subMenu: null,
    implicit: false
  },
  PROPERTY: {
    id: 'property',
    path: '/property',
    name: 'Thiết lập thuộc tính',
    icon: 'ic:baseline-settings',
    subMenu: null,
    implicit: false
  },
  BRANCH: {
    id: 'branch',
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
