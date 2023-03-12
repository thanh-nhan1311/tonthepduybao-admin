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
        path: '/site-management/product',
        name: 'Sản phẩm'
      },
      SM_CONTACT: {
        id: 'smContact',
        path: '/site-management/contact',
        name: 'Liên hệ'
      },
      SM_PARTNER: {
        id: 'smPartner',
        path: '/site-management/partner',
        name: 'Đối tác'
      },
      SM_COMMON: {
        id: 'smCommon',
        path: '/site-management/settings',
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
