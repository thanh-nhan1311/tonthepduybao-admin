export const MENU = {
  DASHBOARD: {
    id: 'dashboard',
    path: '/',
    name: 'Tổng quan',
    icon: 'ant-design:home-outlined',
    subMenu: null
  },
  SITE_MANAGEMENT: {
    id: 'siteManagement',
    path: null,
    name: 'Quản lý trang',
    icon: 'ant-design:global-outlined',
    subMenu: {
      SM_PRODUCT: {
        id: 'smProduct',
        path: '/sm/product',
        name: 'Sản phẩm'
      },
      SM_PRODUCT_CATEGORY: {
        id: 'smProductCategory',
        path: '/sm/category',
        name: 'Danh mục sản phẩm'
      },
      SM_CONTACT: {
        id: 'smContact',
        path: '/sm/contact',
        name: 'Liên hệ'
      },
      SM_PARTNER: {
        id: 'smPartner',
        path: '/sm/partner',
        name: 'Đối tác'
      },
      SM_COMMON: {
        id: 'smCommon',
        path: '/sm/settings',
        name: 'Cài đặt chung'
      }
    }
  },
  BRANCH: {
    id: 'branch',
    path: '/branch',
    name: 'Chi nhánh',
    icon: 'mdi:store-marker-outline',
    subMenu: null
  },
  SETTING: {
    id: 'setting',
    path: '/setting',
    name: 'Thiết lập',
    icon: 'mdi:store-marker-outline',
    subMenu: null
  },
  PROFILE: {
    id: 'profile',
    path: '/profile',
    name: 'Tài khoản',
    icon: 'ant-design:user',
    subMenu: null
  }
}
